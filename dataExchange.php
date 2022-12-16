<?php
	$host="localhost";
	$username="tabFiles";
	$password="tabieris";
	$db_name="tab";
	$tbl_name="tabfiles";

	$db = new mysqli("$host", "$username", "$password","$db_name");
		
	$sql="UPDATE $tbl_name SET tab='$_POST[tab]' WHERE name='$_POST[name]'";
	$result = $db->query($sql);
	$result->close();
	$db->close();
	echo("done!");
?>

