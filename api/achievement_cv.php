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

    $student_id = intval($data->student_id); 

    // Validate and sanitize the data (you might need to improve this based on your requirements)
    $achievement_name = mysqli_real_escape_string($conn, $data->achievement_name);
    $organization_name = mysqli_real_escape_string($conn, $data->organization_name);
    $year_attained = mysqli_real_escape_string($conn, $data->year_attained);
    
    // Insert data into the 'education' table using prepared statements
    $sql = "INSERT INTO achievement_cv(achievement_name, organization_name, year_attained,student_id)
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi",$achievement_name, $organization_name, $year_attained,$student_id);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Record inserted successfully"));
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