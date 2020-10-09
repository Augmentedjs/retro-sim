const BAYER_MATRIX_2X2 = [1, 4,
                          3, 2];

const BAYER_MATRIX_4X4 = [ 1,  9,  3, 11,
                          13,  5, 15,  7,
                           4, 12,  2, 10,
                          16,  8, 14,  6];

const BAYER_MATRIX_8X8 = [ 1, 49, 13, 61,  4, 52, 16, 64,
                          33, 17, 45, 29, 36, 20, 48, 32,
                           9, 57,  5, 53, 12, 60,  8, 56,
                          41, 25, 37, 21, 44, 28, 40, 24,
                           3, 51, 15, 63,  2, 50, 14, 62,
                          35, 19, 47, 31, 34, 18, 46, 30,
                          11, 59,  7, 55, 10, 58,  6, 54,
                          43, 27, 39, 23, 42, 26, 38, 22];

class Ordered {
  constructor(palette = "winter") {
    this.matrix = 2;
    this._divider = 128;
    this._palette = palette;
  };

  async process(frame, theme) {
    if (!frame) {
      throw new Error("frame is required!");
    }
    this._originalFrame = frame;
    this._palette = theme;
    const l = this._originalFrame.data.length / 4;
    let thresholdId, dither;
    let i, x = 0, y = 0;
    for (i = 0; i < l; i++) {
      x = (i) - frame.width;
      y = Math.floor(i / frame.width);

      if (this.matrix === 8) {
        thresholdId = ((y & 7) << 3) + (x & 7)  // 8x8 version
        dither = BAYER_MATRIX_8X8[thresholdId];
        this._divider = dither * 4;
      } else if (this.matrix === 4) {
        thresholdId = ((y & 3) << 2) + (x % 4); // 4x4 version
        dither = BAYER_MATRIX_4X4[thresholdId];
        this._divider = dither * 16;
      } else {
        thresholdId = ((y & 1) << 1) + (x % 2); // 2x2 version
        dither = BAYER_MATRIX_2X2[thresholdId];
        this._divider = dither * 48;
      }
      this._processPixel(frame, i);
    }
  };

  _processPixel(frame, i) {
    const index = i * 4;
    const r = (this._originalFrame.data[index + 0] >= this._divider) ? 255 : 0;
    const g = (this._originalFrame.data[index + 1] >= this._divider) ? 255 : 0;
    const b = (this._originalFrame.data[index + 2] >= this._divider) ? 255 : 0;

    // CGA winter
    if (this._palette === "winter") {
      if (r === 255 && g === 0 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 255 && b === 0) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 0 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 255 && g === 255 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 255 && g === 0 && b === 255) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 255 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else {
        frame.data[index + 0] = r;
        frame.data[index + 1] = g;
        frame.data[index + 2] = b;
      }
    } else if (this._palette === "summer") {
      if (r === 0 && g === 0 && b === 255) {
        frame.data[index + 0] = 0;
        frame.data[index + 1] = 0;
        frame.data[index + 2] = 0;
      } else if (r === 0 && g === 255 && b === 0) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 85;
      } else if (r === 255 && g === 0 && b === 255) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 58;
      } else if (r === 0 && g === 255 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 85;
      } else if (r === 255 && g === 255 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 85;
      } else if (r === 255 && g === 255 && b === 255) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 85;
      } else {
        frame.data[index + 0] = r;
        frame.data[index + 1] = g;
        frame.data[index + 2] = b;
      }
    } else if (this._palette === "tweaked") {
      if (r === 255 && g === 0 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 0 && b === 0) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 255 && b === 0) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 255 && g === 0 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 85;
      } else if (r === 0 && g === 0 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 85;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 255 && b === 255) {
        frame.data[index + 0] = 85;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 255 && g === 255 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else {
        frame.data[index + 0] = r;
        frame.data[index + 1] = g;
        frame.data[index + 2] = b;
      }
    } else if (this._palette === "monochrome") {
      if (r === 255 && g === 0 && b === 0) {
        frame.data[index + 0] = 0;
        frame.data[index + 1] = 0;
        frame.data[index + 2] = 0;
      } else if (r === 0 && g === 255 && b === 0) {
        frame.data[index + 0] = 0;
        frame.data[index + 1] = 0;
        frame.data[index + 2] = 0;
      } else if (r === 0 && g === 0 && b === 255) {
        frame.data[index + 0] = 0;
        frame.data[index + 1] = 0;
        frame.data[index + 2] = 0;
      } else if (r === 255 && g === 0 && b === 255) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 255 && g === 255 && b === 0) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else if (r === 0 && g === 255 && b === 255) {
        frame.data[index + 0] = 255;
        frame.data[index + 1] = 255;
        frame.data[index + 2] = 255;
      } else {
        frame.data[index + 0] = r;
        frame.data[index + 1] = g;
        frame.data[index + 2] = b;
      }
    } else if (this._palette === "quad") {
      const y = Math.floor(index / this.height);
      if (index % 4 === 0) {
        const x = (index + ((this.width / 2) * 4)) / 2;
        frame.data[x + 0] = r;
        frame.data[x + 1] = g;
        frame.data[x + 2] = b;
      /*} else if (i % 4 === 1) {
        const x = Math.floor(this.width / 2) * 4 * y;
        frame.data[x + 0] = r;
        frame.data[x + 1] = g;
        frame.data[x + 2] = b;
      } else if (i % 4 === 2) {
        const x = Math.floor(i / 2) * 4 * (y + this.height / 2);
        frame.data[x + 0] = r;
        frame.data[x + 1] = g;
        frame.data[x + 2] = b;
      } else if (i % 4 === 3) {
        const x = Math.floor(this.width / 2) * 4 * (y + this.height / 2);
        frame.data[x + 0] = r;
        frame.data[x + 1] = g;
        frame.data[x + 2] = b;*/
      } else {
        frame.data[i + 0] = 0;
        frame.data[i + 1] = 0;
        frame.data[i + 2] = 0;
      }
      //const idx = (x + y * this.width) * 4;
    } else {
      frame.data[index + 0] = r;
      frame.data[index + 1] = g;
      frame.data[index + 2] = b;
    }
  };
};

export default Ordered;
