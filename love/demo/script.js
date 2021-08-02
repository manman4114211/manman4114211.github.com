function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function rect(el) {
  return el.getBoundingClientRect();
}

const qs = (s, o = document) => o.querySelector(s);
const qsa = (s, o = document) => o.querySelectorAll(s);

const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let bounds = {
  ww: window.innerWidth,
  wh: window.innerHeight };


class Draggable {

  constructor(el) {_defineProperty(this, "down",










































































    e => {
      const { x, y, target } = this.getPos(e);

      if (!target.closest('.js-slider')) return;

      const state = this.state;

      state.dragging = true;

      state.cancel.x = x;
      state.cancel.y = y;

      state.on = state.target + x * this.opts.speed;
    });_defineProperty(this, "move",

    e => {
      const state = this.state;

      if (!state.dragging) return;

      const { cancel } = state;
      const { x, y, target } = this.getPos(e);

      if (Math.abs(x - cancel.x) > Math.abs(y - cancel.y) && e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }

      state.target = state.on - x * this.opts.speed;
      this.clamp();
    });_defineProperty(this, "up",

    () => {
      if (!this.state.dragging) return;
      this.state.dragging = false;
    });_defineProperty(this, "run",


















    () => {
      const state = this.state;

      state.current += (state.target - state.current) * this.opts.ease;
      state.pos = Math.round(state.current * 100) / 100;
      state.diff = (state.target - state.current) * 0.0075;
      state.diff = Math.round(state.diff * 100) / 100;

      !state.resizing && this.transformSections();
    });_defineProperty(this, "resize",



























    () => {
      this.state.resizing = true;

      bounds.ww = window.innerWidth;
      bounds.wh = window.innerHeight;

      this.getCache();
      this.transformSections();

      this.state.resizing = false;
    });this.el = el;this.container = qs('.js-slides', this.el);this.slides = [...qsa('.js-slide', this.el)];this.state = { target: 0, current: 0, pos: 0, diff: 0, on: 0, cancel: { x: 0, y: 0 }, max: 0, dragging: false, resizing: false };this.opts = { speed: 1.75, ease: 0.075 };this.total = this.slides.length - 1;this.events = { move: isDevice ? 'touchmove' : 'mousemove', down: isDevice ? 'touchstart' : 'mousedown', up: isDevice ? 'touchend' : 'mouseup' };this.getCache();this.addEvents();}addEvents() {const { move, down, up } = this.events;window.addEventListener(up, this.up);window.addEventListener(down, this.down);window.addEventListener(move, this.move);window.addEventListener('resize', _.debounce(this.resize, 300));gsap.ticker.add(this.run);}getCache() {const { ww } = bounds;this.cache = this.slides.map((el, i) => {el.style.transform = 'translate3d(0, 0, 0)';const { left, right, width } = rect(el);const inner = qs('.js-slide-img', el);i === this.total && (this.state.max = right - ww + rect(this.container).left);return { el, inner, left, width, start: left - ww - 100, end: right + 100, out: true };});}getPos(e) {const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;const target = e.target;return { x, y, target };}clamp() {const state = this.state;state.target = gsap.utils.clamp(0, state.max, state.target);}visible({ start, end, width, left }, current) {const visible = current > start && current < end;let progress = 0;visible && (progress = gsap.utils.clamp(0, 1, 1 + (current - left - width) / (bounds.ww + width)));return { visible, progress };}transformSections() {const state = this.state;const current = state.pos;this.cache.length && this.cache.forEach(c => {const { visible, progress } = this.visible(c, current);if (visible || state.resizing) {c.out && (c.out = false);this.transform(c.el, c.inner, progress, current);} else if (!c.out) {c.out = true;this.transform(c.el, c.inner, progress, current);}});}transform(el, inner, progress, current, diff = this.state.diff) {const spread = gsap.utils.clamp(-100, 100, (-25 * progress + 25) * diff);const translate = -(current + spread);el.style.transform = `translate3d(${translate}px, 0, 0)`; //inner.style.transform = `translate3d(${-(spread * .5)}px, 0, 0)`
  }}

new Draggable(qs('.js-slider'));