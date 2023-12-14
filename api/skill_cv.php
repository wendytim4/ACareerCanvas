<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
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
        $skill_id = intval($item->skill_id);
       

        // Validate and sanitize the data (you might need to improve this based on your requirements)
        $skill_name = mysqli_real_escape_string($conn, $item->skill_name);
        
        
        // Insert data into the 'education' table using prepared statements
        $sql = "INSERT INTO skill_cv(skill_id,skill_name,student_id)
                VALUES (?, ?,?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isi", $skill_id,$skill_name, $student_id);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Record inserted successfully"));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }

        $stmt->close();
    } }else {
        echo json_encode(array("error" => "Invalid request method"));
        echo($data);
    }


// Close the database connection
$conn->close();