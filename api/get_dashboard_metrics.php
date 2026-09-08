<?php
/* ============================================================================
   API Endpoint: Get Dashboard Metrics & Analytics Data (CDSES-SF Version)
   Returns totals, visual chart averages, strand distribution, and table records.
   ============================================================================ */

require_once __DIR__ . '/../config/db.php';

// Enforce admin authentication guard
requireAdminAuth();

try {

    // 1. Fetch All Respondents with Calculated Results
    $sql = "SELECT 
                r.respondent_id AS id,
                r.grade_level AS gradeLevel,
                r.strand,
                ar.score_r AS R,
                ar.score_i AS I,
                ar.score_a AS A,
                ar.score_s AS S,
                ar.score_e AS E,
                ar.score_c AS C,
                ar.dominant_code AS dominantCode,
                ar.rse_score_likert AS rseScoreLikert,
                ar.rse_score_guttman AS rseScoreGuttman,
                ar.rse_interpretation AS rseInterpretation,
                ar.cdses_score_sa AS cdsesScoreSa,
                ar.cdses_score_oi AS cdsesScoreOi,
                ar.cdses_score_gs AS cdsesScoreGs,
                ar.cdses_score_pl AS cdsesScorePl,
                ar.cdses_score_ps AS cdsesScorePs,
                ar.cdses_avg_sa AS cdsesAvgSa,
                ar.cdses_avg_oi AS cdsesAvgOi,
                ar.cdses_avg_gs AS cdsesAvgGs,
                ar.cdses_avg_pl AS cdsesAvgPl,
                ar.cdses_avg_ps AS cdsesAvgPs,
                ar.cdses_total_score AS cdsesTotalScore,
                ar.cdses_total_avg AS cdsesTotalAvg,
                ar.cdses_interpretation AS cdsesInterpretation,
                DATE_FORMAT(ar.submitted_at, '%Y-%m-%d %H:%i') AS dateSubmitted
            FROM respondents r
            INNER JOIN assessment_results ar ON r.respondent_id = ar.respondent_id
            ORDER BY ar.submitted_at DESC";

    $stmt = $pdo->query($sql);
    $rawRows = $stmt->fetchAll();

    $totalResponses = count($rawRows);
    $formattedRespondents = [];

    $traitTotals = ['R' => 0, 'I' => 0, 'A' => 0, 'S' => 0, 'E' => 0, 'C' => 0];
    
    // RSE aggregates
    $rseLikertTotal = 0;
    $rseGuttmanTotal = 0;
    $rseInterpretationCounts = [
        'Low Self-Esteem' => 0,
        'Normal Self-Esteem' => 0,
        'High Self-Esteem' => 0
    ];

    // CDSES aggregates
    $cdsesSaTotal = 0.00;
    $cdsesOiTotal = 0.00;
    $cdsesGsTotal = 0.00;
    $cdsesPlTotal = 0.00;
    $cdsesPsTotal = 0.00;
    $cdsesTotalScoreTotal = 0;
    $cdsesInterpretationCounts = [
        'Low Self-Efficacy' => 0,
        'Moderate Self-Efficacy' => 0,
        'High Self-Efficacy' => 0
    ];

    $strandCounts = [];
    $todayCount = 0;
    $todayDateStr = date('Y-m-d');

    foreach ($rawRows as $row) {
        $scores = [
            'R' => (int)$row['R'],
            'I' => (int)$row['I'],
            'A' => (int)$row['A'],
            'S' => (int)$row['S'],
            'E' => (int)$row['E'],
            'C' => (int)$row['C']
        ];

        foreach ($scores as $k => $val) {
            $traitTotals[$k] += $val;
        }

        // RSE
        $rseLikertVal = (int)($row['rseScoreLikert'] ?? 0);
        $rseGuttmanVal = (int)($row['rseScoreGuttman'] ?? 0);
        $rseInterp = $row['rseInterpretation'] ?? 'Normal Self-Esteem';

        $rseLikertTotal += $rseLikertVal;
        $rseGuttmanTotal += $rseGuttmanVal;
        if (isset($rseInterpretationCounts[$rseInterp])) {
            $rseInterpretationCounts[$rseInterp]++;
        } else {
            $rseInterpretationCounts[$rseInterp] = 1;
        }

        // CDSES
        $cdsesSaVal = (int)($row['cdsesScoreSa'] ?? 0);
        $cdsesOiVal = (int)($row['cdsesScoreOi'] ?? 0);
        $cdsesGsVal = (int)($row['cdsesScoreGs'] ?? 0);
        $cdsesPlVal = (int)($row['cdsesScorePl'] ?? 0);
        $cdsesPsVal = (int)($row['cdsesScorePs'] ?? 0);

        $cdsesAvgSaVal = (float)($row['cdsesAvgSa'] ?? 0.00);
        $cdsesAvgOiVal = (float)($row['cdsesAvgOi'] ?? 0.00);
        $cdsesAvgGsVal = (float)($row['cdsesAvgGs'] ?? 0.00);
        $cdsesAvgPlVal = (float)($row['cdsesAvgPl'] ?? 0.00);
        $cdsesAvgPsVal = (float)($row['cdsesAvgPs'] ?? 0.00);

        $cdsesTotalScoreVal = (int)($row['cdsesTotalScore'] ?? 0);
        $cdsesTotalAvgVal = (float)($row['cdsesTotalAvg'] ?? 0.00);
        $cdsesInterp = $row['cdsesInterpretation'] ?? 'Moderate Self-Efficacy';

        $cdsesSaTotal += $cdsesAvgSaVal;
        $cdsesOiTotal += $cdsesAvgOiVal;
        $cdsesGsTotal += $cdsesAvgGsVal;
        $cdsesPlTotal += $cdsesAvgPlVal;
        $cdsesPsTotal += $cdsesAvgPsVal;
        $cdsesTotalScoreTotal += $cdsesTotalScoreVal;

        if (isset($cdsesInterpretationCounts[$cdsesInterp])) {
            $cdsesInterpretationCounts[$cdsesInterp]++;
        } else {
            $cdsesInterpretationCounts[$cdsesInterp] = 1;
        }

        $st = $row['strand'];
        $strandCounts[$st] = ($strandCounts[$st] ?? 0) + 1;

        if (strpos($row['dateSubmitted'], $todayDateStr) === 0) {
            $todayCount++;
        }

        $formattedRespondents[] = [
            'id' => $row['id'],
            'gradeLevel' => $row['gradeLevel'],
            'strand' => $row['strand'],
            'scores' => $scores,
            'dominantCode' => $row['dominantCode'],
            'rseScoreLikert' => $rseLikertVal,
            'rseScoreGuttman' => $rseGuttmanVal,
            'rseInterpretation' => $rseInterp,
            'cdsesScoreSa' => $cdsesSaVal,
            'cdsesScoreOi' => $cdsesOiVal,
            'cdsesScoreGs' => $cdsesGsVal,
            'cdsesScorePl' => $cdsesPlVal,
            'cdsesScorePs' => $cdsesPsVal,
            'cdsesAvgSa' => $cdsesAvgSaVal,
            'cdsesAvgOi' => $cdsesAvgOiVal,
            'cdsesAvgGs' => $cdsesAvgGsVal,
            'cdsesAvgPl' => $cdsesAvgPlVal,
            'cdsesAvgPs' => $cdsesAvgPsVal,
            'cdsesTotalScore' => $cdsesTotalScoreVal,
            'cdsesTotalAvg' => $cdsesTotalAvgVal,
            'cdsesInterpretation' => $cdsesInterp,
            'dateSubmitted' => $row['dateSubmitted']
        ];
    }

    // Calculate Averages
    $traitAverages = [];
    foreach ($traitTotals as $k => $sum) {
        $traitAverages[$k] = $totalResponses > 0 ? round($sum / $totalResponses, 1) : 0;
    }

    $rseLikertAvg = $totalResponses > 0 ? round($rseLikertTotal / $totalResponses, 1) : 0;
    $rseGuttmanAvg = $totalResponses > 0 ? round($rseGuttmanTotal / $totalResponses, 1) : 0;

    $cdsesSaAvg = $totalResponses > 0 ? round($cdsesSaTotal / $totalResponses, 2) : 0.00;
    $cdsesOiAvg = $totalResponses > 0 ? round($cdsesOiTotal / $totalResponses, 2) : 0.00;
    $cdsesGsAvg = $totalResponses > 0 ? round($cdsesGsTotal / $totalResponses, 2) : 0.00;
    $cdsesPlAvg = $totalResponses > 0 ? round($cdsesPlTotal / $totalResponses, 2) : 0.00;
    $cdsesPsAvg = $totalResponses > 0 ? round($cdsesPsTotal / $totalResponses, 2) : 0.00;
    $cdsesTotalScoreAvg = $totalResponses > 0 ? round($cdsesTotalScoreTotal / $totalResponses, 1) : 0.0;

    // Identify Top Trait
    arsort($traitTotals);
    $topTraitKey = $totalResponses > 0 ? array_key_first($traitTotals) : '-';

    // Identify Top Strand
    arsort($strandCounts);
    $topStrandKey = $totalResponses > 0 ? array_key_first($strandCounts) : '-';

    $payload = [
        'total' => $totalResponses,
        'today_count' => $todayCount,
        'top_trait' => $topTraitKey,
        'top_strand' => $topStrandKey,
        'trait_averages' => $traitAverages,
        'rse_averages' => [
            'likert' => $rseLikertAvg,
            'guttman' => $rseGuttmanAvg
        ],
        'rse_interpretation_distribution' => $rseInterpretationCounts,
        'cdses_averages' => [
            'sa' => $cdsesSaAvg,
            'oi' => $cdsesOiAvg,
            'gs' => $cdsesGsAvg,
            'pl' => $cdsesPlAvg,
            'ps' => $cdsesPsAvg,
            'total_score' => $cdsesTotalScoreAvg
        ],
        'cdses_interpretation_distribution' => $cdsesInterpretationCounts,
        'strand_distribution' => $strandCounts,
        'respondents' => $formattedRespondents
    ];

    jsonResponse(true, $payload, 'Dashboard metrics calculated successfully');
} catch (Exception $e) {
    jsonResponse(false, null, 'Error computing dashboard metrics: ' . $e->getMessage(), 500);
}
