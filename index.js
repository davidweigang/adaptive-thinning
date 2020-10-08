//import { memory } from "./pkg/at_webapp/at_webapp_bg";
//import {AtEncoder} from "./pkg/at_webapp";
//WebAssembly.compileStreaming(fetch('./pkg/at_webapp_bg.wasm'))
//      .then(function(mod) {
//	              var imports = WebAssembly.Module.imports(mod);
//	              console.log(imports[0]);
//	            });
//
import init, { AtEncoder } from './pkg/at_webapp.js';


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
  return seconds;
}
function button_press() {
  document.getElementById('video').srcObject.getTracks().forEach(function(track) {
      track.stop();
  });
  document.getElementById("content").style.display = "none";
  var loader = document.getElementById("loader");
  loader.style.display = "block";
  loader.offsetHeight;
  setTimeout(thinning, 100);
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

let at_image = AtEncoder.new(0, c.width, c.height, 32, imgData.data);
//let at_image = AtEncoder.new(74000, c.width, c.height, 33, imgData.data);
console.log(at_image.width());
console.log(at_image.height());

  start();
  at_image.thinning();
  let seconds = end();
  	let bytes_len = at_image.bytes_len();
  	let bpp = (bytes_len * 8 / (at_image.width() * at_image.height())).toFixed(4);
	let psnr = at_image.psnr().toFixed(4);
	let n_remaining = at_image.n_remaining();
  	console.log("PSNR: " + psnr);
  	console.log("Encoded file size: " + bytes_len + " bytes -> bpp: " + bpp);
  	console.log(n_remaining + " vertices out of " + c.width*c.height + " remaining.");
	document.getElementById("result-metrics").innerText = "Runtime: "+ seconds +" seconds.\nPSNR: " + psnr + "\nEncoded file size: " + bytes_len + "bytes -> bpp: " + bpp + "\n" + n_remaining + " vertices out of " + c.width*c.height + " remaining.";


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
  let bytePtr = at_image.encoded_bytes();
  let byte_len = at_image.bytes_len();
  var bytes = new Uint8Array(memory.buffer, bytePtr, byte_len); // pass your byte response to this constructor
  var blob=new Blob([bytes], {type: "application/at"});// change resultByte to bytes
  var link= document.getElementById("binary");
  link.classList.add("button");
  var newContent = document.createTextNode("Download at binary");
  link.appendChild(newContent);

  link.href=window.URL.createObjectURL(blob);
  link.download="result.at";
  document.getElementById("original").src = img0_url;
  document.getElementById("reproduktion").src = img1_url;
  document.getElementById("points").src = img2_url;
  document.getElementById("triangulation").src = img3_url;

  document.getElementById("content-inner").style.display = "none";
  document.getElementById("content").style.display = "block";
  document.getElementById("loader").style.display = "none";
  document.getElementById("result").style.display = "flex";

  //link.click();
}
document.getElementById("atbtn").addEventListener("click", button_press);
document.getElementById("redobtn").addEventListener("click", function(ev) {
      document.getElementById("camera").style.display = "inline-block";
      document.getElementById("output").style.display = "none";
      document.getElementById("redobtn").disabled = true;
      document.getElementById("atbtn").disabled = true;
      ev.preventDefault();
}, false);
}

run();	

