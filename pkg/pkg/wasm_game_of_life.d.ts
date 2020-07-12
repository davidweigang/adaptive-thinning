/* tslint:disable */
/* eslint-disable */
/**
*/
export class WasmImage {
  free(): void;
/**
* @param {number} n 
* @param {number} width 
* @param {number} height 
* @param {number} psnr_threshhold 
* @param {Uint8ClampedArray} pixels 
* @returns {WasmImage} 
*/
  static new(n: number, width: number, height: number, psnr_threshhold: number, pixels: Uint8ClampedArray): WasmImage;
/**
* @returns {number} 
*/
  width(): number;
/**
* @returns {number} 
*/
  height(): number;
/**
* @returns {number} 
*/
  psnr(): number;
/**
* @returns {number} 
*/
  n_remaining(): number;
/**
* @returns {number} 
*/
  image_pixels(): number;
/**
* @returns {number} 
*/
  encoded_bytes(): number;
/**
* @returns {number} 
*/
  point_image_pixels(): number;
/**
* @returns {number} 
*/
  triangulation_image_pixels(): number;
/**
*/
  thinning(): void;
}
