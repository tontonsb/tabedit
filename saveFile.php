<?php
	$host="localhost";
	$username="tabFiles";
	$password="tabieris";
	$db_name="tab";
	$tbl_name="tabfiles";

	$db = new mysqli("$host", "$username", "$password","$db_name");
	$sql="INSERT INTO $tbl_name VALUES('$_POST[name]', '$_POST[tab]')";
	$result = $db->query($sql);
	$result->close();
	$db->close();
	echo("done!");
?>

