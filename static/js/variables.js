// 操作する画面エレメント変数定義します。
// 画像のタイプ
const imgtype = 'image/jpeg';
// 止まった回数
var   stop_count      = 0;
// 手数
var   tesu            = -1;
// インターバルの変数
var   intervalHandler = null;
// ビデオの回転変数
var   video_rotate    = 0;
// 盤の情報
var   result_json     = {"ban_result": {"00": "v香", "10": "v桂", "20": "v銀", "30": "v金", "40": "v玉", "50": "v金", "60": "v銀", "70": "v桂", "80": "v香", "01": " ・", "11": "v飛", "21": " ・", "31": " ・", "41": " ・", "51": " ・", "61": " ・", "71": "v角", "81": " ・", "02": "v歩", "12": "v歩", "22": "v歩", "32": "v歩", "42": "v歩", "52": "v歩", "62": "v歩", "72": "v歩", "82": "v歩", "03": " ・", "13": " ・", "23": " ・", "33": " ・", "43": " ・", "53": " ・", "63": " ・", "73": " ・", "83": " ・", "04": " ・", "14": " ・", "24": " ・", "34": " ・", "44": " ・", "54": " ・", "64": " ・", "74": " ・", "84": " ・", "05": " ・", "15": " ・", "25": " ・", "35": " ・", "45": " ・", "55": " ・", "65": " ・", "75": " ・", "85": " ・", "06": " 歩", "16": " 歩", "26": " 歩", "36": " 歩", "46": " 歩", "56": " 歩", "66": " 歩", "76": " 歩", "86": " 歩", "07": " ・", "17": " 角", "27": " ・", "37": " ・", "47": " ・", "57": " ・", "67": " ・", "77": " 飛", "87": " ・", "08": " 香", "18": " 桂", "28": " 銀", "38": " 金", "48": " 玉", "58": " 金", "68": " 銀", "78": " 桂", "88": " 香"}, "sente_mochi": {}, "gote_mochi": {}, "teban": "先手番"};     