"use strict";

document.addEventListener("DOMContentLoaded", init);
let img;
const ctx = document.querySelector(`#imageCanvas`).getContext(`2d`);
let colorInfo;
let myImageData;
let width = 500;
let height = 600;

function init() {
  // load img
  img = new Image();
  img.addEventListener("load", imgLoaded);
  img.src = "cat.jpg";
}

function imgLoaded() {
  ctx.drawImage(img, 0, 0);

  myImageData = getImageData();
  registerMouseMove();
}

function registerMouseMove() {
  colorInfo = document.querySelector("#imageCanvas");
  colorInfo.addEventListener("mousemove", mouseMoved);
}
function mouseMoved(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  console.log(e);
  console.log(x, y);
  const rgb = getColorAtPixel(x, y);
  showColorInfo(rgb);

  ctx.putImageData(myImageData, 0, 0);
  drawRectangle(x, y);
}

function getColorAtPixel(x, y) {
  const pixelIndex = 4 * (x + y * width);
  const r = myImageData.data[pixelIndex];
  const g = myImageData.data[pixelIndex + 1];
  const b = myImageData.data[pixelIndex + 2];

  return { r, g, b };
}

function drawRectangle(x, y) {
  ctx.strokeStyle = "green";
  ctx.strokeRect(x - 5, y - 5, 10, 10);
  // ctx.moveTo(x, y);
}

function getImageData() {
  return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}

// pixelIndex = 4 *(x+y*width);
// r = data [pixelIndex]
// g = data [pixelIndex + 1]
// b = data [pixelIndex + 2]
