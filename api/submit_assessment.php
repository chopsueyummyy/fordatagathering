<?php
/* ============================================================================
   API Endpoint: Submit Assessment
   Saves student demographic data, item responses, calculates RIASEC scores,
   and records final dominant code in a MySQL transaction.
   ============================================================================ */

require_once __DIR__ . '/../config/db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    jsonResponse(false, null, 'Invalid JSON payload received', 400);
}

$respondentId = trim($data['respondent_id'] ?? '');
$gradeLevel = trim($data['grade_level'] ?? '');
$strand = trim($data['strand'] ?? '');
$answers = $data['answers'] ?? [];

if (empty($respondentId) || empty($gradeLevel) || empty($strand) || empty($answers)) {
    jsonResponse(false, null, 'Missing required assessment demographic or answer fields', 400);
}

try {
    // 1. Fetch Question Category Mapping from Database
    $qStmt = $pdo->query("SELECT id, category FROM questions");
    $questionCategories = [];
    while ($row = $qStmt->fetch()) {
        $questionCategories[$row['id']] = $row['category'];
    }

    // 2. Compute Trait Scores
    $scores = ['R' => 0, 'I' => 0, 'A' => 0, 'S' => 0, 'E' => 0, 'C' => 0];
    
    // RSE Score Calculations
    $rseLikert = 0;
    $isCorrect = [];

    // Initialize isCorrect for all RSE questions
    for ($i = 101; $i <= 110; $i++) {
        $isCorrect[$i] = false;
    }

    // CDSES-SF Score Calculations
    $cdsesSaSum = 0;
    $cdsesOiSum = 0;
    $cdsesGsSum = 0;
    $cdsesPlSum = 0;
    $cdsesPsSum = 0;

    foreach ($answers as $qId => $ansVal) {
        $val = (int)$ansVal;
        $qIdInt = (int)$qId;

        if (isset($questionCategories[$qIdInt])) {
            $cat = $questionCategories[$qIdInt];
            
            // Check if it's a RIASEC question
            if (isset($scores[$cat])) {
                if ($val === 1) {
                    $scores[$cat]++;
                }
            } 
            // Check if it's an RSE question
            else if ($cat === 'RSE_P') {
                // Positive RSE scoring: SA=3, A=2, D=1, SD=0
                $rseLikert += (4 - $val);
                // Low self-esteem (correct response in Guttman sense) is Disagree (3) or Strongly Disagree (4)
                $isCorrect[$qIdInt] = ($val === 3 || $val === 4);
            } else if ($cat === 'RSE_N') {
                // Negative RSE scoring: SA=0, A=1, D=2, SD=3
                $rseLikert += ($val - 1);
                // Low self-esteem (correct response in Guttman sense) is Strongly Agree (1) or Agree (2)
                $isCorrect[$qIdInt] = ($val === 1 || $val === 2);
            }
            // Check if it's a CDSES question
            else if ($cat === 'CDSES_SA') {
                $cdsesSaSum += $val;
            } else if ($cat === 'CDSES_OI') {
                $cdsesOiSum += $val;
            } else if ($cat === 'CDSES_GS') {
                $cdsesGsSum += $val;
            } else if ($cat === 'CDSES_PL') {
                $cdsesPlSum += $val;
            } else if ($cat === 'CDSES_PS') {
                $cdsesPsSum += $val;
            }
        }
    }

    // 3. Compute Dominant Code (Top 3 RIASEC Traits)
    // Save RIASEC scores copies for sorting
    $riasecScoresForSort = $scores;
    arsort($riasecScoresForSort);
    $dominantCode = implode('', array_slice(array_keys($riasecScoresForSort), 0, 3));

    // Restore standard key order for database insertion
    $finalScores = [
        'R' => $scores['R'] ?? 0,
        'I' => $scores['I'] ?? 0,
        'A' => $scores['A'] ?? 0,
        'S' => $scores['S'] ?? 0,
        'E' => $scores['E'] ?? 0,
        'C' => $scores['C'] ?? 0
    ];

    // Compute Guttman Items:
    // G1: Item 1 (Question 101)
    $g1 = $isCorrect[101] ? 1 : 0;
    // G2: Items 3, 7, 9 (Questions 103, 107, 109)
    $c2 = ($isCorrect[103] ? 1 : 0) + ($isCorrect[107] ? 1 : 0) + ($isCorrect[109] ? 1 : 0);
    $g2 = ($c2 >= 2) ? 1 : 0;
    // G3: Items 4, 5 (Questions 104, 105)
    $c3 = ($isCorrect[104] ? 1 : 0) + ($isCorrect[105] ? 1 : 0);
    $g3 = ($c3 >= 1) ? 1 : 0;
    // G4: Item 8 (Question 108)
    $g4 = $isCorrect[108] ? 1 : 0;
    // G5: Item 10 (Question 110)
    $g5 = $isCorrect[110] ? 1 : 0;
    // G6: Items 2, 6 (Questions 102, 106)
    $c6 = ($isCorrect[102] ? 1 : 0) + ($isCorrect[106] ? 1 : 0);
    $g6 = ($c6 >= 1) ? 1 : 0;

    $rseGuttman = $g1 + $g2 + $g3 + $g4 + $g5 + $g6;

    // RSE Interpretation
    if ($rseLikert < 15) {
        $rseInterpretation = 'Low Self-Esteem';
    } else if ($rseLikert <= 25) {
        $rseInterpretation = 'Normal Self-Esteem';
    } else {
        $rseInterpretation = 'High Self-Esteem';
    }

    // CDSES-SF Averages & Totals
    $cdsesAvgSa = round($cdsesSaSum / 5, 2);
    $cdsesAvgOi = round($cdsesOiSum / 5, 2);
    $cdsesAvgGs = round($cdsesGsSum / 5, 2);
    $cdsesAvgPl = round($cdsesPlSum / 5, 2);
    $cdsesAvgPs = round($cdsesPsSum / 5, 2);

    $cdsesTotalScore = $cdsesSaSum + $cdsesOiSum + $cdsesGsSum + $cdsesPlSum + $cdsesPsSum;
    $cdsesTotalAvg = round($cdsesTotalScore / 25, 2);

    // CDSES-SF Interpretation Level (Low: < 3.0, Moderate: 3.0 to 4.0, High: > 4.0)
    if ($cdsesTotalAvg < 3.00) {
        $cdsesInterpretation = 'Low Self-Efficacy';
    } else if ($cdsesTotalAvg <= 4.00) {
        $cdsesInterpretation = 'Moderate Self-Efficacy';
    } else {
        $cdsesInterpretation = 'High Self-Efficacy';
    }

    // 4. Begin Database Transaction
    $pdo->beginTransaction();

    // A. Insert Respondent Metadata
    $respStmt = $pdo->prepare("INSERT INTO respondents (respondent_id, grade_level, strand) VALUES (?, ?, ?)");
    $respStmt->execute([$respondentId, $gradeLevel, $strand]);

    // B. Insert Individual Item Responses
    $itemStmt = $pdo->prepare("INSERT INTO assessment_responses (respondent_id, question_id, answer_value) VALUES (?, ?, ?)");
    foreach ($answers as $qId => $ansVal) {
        $itemStmt->execute([$respondentId, (int)$qId, (int)$ansVal]);
    }

    // C. Insert Calculated Assessment Results
    $resStmt = $pdo->prepare("INSERT INTO assessment_results (respondent_id, score_r, score_i, score_a, score_s, score_e, score_c, dominant_code, rse_score_likert, rse_score_guttman, rse_interpretation, cdses_score_sa, cdses_score_oi, cdses_score_gs, cdses_score_pl, cdses_score_ps, cdses_avg_sa, cdses_avg_oi, cdses_avg_gs, cdses_avg_pl, cdses_avg_ps, cdses_total_score, cdses_total_avg, cdses_interpretation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $resStmt->execute([
        $respondentId,
        $finalScores['R'],
        $finalScores['I'],
        $finalScores['A'],
        $finalScores['S'],
        $finalScores['E'],
        $finalScores['C'],
        $dominantCode,
        $rseLikert,
        $rseGuttman,
        $rseInterpretation,
        $cdsesSaSum,
        $cdsesOiSum,
        $cdsesGsSum,
        $cdsesPlSum,
        $cdsesPsSum,
        $cdsesAvgSa,
        $cdsesAvgOi,
        $cdsesAvgGs,
        $cdsesAvgPl,
        $cdsesAvgPs,
        $cdsesTotalScore,
        $cdsesTotalAvg,
        $cdsesInterpretation
    ]);

    $pdo->commit();

    jsonResponse(true, [
        'respondent_id' => $respondentId,
        'dominant_code' => $dominantCode,
        'scores' => $finalScores,
        'rse' => [
            'likert' => $rseLikert,
            'guttman' => $rseGuttman,
            'interpretation' => $rseInterpretation
        ],
        'cdses' => [
            'score_sa' => $cdsesSaSum,
            'score_oi' => $cdsesOiSum,
            'score_gs' => $cdsesGsSum,
            'score_pl' => $cdsesPlSum,
            'score_ps' => $cdsesPsSum,
            'avg_sa' => $cdsesAvgSa,
            'avg_oi' => $cdsesAvgOi,
            'avg_gs' => $cdsesAvgGs,
            'avg_pl' => $cdsesAvgPl,
            'avg_ps' => $cdsesAvgPs,
            'total_score' => $cdsesTotalScore,
            'total_avg' => $cdsesTotalAvg,
            'interpretation' => $cdsesInterpretation
        ]
    ], 'Assessment submitted successfully!');

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    jsonResponse(false, null, 'Failed to process assessment submission: ' . $e->getMessage(), 500);
}
