/**
 * Flowing "line-wave" WebGL field — terax-inspired, adapted for a LIGHT theme:
 * the shader outputs graphite ink at low alpha over the paper background
 * (instead of additive white on black). Framework-free imperative factory;
 * the React island (BackgroundWaves) decides whether to start it at all.
 *
 * Loaded via dynamic import so OGL stays out of the SSR + initial bundle.
 */
import { Mesh, Program, Renderer, Triangle } from "ogl";

export type LineWavesOptions = {
  color?: [number, number, number];
  speed?: number;
  strength?: number;
  rotationDeg?: number;
  lines?: number;
  warp?: number;
  enableMouse?: boolean;
  mouseInfluence?: number;
  /** Mouse-follow easing per frame (lower = slower, smoother). */
  smoothing?: number;
};

export type LineWavesHandle = { destroy: () => void };

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragment = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uLines;
uniform float uWarp;
uniform float uRotation;
uniform vec3 uColor;
uniform float uStrength;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) { return fract(sin(n * 127.1) * 43758.5453123); }
float smoothNoise(float x) {
  float i = floor(x); float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}
float dispA(float c, float t) {
  float r = sin(c * 2.123) * 0.2;
  r += sin(c * 3.234 + t * 4.345) * 0.1;
  r += sin(c * 0.589 + t * 0.934) * 0.5;
  return r;
}
float dispB(float c, float t) {
  float r = sin(c * 1.345) * 0.3;
  r += sin(c * 2.734 + t * 3.345) * 0.2;
  r += sin(c * 0.189 + t * 0.934) * 0.3;
  return r;
}
vec2 rot(vec2 p, float a) {
  float c = cos(a); float s = sin(a);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords.x *= uResolution.z;
  coords = rot(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 m = rot(uMouse * 2.0 - 1.0, uRotation);
    float d = length(coords - m);
    mouseWarp = uMouseInfluence * exp(-d * d * 4.0);
  }

  float ax = coords.x + dispA(coords.y, halfT) * uWarp + mouseWarp;
  float ay = coords.y - dispA(coords.x * cos(fullT) * 1.235, halfT) * uWarp;
  float bx = coords.x + dispB(coords.y, halfT) * uWarp + mouseWarp;
  float by = coords.y - dispB(coords.x * sin(fullT) * 1.235, halfT) * uWarp;

  vec2 fa = vec2(ax, ay);
  vec2 fb = vec2(bx, by);
  vec2 blended = mix(fa, fb, mix(fa, fb, 0.5));

  float scaledY = blended.y * uLines;
  float nY = smoothNoise(abs(scaledY));
  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float lum = (lines + lines * ridge) * (cos(blended.y + fullT * 0.5) * 0.5 + 1.0);
  float alpha = clamp(lum * uStrength, 0.0, 0.9);
  gl_FragColor = vec4(uColor, alpha);
}
`;

export function startLineWaves(
  container: HTMLElement,
  opts: LineWavesOptions = {},
): LineWavesHandle {
  const {
    color = [0.05, 0.06, 0.07],
    speed = 0.12,
    strength = 0.14,
    rotationDeg = -30,
    lines = 24,
    warp = 0.85,
    enableMouse = true,
    mouseInfluence = 1.8,
    smoothing = 0.025,
  } = opts;

  const renderer = new Renderer({
    alpha: true,
    premultipliedAlpha: false,
    dpr: Math.min(window.devicePixelRatio || 1, 1.25),
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const currentMouse: [number, number] = [0.5, 0.5];
  let targetMouse: [number, number] = [0.5, 0.5];

  const handleMouseMove = (e: MouseEvent) => {
    const rect = gl.canvas.getBoundingClientRect();
    targetMouse = [
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height,
    ];
  };

  const geometry = new Triangle(gl);
  const rotationRad = (rotationDeg * Math.PI) / 180;

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uResolution: {
        value: [
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        ],
      },
      uSpeed: { value: speed },
      uLines: { value: lines },
      uWarp: { value: warp },
      uRotation: { value: rotationRad },
      uColor: { value: color },
      uStrength: { value: strength },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseInfluence: { value: mouseInfluence },
      uEnableMouse: { value: enableMouse },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });

  const resize = () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    program.uniforms.uResolution.value = [
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height,
    ];
  };
  window.addEventListener("resize", resize);
  resize();

  container.appendChild(gl.canvas);
  gl.canvas.style.width = "100%";
  gl.canvas.style.height = "100%";
  gl.canvas.style.display = "block";

  if (enableMouse) window.addEventListener("mousemove", handleMouseMove);

  let raf: number | null = null;
  let visible = true;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        visible = e.isIntersecting;
        if (visible && raf === null) raf = requestAnimationFrame(update);
      }
    },
    { threshold: 0 },
  );
  io.observe(container);

  function update(time: number) {
    if (!visible) {
      raf = null;
      return;
    }
    raf = requestAnimationFrame(update);
    program.uniforms.uTime.value = time * 0.001;
    if (enableMouse) {
      currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
      const m = program.uniforms.uMouse.value as Float32Array;
      m[0] = currentMouse[0];
      m[1] = currentMouse[1];
    }
    renderer.render({ scene: mesh });
  }
  raf = requestAnimationFrame(update);

  return {
    destroy() {
      if (raf !== null) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      if (enableMouse) window.removeEventListener("mousemove", handleMouseMove);
      const canvas = gl.canvas;
      canvas.parentNode?.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
