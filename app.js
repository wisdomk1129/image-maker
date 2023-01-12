const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //자주 사용되므로 변수이름 짧게

canvas.width = 800;
canvas.height = 800;
const color = "#FDD35C";

ctx.fillStyle = color;
ctx.strokeStyle = color;
ctx.lineWidth = 10;
ctx.fillRect(180, 350, 50, 320); //기둥1
ctx.fillRect(600, 350, 50, 320); //기둥2
ctx.fillRect(350, 480, 120, 180); //문
ctx.fillRect(180, 350, 470, 20); //천장
ctx.moveTo(180, 350);
ctx.lineTo(415, 200); //지붕1
ctx.lineTo(650, 350); //지붕2
ctx.fill();