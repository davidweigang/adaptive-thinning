//import { memory } from "../pkg/wasm_game_of_life/wasm_game_of_life_bg";
//import {WasmImage} from "../pkg/wasm_game_of_life";
//WebAssembly.compileStreaming(fetch('../pkg/wasm_game_of_life_bg.wasm'))
//      .then(function(mod) {
//	              var imports = WebAssembly.Module.imports(mod);
//	              console.log(imports[0]);
//	            });
//
import init, { AtDecoder } from '../pkg/wasm_game_of_life.js';


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
		var input = event.target;
		var reader = new FileReader();
    		reader.onload = function(){
    		  var byteArrayBuffer = reader.result;
                  var bytes = new Uint8ClampedArray(byteArrayBuffer, 0, byteArrayBuffer.byteLength);
    		};
    		reader.readAsDataURL(input.files[0]);

		let at_decoder = Decoder.decode(bytes);
	
		var pixelPtr = at_decoder.image_pixels();
	  	var pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
	  	var ima = new ImageData(pixels, c.width, c.height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img1_url = c.toDataURL("image/png");
	  	
	  	pixelPtr = at_decoder.point_image_pixels();
	  	pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
	  	ima = new ImageData(pixels, c.width, c.height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img2_url = c.toDataURL("image/png");
	  	
	  	pixelPtr = at_decoder.triangulation_image_pixels();
	  	pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
	  	ima = new ImageData(pixels, c.width, c.height);
	  	ctx.putImageData(ima, 0, 0);
	  	let img3_url = c.toDataURL("image/png");
	  	document.write('<img src="'+img0_url+'"/><img src="'+img1_url+'"/><img src="'+img2_url+'"/><img src="'+img3_url+'"/>');
	}

	
	document.getElementById("binary").addEventListener("onchange", decode);
	
}

run();	

