export const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
  smallTablet: 576,
  desktop: 991
};

export const DEVICE = {
  mobile: `(min-width: ${BREAKPOINTS.mobile}px)`,
  
  smallTablet: `(min-width: ${BREAKPOINTS.smallTablet}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`
};