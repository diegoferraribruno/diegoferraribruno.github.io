
function lumaKey(range = 220) {

    var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
        pix = imgd.data,
        newColor = { r: 0, g: 0, b: 0, a: 0 };

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i],
            g = pix[i + 1],
            b = pix[i + 2];

        // If its white then change it
        if (r <= range && g <= range && b <= range) {
            // Change the white to whatever.
            pix[i] = newColor.r;
            pix[i + 1] = newColor.g;
            pix[i + 2] = newColor.b;
            pix[i + 3] = newColor.a;
        }
    }
}

ctx.putImageData(imgd, 0, 0);​