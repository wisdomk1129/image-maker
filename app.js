const modeBtn = document.querySelector(".mode-btn");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color-setting__input");
const colorOptions = Array.from(document.getElementsByClassName("color-setting__btn"));
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //자주 사용되므로 변수이름 짧게
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isDrawing = false; //mousedown의 true/false를 알려주는 변수
let isFilling = false; //fillingMode의 true/false를 알려주는 변수

function startDrawing() { //mousedown 감지. isDrawing 변수에 반영
    isDrawing = true;
}

function endDrawing() { //mouseup/leave 감지. isDrawing 변수에 반영
    isDrawing = false;
}

function canvasDraw(event) {
    if (isDrawing) { //isDrawing이 true면 선이 그려짐
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath(); //isDrawing이 false면 새 path 시작
    ctx.moveTo(event.offsetX, event.offsetY); //ctx의 좌표를 유저의 마우스좌표로 계속 이동
}

function setLineWidth(event) {
    ctx.lineWidth = event.target.value;
}

function setColor(event) {
    let style; //stroke/fillStyle에 색상 한 번에 할당하기 위해 style 변수 생성
    const targetValue = event.target.value;
    targetValue === undefined ? style = event.target.dataset.color : style = targetValue;
    color.value = ctx.strokeStyle = ctx.fillStyle = style; //stroke/fillStyle에 색상 한 번에 할당, color input에 지금 선택된 color 나타나게 함
}

function canvasFill() {
    if (isFilling) { //isFilling = true일 때만 캔버스를 가득 채움
        ctx.fillRect(0, 0, 800, 800);
    }
}

function modeChange() {
    if (isFilling) { //fillMode → drawMode
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else { //drawMode → fillMode
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

canvas.addEventListener("mousemove", canvasDraw);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseleave", endDrawing);

lineWidth.addEventListener("change", setLineWidth);

color.addEventListener("change", setColor);
colorOptions.forEach(color => color.addEventListener("click", setColor));

modeBtn.addEventListener("click", modeChange);
canvas.addEventListener("click", canvasFill);