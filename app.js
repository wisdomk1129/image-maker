const saveBtn = document.querySelector(".save-btn");
const textInput = document.querySelector(".text");
const fileInput = document.querySelector(".file");
const modeBtn = document.querySelector(".mode-btn");
const resetBtn = document.querySelector(".reset-btn");
const eraseBtn = document.querySelector(".erase-btn");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color-setting__input");
const colorOptions = Array.from(document.getElementsByClassName("color-setting__btn"));
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //자주 사용되므로 변수이름 짧게

const COLOR_NAME = "white";
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
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
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function paintingModeChange() {
    if (isFilling) { //fillMode → drawMode
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else { //drawMode → fillMode
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function canvasReset() {
    ctx.fillStyle = COLOR_NAME;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function canvasErase() {
    isFilling = false; //지우개 선 그리기 위해 fillMode off
    modeBtn.innerText = "Fill";
    ctx.strokeStyle = COLOR_NAME;
}

function onFileChange(event) {
    const uploadedFile = event.target.files["0"]; //유저가 업로드한 file 정보 가져오기
    const image = new Image(); //image 만들기
    image.src = URL.createObjectURL(uploadedFile); //image url 설정
    image.onload = function () { //image가 로딩되면 canvas에 image 삽입
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null; //imgae 삽입 후 fileInput 초기화 → 새로운 image 받을 수 있게 함
    }
}

function insertText(event) {
    const typedText = textInput.value;
    if (typedText !== "") {
        ctx.save(); //ctx 설정 저장
        ctx.font = "30px serif";
        ctx.fillText(typedText, event.offsetX, event.offsetY);
        ctx.restore(); //저장한 ctx 설정 다시 불러오기
    }
}

function saveImage() {
    const savedImageUrl = canvas.toDataURL(); //canvas의 이미지 저장. url 형태
    const downloadLink = document.createElement("a"); //anchor 생성
    downloadLink.href = savedImageUrl; //anchor에 저장된 canvas 이미지 url 집어넣기
    downloadLink.download = "myDrawing"; //download 기능 활성, 기본 이미지 이름 설정
    downloadLink.click(); //자동으로 click
}

canvas.addEventListener("mousemove", canvasDraw);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseleave", endDrawing);

lineWidth.addEventListener("change", setLineWidth);

color.addEventListener("change", setColor);
colorOptions.forEach(color => color.addEventListener("click", setColor));

modeBtn.addEventListener("click", paintingModeChange);
canvas.addEventListener("click", canvasFill);

resetBtn.addEventListener("click", canvasReset);
eraseBtn.addEventListener("click", canvasErase);
fileInput.addEventListener("change", onFileChange);

canvas.addEventListener("dblclick", insertText);

saveBtn.addEventListener("click", saveImage);