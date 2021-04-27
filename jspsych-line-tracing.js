/**
 * jspsych-html-button-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a button response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["jspsych-line-tracing"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'jspsych-line-tracing',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        pretty_name: 'Choices',
        default: undefined,
        description: 'The labels for the buttons.'
      },
      button_html: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button HTML',
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true,
        description: 'The html of the button. Can create own style.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed under the button.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      margin_vertical: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin vertical',
        default: '0px',
        description: 'The vertical margin of the button.'
      },
      margin_horizontal: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin horizontal',
        default: '8px',
        description: 'The horizontal margin of the button.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      figure_number: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Figure number',
        default: 0,
        description: 'Indicates the figure number to be called.'
      },
      trace_color: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Trace color',
        default: "color",
        description: 'Indicates the color to use for the trace, transparent is possible.'
      },
      score_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Score feedback',
        default: true,
        description: 'Presence or not of the score feedback.'
      },
      final_score_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Final core feedback',
        default: true,
        description: 'Presence or not of the score feedback at the end of the trial.'
      },
      start_instructions: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Start instructions',
        default: "Click on the green circle to start the trial",
        description: 'Instructions to start the task'
      },
      draw_instructions: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Draw instructions',
        default: "Go to the red circle to complete the trial",
        description: 'Instructions on how to draw'
      },
      end_instructions: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'End instructions',
        default: "You finished this trial",
        description: 'End of the trial'
      },
      cursor_display: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Cursor display',
        default: false,
        description: 'Display or not the cursor during the entire trial'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<div id="jspsych-html-button-response-stimulus">'+trial.stimulus+'</div>';

    html += '<div id="sketch"><canvas id="paint" width="500" height="500" style="border:1px solid #000000;"></canvas> </div>' +
                '<div id="status"></div>';

    // helper to show buttons
    function hide_continue_button() {
      var x = document.getElementById("jspsych-html-button-response-btngroup");
      // if (x.style.display === "none") {
      //   x.style.display = "block";
      // } else {
        x.style.display = "none";
      // }
    }

    // helper to show buttons
    function show_continue_button() {
      var x = document.getElementById("jspsych-html-button-response-btngroup");
      // if (x.style.display === "none") {
      //   x.style.display = "block";
      // } else {
        x.style.display = "block";
      // }
    }

    //display buttons
    var buttons = [];
    if (Array.isArray(trial.button_html)) {
      if (trial.button_html.length == trial.choices.length) {
        buttons = trial.button_html;
      } else {
        console.error('Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array');
      }
    } else {
      for (var i = 0; i < trial.choices.length; i++) {
        buttons.push(trial.button_html);
      }
    }
    html += '<div id="jspsych-html-button-response-btngroup">';
    for (var i = 0; i < trial.choices.length; i++) {
      var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
      html += '<div class="jspsych-html-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-html-button-response-button-' + i +'" data-choice="'+i+'">'+str+'</div>';
    }
    html += '</div>';

    //show prompt if there is one
    if (trial.prompt !== null) {
      html += trial.prompt;
    }
    display_element.innerHTML = html;

    // start time
    var start_time = performance.now();

    // add event listeners to buttons
    for (var i = 0; i < trial.choices.length; i++) {
      display_element.querySelector('#jspsych-html-button-response-button-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        after_response(choice);
      });
    }

    hide_continue_button();

    //--------------------- LINE TRACING TASK -------------------------------------------------------------------------------------------------------

    //for this script, mirror = false
    //for this script, tracing = color

    var materials = {
      'file_names' : [
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s0e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s15e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s30e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s45e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s45h.png",
          //5
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s75e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s75h.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/s0h.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/q4e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/q1e.png",
          //10
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/q2e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/q3e.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/test15px.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/test30px.png",
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/test60px.png",
          //15
          "https://raw.githubusercontent.com/LiseBrun/dys_metatrace_jspsych/main/figures/test75px.png",


        ],

        //							 0												5												  10                       15
            'xstarts' : [57,  331, 55,  349, 136, 206, 128, 57,  92,  360,  36,  232, 250, 250, 250, 250],
            'ystarts' : [146, 141, 46,  218, 218, 292, 292, 146, 283, 8,    69,  223, 250, 250, 250, 250],
            'xends' :   [358, 41,  314, 135, 345, 128, 206, 358, 158, 51,   40,  28,  490, 490, 490, 490],
            'yends' :   [146, 63,  195, 6,   6,   2,   2,   146, 26,  152,  270, 39,  250, 250, 250, 250]
    		}



    	//image dimensions
    	var mywidth = 500;
    	var myheight = 500;

    	var score = 0;
    	var timeDiff = 0;
    	var trialnumber = trial.figure_number;
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
      var trace_color = trial.trace_color;
      var score_feedback = trial.score_feedback;
      var final_score_feedback = trial.final_score_feedback;



    function line_tracing() {
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
    	canvas.style.cursor = 'none';

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
    	  ctx.globalAlpha=0.4;
    	  document.getElementById("status").innerHTML = trial.start_instructions + "<p class = 'custom-font'>&nbsp;</p><p class = 'custom-44px'>&nbsp;</p>";
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
          // hide/show buttons
          show_continue_button();
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

    			score = (distance_inline / (distance_offline + distance_inline))*10;
    			// score = distance_current;
    			endTime = new Date();
    			timeDiff = (endTime - startTime)/1000;


          // color of the trace as function of trace_color var
          if(trace_color == "transparent") {
      			//trace in transparent
      			if (inline) {
      				ctx.strokeStyle = '#ffffff00';
      			  } else {
        				ctx.strokeStyle = '#ffffff00';
      			  }
            } else {
                if (trace_color == "color") {
            			//trace in color: red
            			if (inline) {
            				ctx.strokeStyle = 'green';
            			} else {
            				ctx.strokeStyle = 'red';
            			}
               }
           }

    			ctx.lineTo(mouse.x, mouse.y);
    			ctx.stroke();
    			//remove score display during task :
          if(score_feedback == true) {
      			document.getElementById("status").innerHTML = trial.draw_instructions + `<p class = "custom-font">Score = ` + Math.round(score) + `</p><p class = 'custom-44px'>&nbsp;</p>`;
          } else {
            document.getElementById("status").innerHTML = trial.draw_instructions + "<p class = 'custom-font'>&nbsp;</p><p class = 'custom-44px'>&nbsp;</p>";;
          }
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
    				ctx.beginPath();
    				ctx.arc(mouse.x, mouse.y, 4, 0, 2 * Math.PI, false);
    				ctx.fillStyle = 'green';
    				ctx.globalAlpha=1;
    				ctx.fill();
    				lastRefresh = currentRefresh
    				document.getElementById("status").innerHTML = trial.start_instructions + "<p class = 'custom-font'>&nbsp;</p><p class = 'custom-44px'>&nbsp;</p>";
    			}
    			} else {
    				//remove score display at the end of the task:
    				//document.getElementById("status").innerHTML = "Finished with score = " + Math.round(score *100) + "%<BR> Click next to continue.";

    				//display "you have finished the task"
            if(final_score_feedback == true) {
      				document.getElementById("status").innerHTML = trial.end_instructions + `<p class = "custom-font">Voici ton score : ` + Math.round(score) + `</p><p class = "continue-instructions">Clique sur la flèche pour continuer</p>`;
            } else {
              document.getElementById("status").innerHTML = trial.end_instructions + `<p class = "custom-font">&nbsp;</p><p class = "continue-instructions">Clique sur la flèche pour continuer</p>`;
            }
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
                if (trial.cursor_display == false) {
                  canvas.style.cursor = 'none';
                }
    						document.getElementById("status").innerHTML = trial.draw_instructions + "<p class = 'custom-font'>&nbsp;</p><p class = 'custom-44px'>&nbsp;</p>";
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


    line_tracing();


    //--------------------- END LINE TRACING TASK -------------------------------------------------------------------------------------------------------


    // store response
    var response = {
      rt: null,
      button: null
    };

    // function to handle responses by the subject
    function after_response(choice) {

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;
      response.button = parseInt(choice);
      response.rt = rt;

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-button-response-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.jspsych-html-button-response-button button');
      for(var i=0; i<btns.length; i++){
        //btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();


      // gather the data to store for the trial
      var trial_data = {
        rt: response.rt,
        stimulus: trial.stimulus,
        response: response.button,
        score: score,
        figure_number: trial.figure_number,
        time_diff: timeDiff,
        crossings: crossings,
        crossings_corrected : (crossings - 1)/2,
        distance_total: distance_total,
        distance_inline: distance_inline,
        distance_offline: distance_offline,
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };


    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-button-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }


  };

  return plugin;
})();
