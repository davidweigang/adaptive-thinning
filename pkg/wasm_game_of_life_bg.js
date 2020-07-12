import * as wasm from './wasm_game_of_life_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
export class WasmImage {

    static __wrap(ptr) {
        const obj = Object.create(WasmImage.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_wasmimage_free(ptr);
    }
    /**
    * @param {number} n
    * @param {number} width
    * @param {number} height
    * @param {number} psnr_threshhold
    * @param {Uint8ClampedArray} pixels
    * @returns {WasmImage}
    */
    static new(n, width, height, psnr_threshhold, pixels) {
        var ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.wasmimage_new(n, width, height, psnr_threshhold, ptr0, len0);
        return WasmImage.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        var ret = wasm.wasmimage_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        var ret = wasm.wasmimage_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    psnr() {
        var ret = wasm.wasmimage_psnr(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    n_remaining() {
        var ret = wasm.wasmimage_n_remaining(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    image_pixels() {
        var ret = wasm.wasmimage_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    encoded_bytes() {
        var ret = wasm.wasmimage_encoded_bytes(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    point_image_pixels() {
        var ret = wasm.wasmimage_point_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    triangulation_image_pixels() {
        var ret = wasm.wasmimage_triangulation_image_pixels(this.ptr);
        return ret;
    }
    /**
    */
    thinning() {
        wasm.wasmimage_thinning(this.ptr);
    }
}

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

