function play_sound(srcs){
    let i = 0;
    let length = srcs.length;
    let music = new Audio();
    music.src = srcs[i];
    music.load();
    music.play();  // 再生
    
    music.addEventListener("ended", function () {
        if(i < length - 1){
            i += 1;
            music.src = srcs[i];
            music.load();
            music.play();  // 再生
        }
    }, false);
}

function koma2kifuyomi(string){
    var kifuyomikoma = ["歩","香","桂","銀","金","飛","角","玉","王","","と","杏","圭","全","","龍","馬"];
    return String(kifuyomikoma.indexOf(string)+101);
}

function direction2kifuyomi(string){
    var result = [];
    var kifuyomidirect = ["右","左","直","上","寄","引","成","不成","打","行"];
    var directs = string.split('');
    // 不成があったらそれはまとめる
    if ((directs.length >= 2) && (string.slice(-2) == "不成")){
        directs.splice(-2);
        directs.push("不成");
    }
    for(var i=0;i<directs.length;i++){
        result.push(String(kifuyomidirect.indexOf(directs[i])+201));
    }
    return result;
}

function kifuyomi(sengo, kif){
    let folderpath = "./sound/polly/mizuki/";
    let ext = ".mp3";
    let next_move  = kif.charAt(0)+kif.charAt(1);
    let koma       = koma2kifuyomi(kif.charAt(2));
    let ugoki      = direction2kifuyomi(kif.substr(3));
    // 先手後手
    let srcs = [String(sengo), next_move, koma].concat(ugoki);
    for(let i=0; i<srcs.length; i++){srcs[i] = folderpath+srcs[i]+ext;}
    play_sound(srcs);
}
