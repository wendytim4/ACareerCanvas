<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST");
	/**
	* Database Connection
	*/
	private $server = 'localhost';
	private $dbname = 'careercanvas';
	private $user = 'root';
	private $pass = '';


	$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

	if (!$conn) {
		die('Database connection failed!');
	}
		
	$achievement_name = mysqli_real_escape_string($conn, $_POST['achievement_name']);
	$organization_name = mysqli_real_escape_string($conn, $_POST['organization_name']);
	$year_attained = mysqli_real_escape_string($conn, $_POST['year_attained']);
		
	if (empty($achievement_name) || empty($organization_name) || empty($year_attained)) {
		echo 'Please fill in all fields.';
	} else {
		$query = "INSERT INTO data (achievement_name, organization_name, year_attained) VALUES ('$achievement_name', '$organization_name', '$year_attained')";
            
        if (mysqli_query($conn, $query)) {
            echo 'Form submitted successfully!';
        } else {
                echo 'Error submitting form.';
        }
	}
		
mysqli_close($conn);
?>