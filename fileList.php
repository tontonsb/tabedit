<?php
	$db = new mysqli("localhost", "tabFiles", "tabieris","tab");
	$names = $db->prepare("SELECT name FROM tabfiles");
	$names->execute();
	$names->bind_result($name);
	while ($names->fetch())
	{
		echo "<option>".$name."</option>";
	}
	$names->close();
	$db->close();
?>