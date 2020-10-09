class NoDither {
  constructor(palette = "winter") {
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
    let i;
    for (i = 0; i < l; i++) {
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

export default NoDither;
