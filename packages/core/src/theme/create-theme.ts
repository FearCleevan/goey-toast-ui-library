import { lightTheme } from "./default-theme";
import type { DeepPartial, ITheme } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(base: any, override: any): any {
  const result = { ...base };
  for (const key in override) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null
    ) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result;
}

/**
 * Create a custom theme by merging overrides into the light theme.
 *
 * @example
 * const myTheme = createTheme({
 *   colors: { background: '#fafafa' },
 * })
 */
function createTheme(overrides: DeepPartial<ITheme>): ITheme {
  return deepMerge(lightTheme, overrides) as ITheme;
}

export { createTheme, deepMerge };
