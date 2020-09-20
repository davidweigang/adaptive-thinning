//import { memory } from "../pkg/at_webapp/at_webapp_bg";
//import {AtEncoder} from "../pkg/at_webapp";
//WebAssembly.compileStreaming(fetch('../pkg/at_webapp_bg.wasm'))
//      .then(function(mod) {
//	              var imports = WebAssembly.Module.imports(mod);
//	              console.log(imports[0]);
//	            });
//
import init, { AtDecoder } from '../pkg/at_webapp.js';


var memory;
async function run() {
	var bla = await init();
	memory = bla.memory;
	var startTime, endTime;
	
	function start() {
	  startTime = performance.now();
	};
	
	function end() {
	  endTime = performance.now();
	  var timeDiff = endTime - startTime; //in ms 
	  // strip the ms 
	  timeDiff /= 1000; 
	  
	  // get seconds 
	  var seconds = Math.round(timeDiff);
	  console.log(seconds + " seconds");
	}
	
	function decode(event) {
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		var input = event.target;
		var reader = new FileReader();
    		reader.onload = function(){
    		  var byteArrayBuffer = reader.result;
                  var bytes = new Uint8ClampedArray(byteArrayBuffer, 0, byteArrayBuffer.byteLength);
		console.log("DECODE");
		let at_decoder = AtDecoder.decode(bytes);
	
		var pixelPtr = at_decoder.image_pixels();
		var width = at_decoder.width();
		var height = at_decoder.height();
		c.width = width;
		c.height = height;
		var dimension = at_decoder.dimension();
		var count = 0;
		let reducer = (acc, value) => {
			acc.push(value);
			count++;
			if (dimension === 1) {
				acc.push(value);
				count++;
				acc.push(value);
				count++;
			}
			if (count === 3) {
				acc.push(255);
				count = 0;
			}
			return acc;

		}

	  	var pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, width * height * dimension);
		var pixels2 = pixels.reduce(reducer, []);
		var pixels3 = Uint8ClampedArray.from(pixels2);
			console.log(pixels3);
	  	var ima = new ImageData(pixels3, width, height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img1_url = c.toDataURL("image/png");
	  	
	  	pixelPtr = at_decoder.point_image_pixels();
	  	pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, width * height * dimension);
		var pixels2 = pixels.reduce(reducer, []);
		var pixels3 = Uint8ClampedArray.from(pixels2);
	  	var ima = new ImageData(pixels3, width, height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img2_url = c.toDataURL("image/png");
	  	
	  	pixelPtr = at_decoder.triangulation_image_pixels();
	  	pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, width * height * dimension);
		var pixels2 = pixels.reduce(reducer, []);
		var pixels3 = Uint8ClampedArray.from(pixels2);
	  	var ima = new ImageData(pixels3, width, height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img3_url = c.toDataURL("image/png");
	  	document.write('<img src="'+img1_url+'"/><img src="'+img2_url+'"/><img src="'+img3_url+'"/>');
    		};
    		reader.readAsArrayBuffer(input.files[0]);
	}

	
	document.getElementById("binary").addEventListener("change", decode);
	
}

run();	

