<?php
	$filename = $_GET['name'];
	
	$db = new mysqli("localhost", "tabFiles", "tabieris","tab");
	$names = $db->prepare("SELECT tab FROM tabfiles WHERE name='".$filename."'");
	$names->execute();
	$names->bind_result($tab);
	$names->fetch();
	echo $tab;
	$names->close();
	$db->close();
?>