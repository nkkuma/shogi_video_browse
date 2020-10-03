
// 結果編集用関数群
function get_result_img(fix_place){
    return document.getElementById('board_koma').children[0].rows[Number(fix_place.charAt(1))].cells[Number(fix_place.charAt(0))];
}
function set_color(fix_place){
    var result_img = get_result_img(fix_place);
    result_img.style.backgroundColor = 'skyblue';
}
function set_uncolor(fix_place){
    var result_img = get_result_img(fix_place);
    result_img.style.backgroundColor = 'transparent';
}
function set_color_yellow(fix_place){
    var result_img = get_result_img(fix_place);
    result_img.style.backgroundColor = 'yellow';
}
function reset_bgcolor(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        set_uncolor(String(i)+String(j));
      }
    }
  }
function disp_imglist(){
    var fix_imglist = document.getElementsByClassName('horizontal-list')[0];
    fix_imglist.style.display = "block";
}
function close_imglist(){
    var fix_imglist = document.getElementsByClassName('horizontal-list')[0];
    fix_imglist.style.display = "none";
}
function kanji2int(kanji){
    var kansuuji = ["","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八"];
    return kansuuji.indexOf(kanji)+1
}
function int2kanji(kazu){
    var kansuuji = ["","","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八"];
    return kansuuji[kazu]
}
function raw2mochigoma(koma){
    var ura   = ["と","杏","圭","全","馬","龍"];
    var omote = ["歩","香","桂","銀","角","飛"];
    let rawkoma = koma.slice(-1);
    let index = ura.indexOf(rawkoma);
    if(index > -1){rawkoma = omote[index];}
    return rawkoma;
}