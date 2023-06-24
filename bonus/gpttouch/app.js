window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let isDrawing = false;

  // Add touch event listeners
  canvas.addEventListener('touchstart', handleStart);
  canvas.addEventListener('touchmove', handleMove);
  canvas.addEventListener('touchend', handleEnd);

  // Handle touch start event
  function handleStart(event) {
    isDrawing = true;
    event.preventDefault();
  }

  // Handle touch move event
  function handleMove(event) {
    if (!isDrawing) return;

    const touch = event.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    const radius = touch.force || touch.radiusX || 1;

    drawCircle(x, y, radius);
  }

  // Handle touch end event
  function handleEnd(event) {
    isDrawing = false;
    event.preventDefault();
  }

  // Draw a circle on the canvas
  function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
});

