function check_browser_cam(){
    // getUserMedia が使えないときは、『getUserMedia()が使えないブラウザだよ』と言ってね。
    if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
        const err = new Error('getUserMedia()が使えないブラウザだよ');
        alert(`${err.name} ${err.message}`);
        throw err;
    }
}

function diff_image(before, current){
    var diff = 0;
    for(i=0;i<before.length;i++){
        diff += Math.ceil(Math.abs((before[i] - current[i])/2));
    }
    return diff;
}

function grayscaling(imgdata){
    for (var i=0; i<imgdata.data.length; i+=4) {  // imgdata.data: [R,G,B,alpha,R,G,B,alpha...]
        var gray = (imgdata.data[i] + imgdata.data[i+1] + imgdata.data[i+2]) / 3;  // グレースケール値計算
        imgdata.data[i] = imgdata.data[i+1] = imgdata.data[i+2] = gray;  // RGB
        imgdata.data[i+3] = 255;  // alpha
    }
    return imgdata;
}

function sengo2string(sengo){
    var strsengo = ["sente", "gote"];
    return strsengo[sengo%2];
}

function koma2index(string){
    var koma = ["歩","香","桂","銀","金","角","飛"];
    return koma.indexOf(string);
}

function naru(koma){
    var omote = ["fu","ky","ke","gi","ka","hi"];
    var ura   = ["to","ny","nk","ng","um","ry"];
    return koma[0] + ura[omote.indexOf(koma.substr(1))];
}

function alphabet2kanji(koma){
    // １文字目は先後を表す字なので変換しない
    var alphabet = ["* ","fu","ky","ke","gi","ki","ka","hi","ou","to","ny","nk","ng","um","ry"];
    var kanji    = ["・","歩","香","桂","銀","金","角","飛","玉","と","杏","圭","全","馬","龍"];
    return koma[0] + kanji[alphabet.indexOf(koma.substr(1))];
}

function json2itte(json){
    var next_place = String(json["to"]["suji"]) + String(json["to"]["dan"]);
    var koma = alphabet2kanji(json["piece"]);
    var uchi = (json["from"]["uchi"]) ? "打" : "";
    var nari = (json["to"]["nari"]) ? "成" : "";
    var direction = (false) ? "寄" : "";
    return next_place+koma+uchi+nari+direction;
}

// Resize Base64 Image
//   imgB64_src: string | "data:image/png;base64,xxxxxxxx"
//   width     : number | dst img w
//   height    : number | dst img h
//   rotate    : number | dst img r 0/90/180/270 only
function ImgB64Resize(imgB64_src, width, height, rotate, callback) {
    // Image Type
    var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
    // Source Image
    var img = new Image();
    img.onload = function() {
        // New Canvas
        var canvas = document.createElement('canvas');
        if(rotate == 90 || rotate == 270) {
            // swap w <==> h
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
        // Draw (Resize)
        var ctx = canvas.getContext('2d');
        if(0 < rotate && rotate < 360) {
            ctx.rotate(rotate * Math.PI / 180);
            if(rotate == 90)
                ctx.translate(0, -height);
            else if(rotate == 180)
                ctx.translate(-width, -height);
            else if(rotate == 270)
                ctx.translate(-width, 0);
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Destination Image
        var imgB64_dst = canvas.toDataURL(img_type);
        callback(imgB64_dst);
    };
    img.src = imgB64_src;
}