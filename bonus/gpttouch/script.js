window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const imageCanvas = document.createElement('canvas');
  const imageContext = imageCanvas.getContext('2d');

  // Draw a black circle on the smaller canvas
  const circleRadius = 15;
  imageCanvas.width = 30;
  imageCanvas.height = 30;
  imageContext.fillStyle = 'black';
  imageContext.beginPath();
  imageContext.arc(15, 15, circleRadius, 0, 2 * Math.PI);
  imageContext.fill();

  canvas.addEventListener('mousedown', drawImage);
  canvas.addEventListener('touchstart', drawImage);

  function drawImage(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    let touch;
    if (event.type === 'mousedown') {
      touch = {
        type: 'mouse',
        radiusX: circleRadius,
        radiusY: circleRadius,
        rotationAngle: 0
      };
    } else if (event.type === 'touchstart') {
      if (event.touches.length > 0) {
        touch = event.touches[0];
      } else {
        return;
      }
    }

    if (touch) {
      const centerX = event.clientX || touch.clientX;
      const centerY = event.clientY || touch.clientY;

      // Calculate size and rotation based on touch input
      const width = touch.radiusX * 2;
      const height = touch.radiusY * 2;
      const rotation = touch.rotationAngle;

      // Draw the image on the canvas at the center
      const x = centerX - width / 2;
      const y = centerY - height / 2;
      context.translate(x, y);
      context.rotate(rotation);
      context.drawImage(imageCanvas, 0, 0, imageCanvas.width, imageCanvas.height, 0, 0, width, height);
      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations
    }
  }
});

