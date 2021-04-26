//returns an array with the r, g, b values
function getColorValues(string) {
  //string = rgb(xxx, xxx, xxx)
  let colorValuesString = string.slice(
    string.indexOf("(") + 1,
    string.length - 1
  );
  return colorValuesString.split(", ");
}

//accept an rgb array (both string or number) and returns a number array with [hue, saturation%, lightness%]
function RGBtoHSL(rgbArray) {
  //string = rgb(xxx, xxx, xxx);
  let red = rgbArray[0] / 255;
  let green = rgbArray[1] / 255;
  let blue = rgbArray[2] / 255;
  let maxColor = Math.max(red, green, blue);
  let minColor = Math.min(red, green, blue);
  let delta = maxColor - minColor;

  let hue;
  let saturation;
  let lightness = (maxColor + minColor) / 2;

  //calculate hue
  if (delta === 0) {
    hue = 0;
  } else if (maxColor === red) {
    hue = ((green - blue) / delta) % 6;
  } else if (maxColor === green) {
    hue = (blue - red) / delta + 2;
  } else if (maxColor === blue) {
    hue = (red - green) / delta + 4;
  }
  hue = Math.round(hue * 60);

  //calculate saturation
  if (delta === 0) {
    saturation = 0;
  } else {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }

  return [hue, saturation * 100, lightness * 100];
}

//takes a string input of "rgb(xxx, xxx, xxx) and returns a hsl string with 10% more brightness"
function increaseLightness(colorString) {
  const RGBArray = getColorValues(colorString);
  let HSLArray = RGBtoHSL(RGBArray);
  if (HSLArray[2] === 100) {
    return;
  } else {
    return `hsl(${HSLArray[0]}, ${HSLArray[1]}%, ${HSLArray[2] + 10}%)`;
  }
}

//takes a string input of "rgb(xxx, xxx, xxx) and returns a hsl string with 10% less brightness"
function decreaseLightness(colorString) {
  const RGBArray = getColorValues(colorString);
  let HSLArray = RGBtoHSL(RGBArray);

  if (HSLArray[2] === 0) {
    return;
  } else {
    return `hsl(${HSLArray[0]}, ${HSLArray[1]}%, ${HSLArray[2] - 10}%)`;
  }
}
