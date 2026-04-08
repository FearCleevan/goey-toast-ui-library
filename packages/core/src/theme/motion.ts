import type { WithSpringConfig } from "react-native-reanimated";

export interface ISpringPreset {
  damping: number;
  stiffness: number;
  mass: number;
}

export interface IMotionSprings {
  /** Initial entry animation */
  mount: ISpringPreset;
  /** Stack position / scale transitions */
  stack: ISpringPreset;
  /** Pill → card morph */
  morph: ISpringPreset;
  /** Pill width resize */
  pillResize: ISpringPreset;
  /** Squish on enter / exit */
  squish: ISpringPreset;
  /** Body content reveal */
  bodyReveal: ISpringPreset;
}

export interface IMotionDurations {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
  deliberate: number;
}

export interface IMotion {
  springs: IMotionSprings;
  durations: IMotionDurations;
}

const springs: IMotionSprings = {
  mount: { damping: 16, stiffness: 200, mass: 0.7 },
  stack: { damping: 20, stiffness: 220, mass: 0.7 },
  morph: { damping: 14, stiffness: 170, mass: 0.9 },
  pillResize: { damping: 18, stiffness: 235, mass: 0.78 },
  squish: { damping: 16, stiffness: 375, mass: 0.7 },
  bodyReveal: { damping: 14, stiffness: 200, mass: 0.7 },
};

const durations: IMotionDurations = {
  instant: 0,
  fast: 120,
  normal: 220,
  slow: 360,
  deliberate: 500,
};

const motion: IMotion = { springs, durations };

// Re-export spring configs as WithSpringConfig for Reanimated consumers
const mountSpring: WithSpringConfig = springs.mount;
const stackSpring: WithSpringConfig = springs.stack;
const morphSpring: WithSpringConfig = springs.morph;
const pillResizeSpring: WithSpringConfig = springs.pillResize;
const squishSpring: WithSpringConfig = springs.squish;
const bodyRevealSpring: WithSpringConfig = springs.bodyReveal;

export {
  bodyRevealSpring,
  morphSpring,
  motion,
  mountSpring,
  pillResizeSpring,
  squishSpring,
  stackSpring,
};
