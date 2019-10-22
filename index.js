var Draw = function (x,y,lineWidth,status,color) {
    let ctx = null;
    let canvas = null;
    this.x = x;
    this.y = y;
    this.lineWidth= lineWidth;
    this.drawing = status;
    this.color = color;
    this.getDrawing = function () {
        return this.drawing;
    }
    this.setDrawing = function (status1) {
        this.drawing = status1;
    }
    this.setColor = function (changeColor) {
        this.color = changeColor
    }
    this.setLineWidth = function (size) {
        this.lineWidth = size;
    }
    var self = this;

    this.init = function () {
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        this.listenEvent()
    }

    this.drawLine = function (startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    this.getMousePosition = function (event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

        this.listenEvent = function () {
            canvas.addEventListener('mousedown', function () {
                self.mouseDown(event);
            });
            canvas.addEventListener('mouseup', function () {
                self.mouseUp(event);
            });
            canvas.addEventListener('mousemove', function () {
                self.mouseMove(event);
            });
        }
        this.mouseDown = function (event) {
            var position = this.getMousePosition(event);
            this.x = position.x;
            this.y = position.y;
            this.setDrawing(true);

        }
        this.mouseUp = function (event) {
            this.setDrawing(false);
        }
        this.mouseMove = function (event) {
            if (this.getDrawing() == false) {
                return;
            }
            var newMousePosition = this.getMousePosition(event);
            if (this.drawing) {
                var newPos = this.getMousePosition(event);
                this.drawLine(this.x, this.y, newPos.x, newPos.y);
                this.x = newPos.x;
                this.y = newPos.y;
            }
        }
    }
    var paint = new Draw(0,0,2,false,'#000000');
    paint.init();

function setColor(color) {
    var colorType;
    switch (color) {
        case 'red': colorType = '#ff0000'; break;
        case 'black': colorType = '#000000';break;
        case 'green': colorType = '#00ff00';break;
        case 'yellow': colorType = '#FFFF00'; break;
        case 'white': colorType = '#FFFFFF';break;
    } paint.setColor(colorType);
}
function setLineWidth(changeSize) {
    paint.setLineWidth (changeSize);
}