<?php
/* ============================================================================
   API Endpoint: Get RIASEC Questions
   Returns list of 42 active RIASEC test items
   ============================================================================ */

require_once __DIR__ . '/../config/db.php';

try {
    $stmt = $pdo->query("SELECT id, category, cat_name, question_text FROM questions ORDER BY id ASC");
    $questions = $stmt->fetchAll();

    jsonResponse(true, $questions, 'Questions fetched successfully');
} catch (Exception $e) {
    jsonResponse(false, null, 'Failed to retrieve questions: ' . $e->getMessage(), 500);
}
