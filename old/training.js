//for this script, mirror = false
//for this script, tracing = color

var materials = {
		'file_names' : [
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/chemin.png",
			  "https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s0e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T0h.png",
			  "https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T1e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T1h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T2e.png",
				//5
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T2h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p1e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p1h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p2e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p2h.png",
				//10
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r5e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r5h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r2e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r2h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q4e.png",
				//15
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q4h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q1e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q1h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s15e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s15h.png",
				//20
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s30e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s30h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T3e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T3h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T4e.png",
				//25
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T4h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p3e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p3h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p4e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/p4h.png",
				//30
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r1e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r1h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r3e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/r3h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q2e.png",
				//35
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q2h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q3e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/q3h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s45e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s45h.png",
				//40
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s75e.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s75h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/s0h.png",
				"https://raw.githubusercontent.com/LiseBrun/mirror_trace/master/figures/T110e.png",

			],

			'xstarts' : [55, 57, 32, 35, 333, 95, 245, 45, 383, 135, 13, 290, 46, 16,	210, 92, 158, 51, 360, 325, 41, 55, 309, 317, 139, 278, 179, 303, 351, 39, 10, 16, 326, 109, 218, 36, 41, 228, 228, 135, 342, 202, 126, 56, 208],
			'ystarts' : [237, 149, 59, 44, 94, 53, 113, 184, 258, 19, 40, 41, 183, 41, 285, 221,	283, 253, 105, 8, 139, 139, 46, 45, 247, 31, 28, 28, 244, 128, 120, 20, 276, 100, 251, 250, 69, 41, 218, 37, 215, 215, 286, 286, 146, 20],
			'xends' :   [349, 357, 298, 333, 35, 245, 95, 383, 45, 13, 135, 46, 290, 210, 16, 158, 92, 51, 360, 41, 325, 309, 55, 228, 218, 179, 278, 351, 303, 10, 39, 326, 16, 218, 109, 41, 36, 28, 28, 342, 135, 126, 203, 352, 3],
			'yends' :   [34, 149, 243, 213, 262, 172, 232, 11, 86, 253, 275, 169, 28, 72, 8, 26, 26, 152, 250, 63, 63, 193, 193, 143, 134, 255, 255, 145, 29, 284, 184, 269, 93, 16, 16, 267, 240, 37, 218, 6, 6, 2, 2, 146, 94]
		}



	//image dimensions
	var mywidth = 400;
	var myheight = 300;

	var score = 0;
	var timeDiff = 0;
	var trialnumber = 0;
	var drawing = false;
	var finished = false;
	var timeFinished = 0;
	var canvas;
	var ctx;
	var crossings = 0;
	var distance_total = 0;
	var distance_current = 0;
	var distance_inline = 0;
	var distance_offline = 0;
	var startTime = 0;
	var endTime = 0;
	var lastRefresh = 0;
	var currentRefresh = 0;


