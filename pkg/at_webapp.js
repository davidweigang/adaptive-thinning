
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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
export class AtDecoder {

    static __wrap(ptr) {
        const obj = Object.create(AtDecoder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_atdecoder_free(ptr);
    }
    /**
    * @param {Uint8ClampedArray} bytes
    * @returns {AtDecoder}
    */
    static decode(bytes) {
        var ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.atdecoder_decode(ptr0, len0);
        return AtDecoder.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        var ret = wasm.atdecoder_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        var ret = wasm.atdecoder_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    dimension() {
        var ret = wasm.atdecoder_dimension(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    image_pixels() {
        var ret = wasm.atdecoder_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    point_image_pixels() {
        var ret = wasm.atdecoder_point_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    triangulation_image_pixels() {
        var ret = wasm.atdecoder_triangulation_image_pixels(this.ptr);
        return ret;
    }
}
/**
*/
export class AtEncoder {

    static __wrap(ptr) {
        const obj = Object.create(AtEncoder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_atencoder_free(ptr);
    }
    /**
    * @param {number} n
    * @param {number} width
    * @param {number} height
    * @param {number} psnr_threshhold
    * @param {Uint8ClampedArray} pixels
    * @returns {AtEncoder}
    */
    static new(n, width, height, psnr_threshhold, pixels) {
        var ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.atencoder_new(n, width, height, psnr_threshhold, ptr0, len0);
        return AtEncoder.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        var ret = wasm.atencoder_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        var ret = wasm.atencoder_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    psnr() {
        var ret = wasm.atencoder_psnr(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    n_remaining() {
        var ret = wasm.atencoder_n_remaining(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    image_pixels() {
        var ret = wasm.atencoder_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    bytes_len() {
        var ret = wasm.atencoder_bytes_len(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    encoded_bytes() {
        var ret = wasm.atencoder_encoded_bytes(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    point_image_pixels() {
        var ret = wasm.atencoder_point_image_pixels(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    triangulation_image_pixels() {
        var ret = wasm.atencoder_triangulation_image_pixels(this.ptr);
        return ret;
    }
    /**
    */
    thinning() {
        wasm.atencoder_thinning(this.ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

