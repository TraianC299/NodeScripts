export function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandFloat(min, max) {
  return Math.random() * (max - min) + min;
}