export const palette = {
  primaryBlue: "#2596be",
  lightOrange: "#ee7029",
  lighterOrange: "#fed077",
  brown: "#c17024",
  brownDark: "#ae5901",
  brownDarker: "#8b3305",
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const hexWithoutHash = hex.replace("#", "");
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
