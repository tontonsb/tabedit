function displayEditor()  //Zîmç rediìçtâju
{
	eCTX.clearRect(0,0,editor.width,editor.height);
	eCTX.beginPath();
	eCTX.strokeStyle='#00F';
	eCTX.lineWidth=0.5;
	editorPos = a.lines[editLine-1].indent;

	for (var b=1; b<editBar; b++) {editorPos += a.lines[editLine-1].bars[b-1].length;}
	editorPos += (editBeat-1)*noteGap;
	eCTX.clearRect(editorPos-7,start[1]+(editString+(editLine-1)*7-1.5)*stringGap-1,14,stringGap+2);
	eCTX.strokeRect(editorPos-7,start[1]+(editString+(editLine-1)*7-1.5)*stringGap-1,14,stringGap+2);
	eCTX.fillStyle='rgba(0,0,120,0.05)';
	eCTX.clearRect(editorPos-8,start[1]+(editString+(editLine-1)*7-1.5)*stringGap+2,16,stringGap-4);
	eCTX.fillRect(editorPos-7,start[1]+(editString+(editLine-1)*7-1.5)*stringGap-1,14,stringGap+2);
}

function resetEditor()
{
	editLine = 1;
	editBar = 1;
	editBeat = 1;
	editString = strings;
	editorPos = 0;
	displayEditor();
}

function displayHighlight()
{
	eCTX.clearRect(0,0,editor.width,editor.height);
	eCTX.beginPath();
	eCTX.fillStyle='rgba(0,0,120,0.05)';
	eCTX.strokeStyle='rgba(0,0,120,0.75)';
	
	var firstBeat;
	var lastBeat;
	var firstBar = editBar;
	var lastBar = highlightBar;
	
	if (editLine == highlightLine)
	{
		if (firstBar == lastBar)
		{
			if ( editBeat <= highlightBeat )
			{
				firstBeat = editBeat;
				lastBeat = highlightBeat;
			}
			else
			{
				firstBeat = highlightBeat + 1;
				lastBeat = editBeat;
			}
		}
		else
		{
			firstBeat = 1;
			if(firstBar > lastBar)
			{ 
				firstBar = highlightBar;
				lastBar = editBar;
			}
			lastBeat = a.lines[highlightLine-1].bars[lastBar-1].beats.length;
		}
	}
	else
	{	
		firstBeat = editBeat;
		lastBeat = highlightBeat;
	}
	
	var firstPos = a.lines[editLine-1].indent;
	for (var b=1; b<firstBar; b++) {firstPos += a.lines[editLine-1].bars[b-1].length;}
	firstPos += (firstBeat-1)*noteGap;
	
	var lastPos = a.lines[highlightLine-1].indent;
	for (var b=1; b<lastBar; b++) {lastPos += a.lines[highlightLine-1].bars[b-1].length;}
	lastPos += (lastBeat-1)*noteGap;
	
	eCTX.fillRect(firstPos-10,start[1]+((highlightLine-1)*7-0.5)*stringGap,lastPos-firstPos+noteGap-3,7*stringGap);
	eCTX.strokeRect(firstPos-10,start[1]+((highlightLine-1)*7-0.5)*stringGap,lastPos-firstPos+noteGap-3,7*stringGap);
}

//**************************//
//          MOUSE           //
//**************************//

function mousePress(e)
{
	cellOpen = -1;
	mouseDown = true;
	mousePos = getMousePos(editor,e);
	
	editLine = Math.floor((mousePos.y-start[1]+stringGap)/stringGap/7)+1;
	
	if (editLine>(a.lines.length))
	{
		editLine = a.lines.length;
		editString = strings;
	}
	else {editString = Math.floor((mousePos.y-start[1]-stringGap*(7*(editLine-1)-1.5))/stringGap);}
	
	if (editString>strings) {editString = strings;}
	if (editString<1) {editString = 1;}

	var editBarPos = a.lines[editLine-1].indent - 0.75*noteGap;
	
	if (mousePos.x<a.lines[editLine-1].length)
	{
		editBar = 0;

		while (editBarPos<mousePos.x)
		{
			editBarPos += a.lines[editLine-1].bars[editBar].length;
			editBar++;
		}
		editBarPos -= a.lines[editLine-1].bars[editBar-1].length;
	}
	else {editBar = a.lines[editLine-1].bars.length;}
	
	editBeat = Math.floor((mousePos.x-editBarPos-0.25*noteGap)/noteGap)+1;
	if (editBeat<1) {editBeat=1;}
	if (editBeat>a.lines[editLine-1].bars[editBar-1].beats.length) {editBeat=a.lines[editLine-1].bars[editBar-1].beats.length;}
}

