var fix_place = 'done';

function ban_click(string){
  if (fix_place != 'done'){set_uncolor(fix_place);}
  fix_place = String(8-Number(string.charAt(0)))+String(Number(string.charAt(1)));
  // set_color(fix_place);
  // disp_imglist();
}

function fix(string){
  var result_img = get_result_img(fix_place);
  var result_place = document.getElementById('board');
  // fix
  result_json["ban_result"][fix_place] = string;
  result_img.children[0].src = "./static/img/koma/"+kanji2alphabet(string).trim()+".png";
  // result_place.textContent = json_to_kif(result_json);

  // set_uncolor(fix_place);
  // close_imglist();
  fix_place = 'done';
}

function disp_mochigoma_sub(sengo,string,kazu,result_json){
  var sengo_int = 0;
  if (sengo == "sente_mochi"){sengo_int = 1;}
  var mochigoma = document.getElementsByClassName('mochigoma-list')[sengo_int].children[koma2index(string)].children[0];
  result_json[sengo][string] = kazu;
  mochigoma.children[1].innerHTML = String(kazu); // ここの1はimgタグの次のpってこと
  if (kazu == 0){mochigoma.children[0].style.opacity=0.5; delete result_json[sengo][string];}
  else {mochigoma.children[0].style.opacity=1;}
  return result_json
}

function fix_mochigoma(method,sengo,string){
  var kazu = 1; // == real num
  var max_koma = [18,4,4,4,4,2,2];
  var result_place = document.getElementById('board');
  if(method=='add'){
    sengo_str = sengo + "_mochi"
    if (string in result_json[sengo_str]){
      kazu=(result_json[sengo_str][string]+1)%(max_koma[koma2index(string)]+1);
    }
  }
  else if(method=='del'){
    sengo_str = sengo + "_mochi"
    if (string in result_json[sengo_str]){
      kazu=(result_json[sengo_str][string]-1)%(max_koma[koma2index(string)]+1);
    }
  }
  result_json = disp_mochigoma_sub(sengo_str,string,kazu,result_json);
  // result_place.textContent = json_to_kif(result_json);
}

function move_koma(json, sengo){
  // すべての背景を透明化
  reset_bgcolor();

  // 動かす前の駒をなくす
  if(json["from"]["uchi"] == false){
    // 動かす前の場所の駒をなくす
    let before_move = String(json["from"]["suji"]-1)+String(json["from"]["dan"]-1);
    ban_click(before_move);
    fix(" ・");
  }else{
    // 持ち駒を一つ減らす
    fix_mochigoma("del", sengo2string(sengo+1), raw2mochigoma(alphabet2kanji(json["piece"])));
  }
  
  // 動かした場所をクリック
  let next_move   = String(json["to"]["suji"]-1)  +String(json["to"]["dan"]-1);
  ban_click(next_move);
  // 但し、動かした場所に駒があればその駒を持ち駒とする
  if(result_json["ban_result"][fix_place]!=" ・"){
    // 持ち駒を一つ増やす
    fix_mochigoma("add", sengo2string(sengo), raw2mochigoma(result_json["ban_result"][fix_place]));
  }
  // 動かした場所に駒を示す
  if(json["to"]["nari"]==true){
    let koma = alphabet2kanji(naru(json["piece"]));
    fix(koma);
  }else{
    let koma = alphabet2kanji(json["piece"]);
    fix(koma);
  }

  // 動かした場所の背景を黄色くする
  set_color_yellow(String(9-json["to"]["suji"])  +String(json["to"]["dan"]-1));
}

function set_kif(teban, data){
  var row = $guikif.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  cell1.innerHTML = teban;
  cell2.innerHTML = data;
}