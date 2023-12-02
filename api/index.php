<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO achievement(achievemnt_id, achievement_name, organization_name, year_attained) VALUES(null, :achievement_name, :organization_name, :year_attained)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':achievement_name', $$user ->achievement_name);
        $stmt->bindParam(':organization_name', $$user ->organization_name);
        $stmt->bindParam(':year_attained', $$user ->year_attained);


        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

	}