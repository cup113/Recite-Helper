/// <reference path="../src/question.ts"/>
/// <reference path="../src/display.ts"/>
/// <reference path="../src/similarity.ts"/>
/// <reference path="../src/error.d.ts"/>
/// <reference path="../src/config.ts"/>
function next_question() {
    document.getElementById("rs-ans").focus();
    if (qPointer > indexesNow.length) {
        Err.error_display("问题指针异常");
        return;
    }
    if (!$("#result").hasClass("none-display")) {
        $("#result").addClass("none-display");
    }
    $("#rc-ans").removeAttr("disabled").val("");
    if (laAllPassed)
        return;
    isReciting = true;
    var qi = indexesNow[qPointer], questionNow = questions[qi];
    $("#rc-ques").text(questionNow.get_quesText());
    $("#rc-qid").text(qi);
    $("#rc-scnow").text(questionNow.get_score().toString());
}
function start_recite() {
    if (indexesNow.length === 0) {
        Err.error_display((questions.length === 0) ? "你还没有导入问题哦。请导入文件或新增问题。" : (laAllPassed) ? "现存问题已全部通过，请寻找新问题" : "现存可用问题为空！请导入文件或新增问题。");
        return;
    }
    toggleShow("#recite");
    if (!isReciting)
        next_question();
}
function submit_question() {
    if (!isReciting)
        Err.error_display("请不要重复提交", 4000, "ℹ");
    isReciting = false;
    show("#result");
    var ans = $("#rc-ans").attr("disabled", "disabled").val(), questionNow = questions[indexesNow[qPointer]], corrAns = questionNow.get_corrAns(), simiRelaxed = simi_quick(ans, corrAns), simiStrict = simi_levenshtein(ans, corrAns), simiTtl = (prStrict * simiStrict + (10 - prStrict) * simiRelaxed) / 10, recScore = ((simiTtl * 100 >= exSimi) ?
        ((simiTtl * 100 - exSimi) / (100 - exSimi)) : ((exSimi <= 50) ? ((simiTtl * 100 - exSimi) / exSimi) : ((simiTtl * 100 <= 2 * exSimi - 100) ? (-1) : ((simiTtl * 100 - exSimi) / (100 - exSimi))))) * 10, simiColor = (simiTtl * 100 >= 99) ? "#008800" : ((simiTtl * 100 >= exSimi) ? "#888800" : "#ff0000");
    $("#rs-cor").text(corrAns);
    $("#rs-ans").text(ans);
    $("#rs-simi-ttl").text((simiTtl * 100).toFixed(2) + "%").css("color", simiColor);
    $("#rs-simi-relaxed").text((simiRelaxed * 100).toFixed(2) + "%");
    $("#rs-simi-strict").text((simiStrict * 100).toFixed(2) + "%");
    if (!coAllPassed) {
        $("#rs-score-num").attr("placeholder", "算法推荐: " + recScore.toFixed(0)).val(recScore.toFixed(0));
    }
}
function see_simi_detail() {
    if ($("#rs-simi-detail").hasClass("none-display")) {
        show("#rs-simi-detail");
        $("#rs-simi-dswitch").css("--rotate", "90deg");
    }
    else {
        hide("#rs-simi-detail");
        $("#rs-simi-dswitch").css("--rotate", "0deg");
    }
}
function submit_result() {
    if (!coAllPassed) {
        var scoreAdd = parseInt($("#rs-score-num").val());
        if (isNaN(scoreAdd) || scoreAdd < -10 || scoreAdd > 10) {
            Err.error_display("请输入-10~10之间的整数！");
            return;
        }
        else {
            questions[indexesNow[qPointer]].add_score(scoreAdd);
        }
    }
    else if (!laAllPassed) {
        var pass1 = document.getElementById("rs-pass-1").checked, pass0 = document.getElementById("rs-pass-0").checked;
        if ((!pass1) && (!pass0)) {
            Err.error_display("请做出选择");
            return;
        }
        else if (pass1) {
            questions[indexesNow[qPointer]].set_passed(true);
            document.getElementById("rs-pass-1").checked = false;
        }
        else {
            document.getElementById("rs-pass-0").checked = false;
        }
    }
    if (qPointer <= indexesNow.length - 2) {
        qPointerNext();
    }
    else if (!coAllPassed) {
        var tempIndexes = [];
        for (var i = 0; i < indexesNow.length; i++) {
            if (questions[indexesNow[i]].get_score() < crScore)
                tempIndexes.push(indexesNow[i]);
        }
        indexesNow = tempIndexes;
        ++round;
        set_qPointer(0);
        if (tempIndexes.length === 0) {
            hide("#rs-score");
            show("#rs-pass");
            for (var i = 0; i < questions.length; i++) {
                if (!questions[i].get_passed())
                    indexesNow.push(i);
            }
            pass_co();
        }
    }
    else if (!laAllPassed) {
        var tempIndexes = [];
        for (var i = 0; i < indexesNow.length; i++) {
            if (!questions[indexesNow[i]].get_passed())
                tempIndexes.push(indexesNow[i]);
        }
        indexesNow = tempIndexes;
        ++round;
        set_qPointer(0);
        if (tempIndexes.length === 0) {
            show("#rs-score");
            hide("#rs-pass");
            hide("#recite");
            isReciting = false;
            pass_la();
        }
    }
    else {
        console.error("Recite ???");
    }
    next_question();
}
