function lines()
{
	this.lines = [new aLine(1)];
	this.lines[0].indent += firstIndent;
	
	this.print = printLines;
	this.addLine = addLine;
	this.deleteLine = deleteLine;
	
	function printLines()
	{
		for (var l=0; l<this.lines.length; l++) {this.lines[l].print();}
	}
	
	function addLine()
	{
		if (sheet.height < ((this.lines.length+1)*7*stringGap))
		{
			var saveSheet = sCTX.getImageData(0,0,sheet.width,sheet.height);
			var saveNotes = nCTX.getImageData(0,0,notes.width,notes.height);
			var saveEditor = eCTX.getImageData(0,0,editor.width,editor.height);
			sheet.height = (this.lines.length+1)*7*stringGap;
			notes.height = (this.lines.length+1)*7*stringGap;
			editor.height = (this.lines.length+1)*7*stringGap;
			sCTX.putImageData(saveSheet,0,0);
			nCTX.putImageData(saveNotes,0,0);
			eCTX.putImageData(saveEditor,0,0);
		}
		this.lines.push(new aLine(this.lines.length+1));
	}
	
	function deleteLine()
	{
		if (this.lines.length>1) {this.lines.pop();}
		sCTX.clearRect(start[0]-1,start[1]+(7*(this.lines.length)-0.5)*stringGap,length+2,6*stringGap);
		nCTX.clearRect(start[0]-1,start[1]+(7*(this.lines.length)-0.5)*stringGap,length+2,6*stringGap);
		if (sheet.height > ((this.lines.length)*7*stringGap) && sheet.height>600)
		{
			var saveSheet = sCTX.getImageData(0,0,sheet.width,sheet.height);
			var saveNotes = nCTX.getImageData(0,0,notes.width,notes.height);
			var saveEditor = eCTX.getImageData(0,0,editor.width,editor.height);
			sheet.height = (this.lines.length)*7*stringGap;
			notes.height = (this.lines.length)*7*stringGap;
			editor.height = (this.lines.length)*7*stringGap;
			sCTX.putImageData(saveSheet,0,0);
			nCTX.putImageData(saveNotes,0,0);
			eCTX.putImageData(saveEditor,0,0);
		}
	}
}

function aLine(nr)
{
	this.bars = [];
	this.number = nr;
	this.indent = start[0] + indent;
	this.length = this.indent-0.75*noteGap;
		
	this.print = printLine;
	this.update = updateLine;
	this.insertBar = insertBar;
	this.deleteBar = deleteBar;
	
	function printLine()
	{
		sCTX.clearRect(start[0],start[1]+(7*(this.number-1)-0.5)*stringGap,length,6*stringGap);
		nCTX.clearRect(start[0],start[1]+(7*(this.number-1)-0.5)*stringGap,length,7*stringGap);
		
		if (this.number==1) {startSheet();}
		drawLines(this.number);	
		
		var pos = this.indent ;

		for (var b=0; b<this.bars.length; b++)
		{
			pos = this.bars[b].print(this.number,pos);
		}
	}
	
	function updateLine()
	{
		this.length = this.indent-0.75*noteGap;
		for (var b=0; b<this.bars.length; b++)
		{
			this.length += this.bars[b].length;
		}
		
		if (this.length > length)
		{
			if (this.bars.length > 1)
			{
				if (this.number==a.lines.length) {a.addLine();}
				this.length -= this.bars[this.bars.length-1].length;
				a.lines[this.number].insertBar(0,this.bars.pop());
			}
			else {alert("Bar too long for this page width!");}
		}
		
		if (this.number>1 && this.bars.length>0)
			if (a.lines[this.number-2].length + this.bars[0].length < length)
			{
				this.length -= this.bars[0].length;
				a.lines[this.number-2].insertBar(a.lines[this.number-2].bars.length,this.bars.shift());
			}
		
		var full = 0;
		
		while (full==0 && a.lines.length>this.number)
		{
			if (a.lines[this.number].bars[0].length + this.length > length) {full=1;}
			else
			{				
				this.insertBar(this.bars.length,a.lines[this.number].bars.shift());
				a.lines[this.number].update();
				if( a.lines[this.number].bars.length == 0) {a.deleteLine();}
			}			
		}
		this.print();
	}
	
	function insertBar(pos,newBar)
	{
		this.bars.splice(pos,0,newBar);
		this.length += newBar.length;
		
		if (this.bars.length>1)
		{
			while (this.length>length)
			{
				if (a.lines.length == this.number) {a.addLine();}
				this.length -= this.bars[this.bars.length - 1].length;
				a.lines[this.number].insertBar(0,this.bars.pop());
			}
		}
		this.print();
	}
	
	function deleteBar(pos)
	{
		this.length -= this.bars[pos].length;
		this.bars.splice(pos,1);
	}
}

function aBar()
{
	this.beats = [];
	this.length = 0.5*noteGap;
	this.duration = 0;
	
	this.print = printBar;
	this.insertBeat = insertBeat;
	this.deleteBeat = deleteBeat;
	
	function printBar(line,pos)
	{
		for (var b=0; b<this.beats.length; b++)
		{
			this.beats[b].print(line,pos);
			pos += noteGap;
		}
		barLine(line,pos-0.25*noteGap);
		return(pos+0.5*noteGap);
	}
	
	function insertBeat(pos,beat)
	{
		this.duration += 1/beat.duration;
		this.beats.splice(pos,0,beat);
		this.length += noteGap;
	}
	
	function deleteBeat(pos)
	{
		this.duration -= 1/this.beats[pos].duration;
		this.beats.splice(pos,1);
		this.length -= noteGap;
	}
}

function aBeat(notes)
{
	this.notes = notes;
	this.duration = 4;
	
	this.print = printBeat;
	this.reprint = reprintBeat;
	this.insertNote = insertNote;
	this.deleteNote = deleteNote;
	
	function printBeat(line,pos)
	{
		displayLength(pos,line,this.duration);
		for (var n=0; n<this.notes.length; n++)	
		{			
			displayNote(pos,this.notes[n][0],this.notes[n][1],line)
		}
	}
	
	function reprintBeat(line,pos)
	{
		nCTX.clearRect(pos-5,start[1]+stringGap*(7*(line-1)-0.5),10,7*stringGap);
		this.print(line,pos)
	}
	
	function insertNote(string,fret)
	{
		for (n=0; n<this.notes.length; n++)
		{
			if (this.notes[n][0]==string) 
			{
				this.notes[n][1]=fret;
				return;
			}
		}
		this.notes.push([string,fret]);
	}
	
	function deleteNote(string)
	{
		for (n=0; n<this.notes.length; n++)
			if (this.notes[n][0]==string) {this.notes.splice(n,1);}
	}
}