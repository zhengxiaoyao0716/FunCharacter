var fun_character = {};
fun_character.reload = function (sampling, scale, fontSize, lineHeight, chars) {
    if (!fun_character.image || !fun_character.outDiv) return;
    fun_character.create(fun_character.image, fun_character.outDiv,
        sampling, scale, fontSize, lineHeight, chars
    );
}
fun_character.create = (function () {
return function (image, outDiv, sampling, scale, fontSize, lineHeight, chars) {
    //hold
    fun_character.image = image;
    fun_character.outDiv = outDiv;
    
    outDiv.innerHTML = "";
    
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var content = canvas.getContext("2d");
    content.drawImage(image, 0, 0);
    window.imageData = content.getImageData(0, 0, image.width, image.height);
    content.clearRect(0, 0, image.width, image.height);
    content = null;
    canvas = null;
    
    try {
        samplingX = sampling[0] || 1;
        samplingY = sampling[1] || 0.4;
    } catch (e) {
        samplingX = 1;
        samplingY = 0.4;
    }
    width = parseInt(samplingX * imageData.width);
    height = parseInt(samplingY * imageData.height);
    chars = chars || "M@N%W$E#RK&FXYI*l]}1/+i>\"!~';,`:.";
    var grayImageData = new ImageData(width, height);
    var outText = "";
    for (var indexY = 0; indexY < height; indexY++)
    {
        for (var indexX = 0; indexX < width; indexX++)
        {
            var rawIndex =  parseInt(indexX / samplingX) + imageData.width * parseInt(indexY / samplingY);
            rawIndex = rawIndex << 2;
            var toIndex = indexX + width * indexY;
            toIndex = toIndex << 2;
            
            var red = imageData.data[rawIndex];
            var green = imageData.data[rawIndex + 1];
            var blue = imageData.data[rawIndex + 2];
            var alpha = imageData.data[rawIndex + 3];
            
            var gray = (red * 38 + green * 75 + blue * 15) >> 7
            gray = 255 + (gray - 255) * alpha / 255;
            
            grayImageData.data[toIndex] = gray;
            grayImageData.data[toIndex + 1] = gray;
            grayImageData.data[toIndex + 2] = gray;
            grayImageData.data[toIndex + 3] = 255;
            
            outText += chars[parseInt(chars.length * gray / 256)];
        }
        outText += "\n";
    }
    /*
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = width;
    canvas.height = height;
    var content = canvas.getContext("2d");
    content.putImageData(grayImageData, 0, 0);
    */
    function compare(params) {
        for (var i = 0; i < chars.length; i++)
        {
            var s = chars[i];
            for (var j = 0; j < 5; j++)
            {
                for (var k = 0; k < 200; k++)
                {
                    outText += s;
                }
                outText += "\n";
            }
            outText += "\n\n";
        }
    }
    //compare();
    
    var out = document.createElement("p");
    out.style.fontSize = fontSize || "12px";
    out.textContent = outText;
    out.style.transformOrigin = "top left";
    try {
        out.style.transform = "scale(" + scale[0] + ", " + scale[1] + ")";
    } catch (e) {
        out.style.transform = "";
    }
    out.style.lineHeight = lineHeight;
    outDiv.appendChild(out);
};
}());