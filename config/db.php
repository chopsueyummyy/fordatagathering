<?php
/* ============================================================================
   CourseAlign Database Connection & Utility Module
   Database: coursealigngd_db
   ============================================================================ */

// Enable CORS and set JSON header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = 'localhost';
$db_name = 'coursealigngd_db';
$db_user = 'root';
$db_pass = ''; // Default XAMPP MySQL password is empty

try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database Connection Failed',
        'message' => 'Could not connect to database coursealigngd_db. Please ensure XAMPP MySQL is running.'
    ]);
    exit();
}

/**
 * Standardized JSON Response Helper
 */
function jsonResponse($success = true, $data = null, $message = '', $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit();
}
