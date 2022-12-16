<?php
	$host="localhost";
	$username="tabFiles";
	$password="tabieris";
	$db_name="tab";
	$tbl_name="tabfiles";

	$filename = $_GET['name'];
	
	$db = new mysqli("$host", "$username", "$password","$db_name");
	$sql="DELETE FROM $tbl_name WHERE name='".$filename."'";
	$result = $db->query($sql);
	$result->close();
	$db->close();
?>