function makeTwitterId() {
    var date = new Date();
    return date.getTime();
}

function upsert_table(tesu, kif){
    let table = document.getElementById('kif_table');
    let newRow = table.insertRow();

    let newCell = newRow.insertCell();
    let newText = document.createTextNode(tesu);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(kif);
    newCell.appendChild(newText);
}

function update_kif(tesu, kif_json){
    // テーブルにKIFを表示
    upsert_table(tesu, kif_json.kif);
    // 盤面変更
    move_koma(kif_json, tesu);
    // TODO: しゃべる
    kifuyomi((tesu-1)%2, kif_json.kif);
}

var interval_id = 0;
var current_tesu = 0;
var game_id = location.search.replace("?gameid=","");

var countup = function(){
    $.get("/kif", { gameid: game_id, tesu: current_tesu }, function(data){
        kifs = data.kifs;
        if ((kifs.length != 1) || (kifs[0] != "")){
            for(let i = 0; i < kifs.length; i++) {
                update_kif(current_tesu + 1, kifs[i]);
                current_tesu += 1;
            }
        }
    });
};

$(function(){
    $('#toggle-event').change(function() {
        if ($(this).prop('checked') == true) {
            interval_id = setInterval(countup, 10000);
        } else if (interval_id != 0) {
            clearInterval(interval_id);
        }
    });
});
