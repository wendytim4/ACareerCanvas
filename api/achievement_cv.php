// Purpose: Insert achievement_cv data into the database
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

    foreach ($data as $item) {
        $achievement_id = intval($item->achievement_id);
        $student_id = intval($item->student_id);

        // Check if data already exists for the given achievement_id
        $check_sql = "SELECT * FROM achievement_cv WHERE achievement_id = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("i", $achievement_id);
        $check_stmt->execute();
        $result = $check_stmt->get_result();
        $check_stmt->close();

        if ($result->num_rows > 0) {
            // Data already exists for the given achievement_id
            echo json_encode(array("error" => "Data already exists for achievement_id: " . $achievement_id));
            
        } else {
            $achievement_name = mysqli_real_escape_string($conn,$item->achievement_name);
            $organization_name = mysqli_real_escape_string($conn, $item->organization_name);
            $year_attained = mysqli_real_escape_string($conn, $item->year_attained);

            $insert_sql = "INSERT INTO achievement_cv(achievement_id, achievement_name, organization_name,  year_attained, student_id)
                           VALUES (?, ?, ?, ?, ?)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bind_param("isssi", $achievement_id, $achievement_name, $organization_name, $year_attained, $student_id);

            if ($insert_stmt->execute()) {
                echo json_encode(array("message" => "Record inserted successfully"));
            } else {
                echo json_encode(array("error" => "Error: " . $insert_stmt->error));
            }

            $insert_stmt->close();
        }
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}

// Close the database connection
$conn->close();
?>
