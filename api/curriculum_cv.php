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

    foreach($data as $item) {

    $student_id = intval($item->student_id); 
    $curriculum_id = intval($item->curriculum_id); 

    // Validate and sanitize the data (you might need to improve this based on your requirements)
    $activity_name = mysqli_real_escape_string($conn, $item->activity_name);
    $organization_name = mysqli_real_escape_string($conn, $item->organization_name);
    $start_date = mysqli_real_escape_string($conn, $item->start_date);
    $end_date = mysqli_real_escape_string($conn, $item->end_date);
    $description = mysqli_real_escape_string($conn, $item->description);
    $descriptionone = mysqli_real_escape_string($conn, $item->descriptionone);
    $descriptiontwo = mysqli_real_escape_string($conn, $item->descriptiontwo);
    $curriculum_id = mysqli_real_escape_string($conn, $item->curriculum_id);
    
    
    // Insert data into the 'education' table using prepared statements
    $sql = "INSERT INTO curriculum_cv(curriculum_id, activity_name, organization_name, start_date, end_date,description,descriptionone,descriptiontwo,student_id)
            VALUES (?, ?, ?, ?, ?, ?,?,?,?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssssssi",$curriculum_id, $activity_name, $organization_name, $start_date , $end_date, $description,$descriptionone,$descriptiontwo, $student_id);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Record inserted successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $stmt->error));
    }

    $stmt->close();
} }else {
    echo json_encode(array("error" => "Invalid request method"));
}

// Close the database connection
$conn->close();
?>
