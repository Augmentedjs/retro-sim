import Ordered from "./ordered.js";
import NoDither from "./noDither.js";

// roughly 60 frames per second at '16'
const DELAY = 10;

const THEMES = {
  "WINTER": "winter",
  "SUMMER": "summer",
  "TWEAKED": "tweaked",
  "MONOCHROME": "monochrome",
  "QUAD": "quad"
};

class Processor {
  constructor(dither = "none") {
    if (dither && dither === "ordered") {
      this._dither = new Ordered();
    } else {
      this._dither = new NoDither();
    }
    // default
    this._theme = THEMES.WINTER;
  };

  static get WINTER() {
    return THEMES.WINTER;
  };

  static get SUMMER() {
    return THEMES.SUMMER;
  };

  static get TWEAKED() {
    return THEMES.TWEAKED;
  };

  static get MONOCHROME() {
    return THEMES.MONOCHROME;
  };

  static get QUAD() {
    return THEMES.QUAD;
  };

  static get NO_DITHER() {
    return "none";
  };

  static get ORDERED() {
    return "ordered";
  };

  set dither(dither) {
    if (dither && dither === "ordered") {
      this._dither = new Ordered();
    } else {
      this._dither = new NoDither();
    }
  };

  set theme(theme) {
    this._theme = theme;
  };

  timerCallback() {
    if (this._video.paused || this._video.ended) {
      return;
    }
    this.computeFrame();
    const self = this;
    setTimeout( () => {
      self.timerCallback();
    }, DELAY);
  };

  doLoad(canvas, video) {
    if (!canvas || !video) {
      throw new Error("No video, canvas!", canvas, video);
    }

    this._video = video;
    this._canvas = canvas;
    this._dither.width = this._video.width;
    this._dither.height = this._video.height;

    this._ctx = this._canvas.getContext("2d");
    const self = this;

    this._video.addEventListener("play", () => {
      self.width = self._video.width;
      self.height = self._video.height;
      self.timerCallback();
    }, false);
  };

  computeFrame() {
    this._ctx.drawImage(this._video, 0, 0, this.width, this.height);
    const frame = this._ctx.getImageData(0, 0, this.width, this.height);
    this._dither.process(frame, this._theme);
    this._ctx.putImageData(frame, 0, 0);
    return;
  };
};

export default Processor;
