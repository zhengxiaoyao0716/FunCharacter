function dropFile(files) {
    if (!files || files.length < 1) {
        return;
    }
    var dropbox = document.getElementById("dropbox");
      
    var percent = document.createElement("div" );
    dropbox.appendChild(percent);

    var formData = new FormData();             // 创建一个表单对象FormData
    formData.append( "submit", "中文" );  // 往表单对象添加文本字段
    
    var fileNames = "" ;
    
    for ( var i = 0; i < files.length; i++) {
        var file = files[i];    // file 对象有 name, size 属性
        
        if(!file.type.match(/image*/)) continue;
        
        var config = JSON.parse(document.body.getElementsByTagName("input")[0].value);
        var outDiv = document.getElementById("outDiv");
        
        var image = new Image();
        image.src = URL.createObjectURL(file);
        if (image.complete) fun_character.create(image, outDiv, config.sampling, config.scale, config.fontSize, config.lineHeight, config.chars);
        else image.onload = function () {
            fun_character.create(image, outDiv, config.sampling, config.scale, config.fontSize, config.lineHeight, config.chars);
        };
        /*
        var reader = new FileReader();  
        reader.onload = function()  
        {
            dropbox.remove();
            markedWithToc(this.result);
        };
        reader.readAsText(file); 
        */
    }
}

document.addEventListener("dragover", function(e) {
      e.stopPropagation();
      e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。
}, false);

document.addEventListener("drop", function(e) {
      e.stopPropagation();
      e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。

      dropFile(e.dataTransfer.files);
}, false);