function mouseMove(e)
{
	if (mouseDown == true) 
	{
		position = getMousePos(editor,e);
		if ( Math.abs(position.x-mousePos.x)>2 )
		{
			highlight(position);
		}
	}
}

function mouseRelease(e)
{
	mouseDown = false;
	position = getMousePos(editor,e);
	if ( Math.abs(position.x-mousePos.x)<2 && Math.abs(position.y-mousePos.y)<2) 
	{ 
		highlighted = false;
		hasClicked(e); 
	}
}

function hasClicked(e)  //Apstrâdâ peles klikðíi
{
	highlightLine = false;
	displayEditor();
}

function highlight(position)
{
	highlightLine = Math.floor((position.y-start[1]+stringGap)/stringGap/7)+1;
	if (highlightLine>(a.lines.length))
	{
		highlightLine = a.lines.length;
	}
	
	var highlightBarPos = a.lines[highlightLine-1].indent - 0.75*noteGap;
	
	if (position.x<a.lines[highlightLine-1].length)
	{
		highlightBar = 0;

		while (highlightBarPos<position.x)
		{
			highlightBarPos += a.lines[highlightLine-1].bars[highlightBar].length;
			highlightBar++;
		}
		highlightBarPos -= a.lines[highlightLine-1].bars[highlightBar-1].length;
	}
	else {highlightBar = a.lines[highlightLine-1].bars.length;}
	
	highlightBeat = Math.floor((position.x-highlightBarPos+5)/noteGap);
	if (highlightBeat<1) {highlightBeat=1;}
	if (highlightBeat>a.lines[highlightLine-1].bars[highlightBar-1].beats.length) 
	{
		highlightBeat=a.lines[highlightLine-1].bars[highlightBar-1].beats.length;
	}
	
	displayHighlight();
}

function getMousePos(editor,e) 
{
	var bound = editor.getBoundingClientRect();
	return {
		x: e.clientX - bound.left,
		y: e.clientY - bound.top};
}


//**************************//
//         KEYBOARD         //
//**************************//

function keyboardControl(e)
{
//******** MOVEMENT ********//
	if(e.keyCode>36 && e.keyCode<41)
	{
		cellOpen = -1;
		if(e.keyCode==37) 
		{ 	if (editBeat>1) {editBeat-=1}
			else if (editBar!=1)
			{	editBar-=1;
				editBeat=a.lines[editLine-1].bars[editBar-1].beats.length;}
			else if (editLine!=1)
			{	editLine-=1;
				editBar=a.lines[editLine-1].bars.length;
				editBeat=a.lines[editLine-1].bars[editBar-1].beats.length;}} 
		else if (e.keyCode==38) 
		{ 	if (editString!=1) {editString-=1}
			else {editString=6} } 
		else if (e.keyCode==39) 
		{ 	if (editBeat<a.lines[editLine-1].bars[editBar-1].beats.length) {editBeat+=1}
			else if (a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].notes.length>0 && a.lines[editLine-1].bars[editBar-1].duration<1)
			{
				a.lines[editLine-1].bars[editBar-1].insertBeat(a.lines[editLine-1].bars[editBar-1].beats.length,new aBeat([]));
				editBeat += 1;
				a.lines[editLine-1].update();
				if (editBar > a.lines[editLine-1].bars.length)
				{
					editBar = 1;
					editLine += 1;
				}}
			else if (editBar<a.lines[editLine-1].bars.length)
			{	editBar+=1;
				editBeat=1;	}
			else if (editLine<a.lines.length)
			{	editLine+=1;
				editBar=1;
				editBeat=1;}
			else
			{	a.lines[editLine-1].insertBar(a.lines[editLine-1].bars.length,new aBar);
				a.lines[a.lines.length-1].bars[a.lines[a.lines.length-1].bars.length-1].insertBeat(0, new aBeat([]));
				a.lines[a.lines.length-1].update();
				editLine = a.lines.length;
				editBar = a.lines[a.lines.length-1].bars.length;
				editBeat = 1;
				a.lines[editLine-1].print();}}
		else if (e.keyCode==40) 
		{ 	if (editString!=6) {editString+=1}
			else {editString=1} }
		displayEditor();
	}

