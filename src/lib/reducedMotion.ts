/**
 * Motion preference helper (impeccable / animate.md).
 * Reduced motion means fewer and gentler animations, not no feedback:
 * callers should render the final state instantly instead of animating
 * spatial movement, while opacity/color state changes remain.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
