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
        $achievement_id = intval($item->achievement_id);

        // Delete data from the 'achievement_cv' table based on achievement_id
        $sql = "DELETE FROM achievement_cv WHERE achievement_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $achievement_id);

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
