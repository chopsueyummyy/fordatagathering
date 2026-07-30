<?php
/* ============================================================================
   API Endpoint: Export Research Dataset to CSV
   Outputs downloadable CSV file containing student demographics and RIASEC scores.
   ============================================================================ */

$db_host = 'localhost';
$db_name = 'coursealigngd_db';
$db_user = 'root';
$db_pass = '';

try {
    $pdo = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $sql = "SELECT 
                r.respondent_id,
                r.grade_level,
                r.strand,
                ar.score_r,
                ar.score_i,
                ar.score_a,
                ar.score_s,
                ar.score_e,
                ar.score_c,
                ar.dominant_code,
                ar.rse_score_likert,
                ar.rse_score_guttman,
                ar.rse_interpretation,
                ar.cdses_score_sa,
                ar.cdses_score_oi,
                ar.cdses_score_gs,
                ar.cdses_score_pl,
                ar.cdses_score_ps,
                ar.cdses_avg_sa,
                ar.cdses_avg_oi,
                ar.cdses_avg_gs,
                ar.cdses_avg_pl,
                ar.cdses_avg_ps,
                ar.cdses_total_score,
                ar.cdses_total_avg,
                ar.cdses_interpretation,
                ar.submitted_at
            FROM respondents r
            INNER JOIN assessment_results ar ON r.respondent_id = ar.respondent_id
            ORDER BY ar.submitted_at DESC";

    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="CourseAlign_Research_Dataset_' . date('Y-m-d') . '.csv"');

    $output = fopen('php://output', 'w');

    // Add CSV Column Header Row
    fputcsv($output, [
        'Respondent_ID',
        'Grade_Level',
        'SHS_Strand',
        'Realistic_Score',
        'Investigative_Score',
        'Artistic_Score',
        'Social_Score',
        'Enterprising_Score',
        'Conventional_Score',
        'Dominant_RIASEC_Code',
        'RSE_Score_Likert',
        'RSE_Score_Guttman',
        'RSE_Interpretation',
        'CDSES_Self_Appraisal_Avg',
        'CDSES_Occupational_Info_Avg',
        'CDSES_Goal_Selection_Avg',
        'CDSES_Planning_Avg',
        'CDSES_Problem_Solving_Avg',
        'CDSES_Total_Score',
        'CDSES_Total_Avg',
        'CDSES_Interpretation',
        'Submission_Timestamp'
    ]);

    foreach ($rows as $row) {
        fputcsv($output, [
            $row['respondent_id'],
            $row['grade_level'],
            $row['strand'],
            $row['score_r'],
            $row['score_i'],
            $row['score_a'],
            $row['score_s'],
            $row['score_e'],
            $row['score_c'],
            $row['dominant_code'],
            $row['rse_score_likert'],
            $row['rse_score_guttman'],
            $row['rse_interpretation'],
            $row['cdses_avg_sa'],
            $row['cdses_avg_oi'],
            $row['cdses_avg_gs'],
            $row['cdses_avg_pl'],
            $row['cdses_avg_ps'],
            $row['cdses_total_score'],
            $row['cdses_total_avg'],
            $row['cdses_interpretation'],
            $row['submitted_at']
        ]);
    }

    fclose($output);
    exit();

} catch (Exception $e) {
    http_response_code(500);
    echo "Error exporting CSV: " . $e.getMessage();
    exit();
}
