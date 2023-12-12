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
    $job_title = mysqli_real_escape_string($conn, $data->job_title);
    $organization_name = mysqli_real_escape_string($conn, $data->organization_name);
    $start_date = mysqli_real_escape_string($conn, $data->start_date);
    $end_date = mysqli_real_escape_string($conn, $data->end_date);
    $country = mysqli_real_escape_string($conn, $data->country);
    $city = mysqli_real_escape_string($conn, $data->city);
    $job_description= mysqli_real_escape_string($conn, $data->job_description);
    $job_descriptionone= mysqli_real_escape_string($conn, $data->job_descriptionone);
    $job_descriptiontwo= mysqli_real_escape_string($conn, $data->job_descriptiontwo);

    
    // Insert data into the 'education' table using prepared statements
    $sql = "INSERT INTO cv_work_experience(job_title,country,city, organization_name, start_date, end_date,job_description,job_descriptionone,job_descriptiontwo,student_id)
            VALUES (?, ?, ?, ?,?,?, ?,?,?,?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssi", $job_title,$country,$city ,$organization_name, $start_date, $end_date, $job_description,$job_descriptionone,$job_descriptiontwo,$student_id);

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
