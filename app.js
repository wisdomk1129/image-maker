const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //자주 사용되므로 변수이름 짧게

canvas.width = 800;
canvas.height = 800;
const color = "#FDD35C";
const color2 = "#47266E";

ctx.fillStyle = color2;
ctx.fillRect(200, 170, 30, 150); //왼팔
ctx.fillRect(360, 170, 30, 150); //오른팔
ctx.fillRect(230, 170, 130, 200); //몸통
ctx.arc(295, 120, 50, 2 * Math.PI, 0); //머리
ctx.fill();

ctx.beginPath();
ctx.fillStyle = color;
ctx.arc(270, 120, 8, 1 * Math.PI, 0); //왼쪽 눈
ctx.arc(320, 120, 8, 1 * Math.PI, 0); //오른쪽 눈
ctx.fill();

ctx.beginPath();
ctx.fillStyle = color;
ctx.arc(295, 150, 8, 0, 1 * Math.PI); //입
ctx.fill();