function do_training() {
	//load materials
	var imagePath = materials.file_names[trialnumber];
	//definition des emplacement des ronds de départ et d'arrivée
	var xstart = materials.xstarts[trialnumber];
	var ystart = materials.ystarts[trialnumber];;
	var startRadius = 15;
	var xend = materials.xends[trialnumber];
	var yend = materials.yends[trialnumber];
	var endRadius = 15;


	//states to track
	drawing = false;
	finished = false;
	score = 0;
	timeDiff = 0;
	timeFinished = 0;
	var inline = false;
	crossings = 0;
	distance_total = 0;
	distance_current = 0;
	distance_inline = 0;
	distance_offline = 0;
	startTime = 0;
	endTime = 0;
	lastRefresh = 0;
	currentRefresh = 0;

	//drawing contexts for cursor area : canvas
	canvas = document.querySelector('#paint');
	ctx = canvas.getContext('2d');

  //remove the mouse cursor display
	//canvas.style.cursor = 'none';

	//load the image to trace
	var imageObj = new Image();
	imageObj.onload = function() {
		ctx.drawImage(imageObj, 0, 0, mywidth, myheight);
		ctx.globalAlpha=0.4;
		//Beginning of trial
		ctx.beginPath();
		//Creation du rond vert de départ
		ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		//transparence du rond vert
	  ctx.globalAlpha=1;
	  document.getElementById("status").innerHTML = "Cliquez sur le cercle vert pour commencer cet essai.";
	};

		imageObj.crossOrigin="anonymous";
    imageObj.src=imagePath;


	//defines data structure for mouse movement
	var mouse = {x: 0, y: 0};
  var mouseold = {x: 0, y: 0};

	/* Drawing on Paint App */
	// Width (largeur) of line
	ctx.lineWidth = 0.5;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	//ctx.strokeStyle = 'blue';


	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
	  //get mouse coordinates
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;

		//update status
		var pos = betterPos(canvas, e);
		var x = pos.x;
		var y = pos.y;
		mouse.x = x;
		mouse.y = y;
		var coord = "x=" +  (x) + ", y=" + (y);
		var p = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

		//finir l'essai ?
		var cendRadius = Math.sqrt(Math.pow(mouse.x - xend, 2) + Math.pow(mouse.y-yend, 2));
		if(cendRadius < 50 + endRadius) {
			canvas.style.cursor = 'auto';
		}
		 if (cendRadius < endRadius) {
		  if (drawing) {
			drawing = false;
			finished = true;
			}
		}


		 //do drawing if in drawing mode
		 if(drawing) {
		    if (mouseold.x - mouse.x + mouseold.y - mouse.y != 0) {
				distance_current = Math.sqrt(  Math.pow(mouseold.x - mouse.x, 2) + Math.pow(mouseold.y - mouse.y, 2) )
			} else {
				distance_current = 0;
			}

			//check to see where we are drawing
			if (p[0]+p[1]+p[2] < 200) {
				if(inline) {
					distance_inline = distance_inline + distance_current;
				} else {
					inline = true;
					crossings = crossings+ 1;
					distance_inline = distance_inline + (0.5*distance_current);
					distance_offline = distance_offline + (0.5*distance_current);
					ctx.beginPath();
					ctx.moveTo(mouse.x, mouse.y);

				}
			}  else {
				if(inline) {
					inline = false;
					crossings = crossings + 1;
					distance_inline = distance_inline + (0.5*distance_current);
					distance_offline = distance_offline + (0.5*distance_current);
					ctx.beginPath();
					ctx.moveTo(mouse.x, mouse.y);
					} else {
					distance_offline = distance_offline + distance_current;
				}
			}

			score = distance_inline / (distance_offline + distance_inline);
			// score = distance_current;
			endTime = new Date();
			timeDiff = (endTime - startTime)/1000;

			//trace in transparent
			if (inline) {
				ctx.strokeStyle = '#ffffff00';
			} else {
				ctx.strokeStyle = '#ffffff00';
			}

			//trace in color: red
			// if (inline) {
			// 	ctx.strokeStyle = 'green';
			// } else {
			// 	ctx.strokeStyle = 'red';
			// }

			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
			//remove score display during task :
			document.getElementById("status").innerHTML = "Rejoignez le cercle rouge en restant le plus possible sur les lignes de la figure. <br>Score = " + Math.round(score *100) +"% ";
			document.getElementByID("status").innerHTML = p[0]+p[1]+p[2];

		} else {
		    if(!finished) {
			currentRefresh = new Date();
			if (currentRefresh - lastRefresh > (100/30) ) {
				ctx.drawImage(imageObj, 0, 0, mywidth, myheight);

				ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'green';
				ctx.globalAlpha=0.4;
				ctx.fill();

				// ctx.fillStyle = 'green';
				// ctx.globalAlpha=1;

				ctx.beginPath();
				ctx.arc(mouse.x, mouse.y, 4, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'green';
				ctx.globalAlpha=1;
				ctx.fill();
				lastRefresh = currentRefresh
				document.getElementById("status").innerHTML = "Cliquez sur le cercle vert pour commencer";
			}
			} else {
				//remove score display at the end of the task:
				//document.getElementById("status").innerHTML = "Finished with score = " + Math.round(score *100) + "%<BR> Click next to continue.";

				//display "you have finished the task"
				document.getElementById("status").innerHTML = "Vous avez terminé cet essai avec le score suivant : "+ Math.round(score *100) + "%.<br> Cliquez sur la flèche verte en bas à droite pour continuer.";
			}
		}

		 //store current coordinates
		 mouseold.x = mouse.x;
		 mouseold.y = mouse.y;

	}, false);



	canvas.addEventListener('mousedown', function(e) {
		var currentRadius = Math.sqrt(Math.pow(mouse.x - xstart, 2) + Math.pow(mouse.y-ystart, 2));
		if(!finished) {
			if (drawing) {
				} else {
				    if (currentRadius < startRadius) {
					    ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.drawImage(imageObj, 0, 0, mywidth, myheight);
							ctx.fillStyle = 'red';
							ctx.globalAlpha=0.4;
							ctx.beginPath();
							ctx.arc(xend, yend, endRadius, 0, 2 * Math.PI, false);
							ctx.fill();
							ctx.globalAlpha=1;

						drawing = true;
						finished = false;
						startTime = new Date();
						ctx.beginPath();
						canvas.style.cursor = 'none';
						document.getElementById("status").innerHTML = "Rejoignez le cercle rouge en restant le plus possible sur les lignes de la figure.";
							ctx.moveTo(mouse.x, mouse.y);
					}
				}
			}

	}, false);

	var onPaint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
	};

function betterPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
            document.getElementById("status").innerHTML += obj.id + " Left: " + obj.offsetLeft + "Top: " + obj.offsetTop + " / ";
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

}
