/// <reference path="../src/question.ts"/>
/// <reference path="../src/init.d.ts"/>
/// <reference path="../src/error.d.ts"/>
var crScore, // Common test required score
exSimi, // Expected similatiry (1~99)
prStrict, // Prefer strict (max: 10) or relaxed (min: 0) similarity algorithm
qPointer = 0, isReciting = false, coAllPassed = false, laAllPassed = false, round = 1;
function set_crScore(_crScore, update, fromHTML) {
    if (update === void 0) { update = false; }
    if (fromHTML === void 0) { fromHTML = false; }
    if (!(_crScore > 0)) {
        _crScore = 15;
        Err.error_display("普遍测试所需分数必须是大于0的整数。");
    }
    crScore = _crScore;
    $("#rc-screq").text(crScore.toString());
    if (update || fromHTML)
        localStorage.setItem("RH_crScore", crScore.toString());
    if (!fromHTML)
        $("#set-crscore").val(crScore.toString());
}
function set_exSimi(_exSimi, update, fromHTML) {
    if (update === void 0) { update = false; }
    if (fromHTML === void 0) { fromHTML = false; }
    if (!(_exSimi > 0 && _exSimi < 100)) {
        _exSimi = 60;
        Err.error_display("期望正确率必须是一个1~99的整数。");
    }
    exSimi = _exSimi;
    if (update || fromHTML)
        localStorage.setItem("RH_exSimi", _exSimi.toString());
    if (!fromHTML)
        $("#set-exsimi").val(exSimi.toString());
}
function set_prStrict(_prStrict, update, fromHTML) {
    if (update === void 0) { update = false; }
    if (fromHTML === void 0) { fromHTML = false; }
    if (!(_prStrict >= 0 && _prStrict <= 10)) {
        _prStrict = 5;
        Err.error_display("相似度偏好必须是一个0~10的整数。");
    }
    prStrict = _prStrict;
    $("#set-prs-num").text(prStrict);
    if (update || fromHTML)
        localStorage.setItem("RH_prStrict", prStrict.toString());
    if (!fromHTML)
        $("#set-prstrict").val(prStrict.toString());
}
function update_stage() {
    if (laAllPassed)
        $("#stage").text("已全部完成！");
    else
        $("#stage").text((coAllPassed ? "统一考核" : "普遍测试") + "第" + round.toString() + "轮(" + (qPointer + 1).toString() + "/" + indexesNow.length.toString() + ")");
}
function pass_co() {
    coAllPassed = true;
    round = 1;
    update_stage();
}
function pass_la() {
    laAllPassed = true;
    round = 1;
    update_stage();
}
function set_qPointer(_qPointer) {
    qPointer = _qPointer;
    update_stage();
}
function qPointerNext() {
    set_qPointer(qPointer + 1);
}
function init_localstorage() {
    if (localStorage.getItem("RH_crScore") === null) {
        localStorage.setItem("RH_crScore", "15");
        localStorage.setItem("RH_exSimi", "60");
        localStorage.setItem("RH_prStrict", "5");
    }
    var _crScore = parseInt(localStorage.getItem("RH_crScore")), _exSimi = parseInt(localStorage.getItem("RH_exSimi")), _prStrict = parseInt(localStorage.getItem("RH_prStrict"));
    set_crScore(_crScore);
    set_exSimi(_exSimi);
    set_prStrict(_prStrict);
    console.log("Recite Helper\nVersion " + version + "\nJason M. Li");
}
function check_config() {
    var tempInd = [];
    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        if (q.get_score() < crScore)
            tempInd.push(i);
    }
    if (tempInd.length > 0) {
        coAllPassed = false;
        laAllPassed = false;
        indexesNow = tempInd;
        hide("#rs-pass");
        show("#rs-score");
        return;
    }
    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        if (!q.get_passed())
            tempInd.push(i);
    }
    show("#rs-pass");
    hide("#rs-score");
    coAllPassed = true;
    if (tempInd.length > 0) {
        laAllPassed = false;
        indexesNow = tempInd;
    }
    else {
        laAllPassed = true;
    }
}
function lines_to_paras(text, $target) {
    var lines = text.split("\n");
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var l = lines_1[_i];
        $("<p></p>").text(l).appendTo($target);
    }
}
init_localstorage();
