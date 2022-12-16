//GLOBÂLIE MAINÎGIE//
var sheet=document.getElementById("Sheet");
var sCTX=sheet.getContext("2d");

var notes=document.getElementById("Notes");
var nCTX=notes.getContext("2d");

var editor=document.getElementById("Editor");
var eCTX=editor.getContext("2d");


editor.onkeydown = keyboardControl;
editor.addEventListener('mousedown', mousePress, false);
editor.addEventListener('mouseup', mouseRelease, false);
editor.addEventListener('mousemove', mouseMove, false);

var mousePos;
var highlightLine = false;
var highlightBar = false;
var highlightBeat = false;
var mouseDown = false;
var editLine = 1;
var editBar = 1;
var editBeat = 1;
var editString = 1;
var editorPos = 0;
var a = new lines;
var cellOpen = -1;
//GLOBÂLIE MAINÎGIE//

//INICIALIZÂCIJA//
function initialize()
{
	a = new lines;
	a.lines[0].insertBar(0,new aBar);
	a.lines[0].bars[0].insertBeat(0,new aBeat([]));
	sheet.width = sheet.width;
	notes.width = notes.width;
	resetEditor();
	a.print();
	var currentFile = document.getElementById("currentFile");
	currentFile.innerHTML = "New File";
}

getFileList();
document.onload = initialize();
//INICIALIZÂCIJA//