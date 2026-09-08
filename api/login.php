<?php
/* ============================================================================
   API Endpoint: Researcher Authentication Login
   Verifies admin credentials and establishes a PHP session.
   ============================================================================ */

require_once __DIR__ . '/../config/db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($password)) {
    jsonResponse(false, null, 'Username and password are required', 400);
}

try {
    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $admin['username'];

        jsonResponse(true, [
            'username' => $admin['username']
        ], 'Researcher authentication successful');
    } else {
        jsonResponse(false, null, 'Invalid username or password', 401);
    }
} catch (Exception $e) {
    error_log("Login Exception: " . $e->getMessage());
    jsonResponse(false, null, 'Authentication error encountered', 500);
}

