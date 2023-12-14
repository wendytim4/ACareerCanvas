<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // 24 hours cache

include 'db.php';

// Check if the request method is DELETE
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    // Collect JSON data from the request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    foreach ($data as $item) {
        $curriculum_id = intval($item->curriculum_id);

        // Delete data from the 'cv_work_experience' table based on curriculum_id
        $sql = "DELETE FROM curriculum_cv WHERE curriculum_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $curriculum_id);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Record deleted successfully"));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }

        $stmt->close();
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}

// Close the database connection
$conn->close();
?>
