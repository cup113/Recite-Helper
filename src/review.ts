/// <reference path="../src/display.ts"/>
/// <reference path="../src/error.d.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/question.ts"/>

function start_review() {
	if (isReciting && (!$("#recite").hasClass("none-display"))) {
		Err.error_display("请不要在背诵中点击复习按钮");
		return;
	}
	else {
		show("#review");
		var $table = $("#review-tbody");
		for (let i=0; i<questions.length; i++) {
			let q = questions[i];
			$("<div></div>").addClass("rev-tr")
			.append($("<span></span>").text((i + 1).toString()))
			.append($("<span></span>").text(q.get_quesText()))
			.append($("<span></span>").text(q.get_corrAns()))
			.append($("<span></span>").text(q.get_score().toString()).addClass((q.get_score() >= crScore)? "rev-green": (q.get_score() < 0)? "rev-red": ""))
			.append($("<span></span>").text(q.get_passed()? "通过": "未通过").addClass(q.get_passed()? "rev-green": "rev-red"))
			.append($("<span></span>").text(q.get_answeredTimes().toString()))
			.appendTo($table);
		}
	}
}

function close_review() {
	$("#review-tbody").html("");
	hide("#review");
}