//******** TYPING ********//
	if(e.keyCode>47 && e.keyCode<58)  //numbers
	{
		if (cellOpen > -1)
		{
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].insertNote(editString,cellOpen*10+e.keyCode-48);
			cellOpen = -1;
		}
		else
		{
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].insertNote(editString,e.keyCode-48);
			if(e.keyCode-48<3) {cellOpen=e.keyCode-48;}
		}
		a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].print(editLine,editorPos);
	}

	if(e.keyCode>95 && e.keyCode<106)  //numpad
	{
		if (cellOpen > -1)
		{
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].insertNote(editString,cellOpen*10+e.keyCode-96);
			cellOpen = -1;
		}
		else
		{
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].insertNote(editString,e.keyCode-96);
			if(e.keyCode-96<3) {cellOpen=e.keyCode-96;}
		}
		a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].print(editLine,editorPos);
	}

	if(e.keyCode == 107)  // +
	{
		cellOpen = -1;
		if (a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration > 1)
		{
			a.lines[editLine-1].bars[editBar-1].duration += 1/a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration;
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration /= 2; 
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].reprint(editLine,editorPos);
		}
	}
	
	if(e.keyCode == 109)  // -
	{
		cellOpen = -1;
		if (a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration < 16)
		{
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration *= 2; 
			a.lines[editLine-1].bars[editBar-1].duration -= 1/a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].duration;
			a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].reprint(editLine,editorPos);
		}	
	}
	
//******** COMMANDS ********//
	if(e.keyCode==46) //delete
	{
		cellOpen = -1;
		a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].deleteNote(editString);
		a.lines[editLine-1].bars[editBar-1].beats[editBeat-1].reprint(editLine,editorPos);
	}
	
	if(e.keyCode==8) //backspace
	{
		cellOpen = -1;
		if (a.lines.length==1 && a.lines[0].bars.length==1 && a.lines[0].bars[0].beats.length==1)
		{
			a.lines[0].bars[0].insertBeat(0, new aBeat([]));
			editBeat += 1;
		}
		
		a.lines[editLine-1].bars[editBar-1].deleteBeat(editBeat-1);
		
		var lineChanged = 0;
		
		if (editBeat!=1) {editBeat-=1;}
		else if (a.lines[editLine-1].bars[editBar-1].beats.length==0)
		{
			a.lines[editLine-1].deleteBar(editBar-1);
			if (editBar>1)
			{
				editBar -= 1;
				editBeat = a.lines[editLine-1].bars[editBar-1].beats.length;
			}
			else if (editLine!=1)
			{
				editLine -= 1;
				lineChanged = 1;
				editBar = a.lines[editLine-1].bars.length;
				editBeat = a.lines[editLine-1].bars[editBar-1].beats.length;
			}
		}

		if (editLine > 1)
			if (a.lines[editLine-2].length + a.lines[editLine-1].bars[0].length < length)
			{
				editBar = a.lines[editLine-2].bars.length + 1;
				editLine -= 1;
				lineChanged = 1;
			}
		
		a.lines[editLine+lineChanged-1].update();
		if (a.lines[editLine+lineChanged-1].bars.length==0) {a.deleteLine();}
		
		displayEditor();
	}
	
	if(e.keyCode==45) //insert
	{
		cellOpen = -1;
		if (e.ctrlKey)
		{
			a.lines[editLine-1].insertBar(editBar-1, new aBar());
			a.lines[editLine-1].bars[editBar-1].insertBeat(0, new aBeat([]));
			editBeat = 1;
			if (editLine>1) { var lineChangeWatch = a.lines[editLine-2].bars.length;}
			a.lines[editLine-1].update();
			if (editLine>1) 
			{ 
				if (lineChangeWatch < a.lines[editLine-2].bars.length)
				{
					editLine -= 1;
					editBar = a.lines[editLine-1].bars.length;
				}
			}
			displayEditor();
		}
		else
		{
			a.lines[editLine-1].bars[editBar-1].insertBeat(editBeat-1, new aBeat([]));
			a.lines[editLine-1].update();
			if (editBar > a.lines[editLine-1].bars.length) 
			{
				editLine += 1;
				editBar = 1;
				displayEditor();
			}
		}
	}
	
	if(e.keyCode==83 && e.ctrlKey) //ctrl+s
	{
		cellOpen = -1;
		saveChanges();
	}
	return false;
}
