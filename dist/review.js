/// <reference path="../src/display.ts"/>
/// <reference path="../src/error.d.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/question.ts"/>
function start_review() {
    if (isReciting) {
        Err.error_display("请先完成或中止当前题目的背诵，再点击复习按钮。");
        return;
    }
    else {
        show("#review");
        var $table = $("#review-tbody");
        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];
            $("<div></div>").addClass("rev-tr")
                .append($("<span></span>").text(i.toString()))
                .append($("<span></span>").text(q.get_quesText()))
                .append($("<span></span>").text(q.get_corrAns()))
                .append($("<span></span>").text(q.get_score().toString()).addClass((q.get_score() >= crScore) ? "rev-green" : (q.get_score() < 0) ? "rev-red" : ""))
                .append($("<span></span>").text(q.get_passed() ? "通过" : "未通过").addClass(q.get_passed() ? "rev-green" : "rev-red"))
                .append($("<span></span>").text(q.get_answeredTimes().toString()))
                .appendTo($table);
        }
    }
}
function close_review() {
    $("#review-tbody").html("");
    hide("#review");
}
