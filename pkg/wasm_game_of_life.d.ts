/* tslint:disable */
/* eslint-disable */
/**
*/
export class AtDecoder {
  free(): void;
/**
* @param {Uint8ClampedArray} bytes 
* @returns {AtDecoder} 
*/
  static decode(bytes: Uint8ClampedArray): AtDecoder;
/**
* @returns {number} 
*/
  image_pixels(): number;
/**
* @returns {number} 
*/
  point_image_pixels(): number;
/**
* @returns {number} 
*/
  triangulation_image_pixels(): number;
}
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
  bytes_len(): number;
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_atdecoder_free: (a: number) => void;
  readonly atdecoder_decode: (a: number, b: number) => number;
  readonly atdecoder_image_pixels: (a: number) => number;
  readonly atdecoder_point_image_pixels: (a: number) => number;
  readonly atdecoder_triangulation_image_pixels: (a: number) => number;
  readonly __wbg_wasmimage_free: (a: number) => void;
  readonly wasmimage_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly wasmimage_width: (a: number) => number;
  readonly wasmimage_height: (a: number) => number;
  readonly wasmimage_psnr: (a: number) => number;
  readonly wasmimage_n_remaining: (a: number) => number;
  readonly wasmimage_image_pixels: (a: number) => number;
  readonly wasmimage_bytes_len: (a: number) => number;
  readonly wasmimage_encoded_bytes: (a: number) => number;
  readonly wasmimage_point_image_pixels: (a: number) => number;
  readonly wasmimage_triangulation_image_pixels: (a: number) => number;
  readonly wasmimage_thinning: (a: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
        