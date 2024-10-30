/**
 * a function to generate a random RBG color
 * @returns a random RGB color as a string
 */
function generateRandomRGB(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * calculate the color of the progress bar based on the percentage from red to green
 * @param percentage the percentage of the progress bar
 * @param alpha the alpha value of the color
 * @returns strings of rgba(red, green, blue, alpha) and hex
 */
function calculateColor(percentage: number, alpha: number) {
  // Ensure the alpha is between 0 and 1
  alpha = Math.max(0, Math.min(alpha, 1));

  // Ensure the percentage is between 0 and 100
  percentage = Math.max(0, Math.min(percentage, 100));

  // Initialize the RGB values
  let red,
    green,
    blue = 27;

  // Calculate the red and green values based on the percentage
  if (percentage <= 50) {
    // From red to yellow (197, 27, 27) to (197, 197, 27)
    red = 197;
    green = Math.round(27 + (percentage / 50) * (197 - 27));
  } else {
    // From yellow to green (197, 197, 27) to (27, 197, 27)
    red = Math.round(197 - ((percentage - 50) / 50) * (197 - 27));
    green = 197;
  }

  // rgba color in the required format
  const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  // Convert each component to hexadecimal
  const hexR = red.toString(16).padStart(2, "0");
  const hexG = green.toString(16).padStart(2, "0");
  const hexB = blue.toString(16).padStart(2, "0");
  const hexA = (alpha * 255).toString(16).padStart(2, "0");

  // hex color in the required format
  const hex = `#${hexR}${hexG}${hexB}${hexA}`;

  return { rgba, hex };
}

export { generateRandomRGB, calculateColor };
