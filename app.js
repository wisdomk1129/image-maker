const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //자주 사용되므로 변수이름 짧게

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;

const colors = ["#ffeaa7", "#fdcb6e", "#fab1a0", "#e17055", "#81ecec", "#00cec9", "#a29bfe"];

function makeLine(event) {
    ctx.lineTo(event.offsetX, event.offsetY); //마우스 움직이면 선 만들기
    ctx.stroke(); //선 채우기
}

function onCanvasClick(event) {
    ctx.beginPath(); //새 path 시작
    moveTo(event.offsetX, event.offsetY); //클릭시 좌표 이동
    ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]; //선 색상 랜덤으로 선택
    canvas.addEventListener("mousemove", makeLine);
}

canvas.addEventListener("click", onCanvasClick);