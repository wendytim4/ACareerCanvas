<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // 24 hours cache

include 'db.php'; 

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect JSON data from the request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    if ($data === null) {
        echo json_encode(array("error" => "Invalid JSON data"));
        exit;
    }

    // Validate and sanitize the data (you might need to improve this based on your requirements)
    $firstName = mysqli_real_escape_string($conn, $data->first_name);
    $lastName = mysqli_real_escape_string($conn, $data->last_name);
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO student (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);

    if ($stmt->execute()) {
        // Retrieve the last inserted ID
        $student_id = $stmt->insert_id;
        echo json_encode(array("message" => "New student created successfully. Student ID: $student_id"));
    } else {
        echo json_encode(array("error" => "Error: " . $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "Invalid request method"));
}

// Close the database connection
$conn->close();
?>
