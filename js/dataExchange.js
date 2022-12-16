function getFileList()
{
	return

	var fileSelect = document.getElementById("fileSelect");
	fileSelect.innerHTML = "";
	var req = new XMLHttpRequest();
	req.open("GET", "fileList.php",true);
	req.onreadystatechange = response;
	req.send();
	function response()
	{
		if (req.readyState==4 && req.status==200)
		{
			fileSelect.innerHTML = req.responseText;
		}
	}
}

function saveFile()
{
	return

	var button = document.getElementById("saveF");
	button.value = "Saving...";
	
	var filename = document.getElementById("fileName");
	name = filename.value;
	
	var post = "name=" + name + "&tab=" + JSON.stringify(a);
	var req = new XMLHttpRequest();
	req.open("POST", "saveFile.php", true);
	req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	req.onreadystatechange = response;
	req.send(post);
	function response()
	{
		if (req.readyState==4 && req.status==200)
		{
			getFileList();
			button.value = "Save";
		}
	}
	
	var currentFile = document.getElementById("currentFile");
	currentFile.innerHTML = filename.value;
	
	filename.value = "";
}

function saveChanges()
{
	return

	var button = document.getElementById("saveCF");
	button.value = "Saving...";
	var currentFile = document.getElementById("currentFile");
	var filename = currentFile.innerHTML;
	if (filename == "New File") 
	{
		alert("Save the file first!");
		button.value = "Save Changes";
	}
	else
	{
		post = "name=" + filename + "&tab=" + JSON.stringify(a);
		var req = new XMLHttpRequest();
		req.open("POST", "dataExchange.php", true);
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		req.onreadystatechange = response;
		req.send(post);
		function response()
		{
			if (req.readyState==4 && req.status==200)
			{
				button.value = "Save Changes";
			}
		}
	}
}

function loadFile()
{
	return

	var filename = document.getElementById("fileSelect");
	var req = new XMLHttpRequest();
	req.open("GET", "giveFile.php?name="+filename.value,true);
	req.onreadystatechange = response;
	req.send();
	function response()
	{
		if (req.readyState==4 && req.status==200)
		{
			var fileToLoad = JSON.parse(req.responseText);
			a = new lines();
			
			for (var i=0; i<fileToLoad.lines.length; i++)
			{ 
				if (i!=0) { a.lines.push(new aLine(i+1)); }
				a.lines[i].length = fileToLoad.lines[i].length;
				for (var j=0; j<fileToLoad.lines[i].bars.length; j++)
				{
					a.lines[i].bars.push(new aBar());
					a.lines[i].bars[j].length = fileToLoad.lines[i].bars[j].length;
					a.lines[i].bars[j].duration = fileToLoad.lines[i].bars[j].duration;
					for (var k=0; k<fileToLoad.lines[i].bars[j].beats.length; k++)
					{
						a.lines[i].bars[j].beats.push( new aBeat(fileToLoad.lines[i].bars[j].beats[k].notes) );
						a.lines[i].bars[j].beats[k].duration = fileToLoad.lines[i].bars[j].beats[k].duration;
					}
				}
			}
			sheet.width = sheet.width;
			notes.width = notes.width;
			resetEditor();
			a.print();
		}
	}
	var currentFile = document.getElementById("currentFile");
	currentFile.innerHTML = filename.value;
}

function deleteFile()
{
	return
	
	if (confirm("Da labi?"))
	{
		var filename = document.getElementById("fileSelect");
		
		var req = new XMLHttpRequest();
		req.open("GET", "deleteFile.php?name="+filename.value,true);
		req.onreadystatechange = response;
		req.send();
		function response()
		{
			if (req.readyState==4 && req.status==200)
			{
				getFileList();
			}
		}
		
		var currentFile = document.getElementById("currentFile");
		if (filename.value == currentFile.innerHTML)
		{
			initialize();
		}
	}
}