// Zackary Bowling

// The goal of this project is to draw a Koch snowflake using a HTML and Javascript file

// 3 points of the triangle are defined and iterations are a global variable

// defining the points of the triangle
const pointA = { x: 300, y: 28 };
const pointB = { x: 50, y: 450 };
const pointC = { x: 550, y: 450 };

// defining the number of iterations
const iterations = 4;

function drawLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}
// function to draw the koch snowflake using the algorithm's and examples found in the text book
function drawKochCurve(ctx, p1, p2, depth) {
    if (depth === 0) {
        drawLine(ctx, p1, p2);
        return;
    }

    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;

    const point1 = { x: p1.x + deltaX / 3, y: p1.y + deltaY / 3 };
    const point2 = { x: p2.x - deltaX / 3, y: p2.y - deltaY / 3 };

    const midPoint = {
        x: (p1.x + p2.x) / 2 + (Math.sqrt(3) / 6) * (p1.y - p2.y),
        y: (p1.y + p2.y) / 2 + (Math.sqrt(3) / 6) * (p2.x - p1.x)
    };

    drawKochCurve(ctx, p1, point1, depth - 1);
    drawKochCurve(ctx, point1, midPoint, depth - 1);
    drawKochCurve(ctx, midPoint, point2, depth - 1);
    drawKochCurve(ctx, point2, p2, depth - 1);
}
// function to draw the snowflake within the canvas defined on HTML file
function drawSnowflake() {
    const canvas = document.getElementById('snowflakeCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawKochCurve(ctx, pointA, pointB, iterations);
    drawKochCurve(ctx, pointB, pointC, iterations);
    drawKochCurve(ctx, pointC, pointA, iterations);
}

window.onload = drawSnowflake;
