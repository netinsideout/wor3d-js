/* Copyright (c) 2013 DISPARAT / Stephane Hesse */

/*
	@author: Stephan Hesse <disparat@gmail.com>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

function Disparat_TextCanvas(text, canvasFillStyle, font, width, height, lineheight, leftMargin, topMargin, wrap, wrapLength){

	/* Initialize objects */
	if(!leftMargin) leftMargin = 0;
	if(!topMargin) topMargin = 0;
	if(!wrap) wrap = false; 
	if(!wrapLength) wrap = false;
	var baseline = lineheight + topMargin;
	var bitmap = document.createElement('canvas');
	var g = bitmap.getContext('2d');
	bitmap.width = width ;
	bitmap.height = height ;
	g.font = FONT;

	/* Basic mode: Break text up into lines from ASCII or HTML linebreaks */
	var lines = text.split(/\r\n|\r|\n|<br>|<p>/g);

	console.log("Total length: " + text.length);

	console.log("Found " + (lines.length - 1) + " basic linebreaks");

	/* Wrap mode: Check for too long lines and wrap them */
	if(wrap) {
		var lines2 = new Array();
		for(var i=0;i<lines.length;i++) { //check all lines
			if(lines[i].length > wrapLength) { //line too long
				console.log("Wrap: " + wrapLength);
				var numPieces = lines[i].length / wrapLength; //break into pieces
				console.log(lines[i] + " " + numPieces);
				for(var k=0;k<numPieces;k++) { //wrap pieces up

					if(k == numPieces-1) { //last piece, fold on end of string
						var str = lines[i].substring( k * wrapLength ) ;
						lines2.push(str);
						console.log(k*wrapLength);
					} else { //other pieces
						var str = lines[i].substring( k * wrapLength, k * wrapLength + wrapLength );
						lines2.push(str);
						console.log(k*wrapLength + " -> " + ( k* wrapLength + wrapLength ));
					}
				}
			} else { //dont wrap
				lines2.push( lines[i] );
			}
		}
		lines = lines2; /* copy result */
	} 

	/* Draw text onto canvas */
	for(var i=0;i<lines.length;i++) {
		console.log(lines[i]);
		g.fillStyle = canvasFillStyle;
		g.fillText(lines[i], leftMargin, baseline);
		baseline += lineheight;
	}

	/* setup object public members */
	this.domElement = bitmap;
	var that = this;

	this.getDomElement = function () {
		return that.domElement;
	}

	//return bitmap;
}