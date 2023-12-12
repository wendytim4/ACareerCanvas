<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php'; // Include your database connection script

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect JSON data from the request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    // Validate and sanitize the data (you might need to improve this based on your requirements)
    $student_id = intval($data->student_id); 

    $github = mysqli_real_escape_string($conn, $data->github);
    $linkedin = mysqli_real_escape_string($conn, $data->linkedin);
    $phoneNumber = mysqli_real_escape_string($conn, $data->phoneNumber);
    $city = mysqli_real_escape_string($conn, $data->city);
    $country = mysqli_real_escape_string($conn, $data->country);
    $address = mysqli_real_escape_string($conn, $data->address);
    $email = mysqli_real_escape_string($conn, $data->email);
    $full_name = mysqli_real_escape_string($conn, $data->full_name);

    // Update the student record in the database based on the student ID
    // Insert data into the 'education' table using prepared statements
    $sql = "INSERT INTO studentprofile (github, linkedin, phonenumber, city, country, addresss, email,full_name,student_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param('ssssssssi', $github, $linkedin, $phoneNumber, $city, $country, $address, $email,$full_name,$student_id );

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Record inserted successfully"));
        } else {
            echo json_encode(array("error" => "Error executing prepared statement: " . $stmt->error));
        }

        $stmt->close();
    } else {
        echo json_encode(array("error" => "Error preparing statement: " . $conn->error));
    }
} else {
    // Invalid request method
    echo json_encode(array('error' => 'Invalid request method'));
}

// Close the database connection
$conn->close();
?>
