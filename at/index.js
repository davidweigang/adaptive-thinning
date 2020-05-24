//import { memory } from "../pkg/wasm_game_of_life/wasm_game_of_life_bg";
//import {WasmImage} from "../pkg/wasm_game_of_life";
//WebAssembly.compileStreaming(fetch('../pkg/wasm_game_of_life_bg.wasm'))
//      .then(function(mod) {
//	              var imports = WebAssembly.Module.imports(mod);
//	              console.log(imports[0]);
//	            });
//
import init, { WasmImage } from '../pkg/wasm_game_of_life.js';


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

function thinning() {
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("photo");
c.width = img.width;
c.height = img.height;
ctx.drawImage(img, 0, 0);
let img0_url = c.toDataURL("image/png");
let imgData = ctx.getImageData(0,0,c.width, c.height);

let at_image = WasmImage.new(0, c.width, c.height, 33, imgData.data);
console.log(at_image.width());
console.log(at_image.height());

  start();
  at_image.thinning();
  end();
	console.log("PSNR: " + at_image.psnr());
	console.log(at_image.n_remaining() + " vertices out of " + c.width*c.height + " remaining.");


  var pixelPtr = at_image.image_pixels();
  var pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
  var ima = new ImageData(pixels, c.width, c.height);
  ctx.putImageData(ima, 0, 0);
  let img1_url = c.toDataURL("image/png");
  
  pixelPtr = at_image.point_image_pixels();
  pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
  ima = new ImageData(pixels, c.width, c.height);
  ctx.putImageData(ima, 0, 0);
  let img2_url = c.toDataURL("image/png");
  
  pixelPtr = at_image.triangulation_image_pixels();
  pixels = new Uint8ClampedArray(memory.buffer, pixelPtr, c.width * c.height * 4);
  ima = new ImageData(pixels, c.width, c.height);
  ctx.putImageData(ima, 0, 0);
  let img3_url = c.toDataURL("image/png");
  document.write('<img src="'+img0_url+'"/><img src="'+img1_url+'"/><img src="'+img2_url+'"/><img src="'+img3_url+'"/>');
}
document.getElementById("btn").addEventListener("click", thinning);
}

run();	

