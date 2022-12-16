function startSheet()
{
	sCTX.beginPath();
	sCTX.lineWidth = 3;
	sCTX.fillStyle="#000";
	sCTX.moveTo(start[0],start[1]);
	sCTX.lineTo(start[0],start[1]+stringGap*5);
	sCTX.stroke();

	sCTX.lineWidth = 1;
	sCTX.beginPath();
	sCTX.moveTo(start[0],start[1]);
	sCTX.lineTo(start[0]+7,start[1]);
	sCTX.lineTo(start[0]+7,start[1]+stringGap*5);
	sCTX.lineTo(start[0],start[1]+stringGap*5);
	sCTX.stroke();
}

function drawLines(line)
{
	sCTX.beginPath();
	sCTX.strokeStyle='#000';
	sCTX.moveTo(start[0],start[1]+stringGap*7*(line-1));
	sCTX.lineTo(start[0],start[1]+stringGap*(5+7*(line-1)));
	sCTX.moveTo(length,start[1]+stringGap*7*(line-1));
	sCTX.lineTo(length,start[1]+stringGap*(5+7*(line-1)));
	for (var i=0; i<strings; i++)
	{
		sCTX.moveTo(start[0],start[1]+stringGap*(i+7*(line-1)));
		sCTX.lineTo(length,start[1]+stringGap*(i+7*(line-1)));
	}
	sCTX.stroke();
}

function barLine(line,pos)
{
	sCTX.beginPath();
	sCTX.strokeStyle='#000';
	sCTX.lineWidth = 2;
	sCTX.moveTo(pos,start[1]+stringGap*7*(line-1));
	sCTX.lineTo(pos,start[1]+stringGap*5+stringGap*7*(line-1));
	sCTX.stroke();
}

function displayNote(pos,str,fret,line)
{
	var size;
	if (fret<10) {size = 8;}
	else {size = 18;}
	nCTX.fillStyle='#eee';
	nCTX.clearRect(pos-10,start[1]+stringGap*(7*(line-1)+str-1)-0.5*stringGap,20,stringGap);
	nCTX.fillRect(pos-size/2-1,start[1]+stringGap*(7*(line-1)+str-1)-0.5*stringGap,size+2,stringGap);

	nCTX.fillStyle="black";
	nCTX.font=font;
	nCTX.fillText(fret,pos-size/2,start[1]+stringGap*(7*(line-1)+str-1)+6);
}

function displayLength(pos,line,duration)
{
	nCTX.beginPath();
	nCTX.strokeStyle='#000';
	if(duration >= 4)
	{
		nCTX.moveTo(pos,start[1]+stringGap*(7*line-2)+8);
		nCTX.lineTo(pos,start[1]+stringGap*(7*line-1)+4);
		if (duration >= 8)
		{
			nCTX.lineTo(pos+5,start[1]+stringGap*(7*line-1)+4);
			if (duration >= 16)
			{
				nCTX.moveTo(pos,start[1]+stringGap*(7*line-1)+1);
				nCTX.lineTo(pos+5,start[1]+stringGap*(7*line-1)+1);
			}
		}
	}
	else if (duration == 2)
	{
		nCTX.moveTo(pos,start[1]+stringGap*(7*line-2)+14);
		nCTX.lineTo(pos,start[1]+stringGap*(7*line-1)+4);
	}
	nCTX.stroke();
}