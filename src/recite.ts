/// <reference path="../src/question.ts"/>
/// <reference path="../src/display.ts"/>
/// <reference path="../src/similarity.ts"/>
/// <reference path="../src/error.d.ts"/>
/// <reference path="../src/config.ts"/>

var qPointer = 0,
isReciting = false;

function next_question() {
	if (qPointer > questions.length) {
		Err.error_display("问题指针异常");
		return;
	}
	isReciting = true;
	if (!$("#result").hasClass("none-display")) {
		$("#result").addClass("none-display");
	}
	var questionNow = questions[qPointer];
	$("#rc-ques").text(questionNow.get_quesText());
	$("#rc-ans").removeAttr("disabled").val("");
}

function start_recite() {
	if (questions.length === 0) {
		Err.error_display("现存问题为空！请导入文件或新增问题。");
		return;
	}
	if ($("#recite").hasClass("none-display") || (!isReciting)) show("#recite");
	else Err.error_display("背诵已开始！", 4000, "❕")
	if (!isReciting) next_question();
}

function submit_question() {
	if (!isReciting) Err.error_display("请不要重复提交", 4000, "ℹ")
	isReciting = false;
	show("#result");
	var ans = $("#rc-ans").attr("disabled", "disabled").val() as string,
	questionNow = questions[qPointer],
	corrAns = questionNow.get_corrAns(),
	simiRelaxed = simi_quick(ans, corrAns),
	simiStrict = simi_levenshtein(ans, corrAns),
	simiTtl = (prStrict * simiStrict + (10 - prStrict) * simiRelaxed) / 10,
	recScore = ((simiTtl * 100 >= exSimi)?
	((simiTtl * 100 - exSimi) / (100 - exSimi)): (
		(exSimi <= 50)? ((simiTtl * 100 - exSimi) / exSimi): (
			(simiTtl * 100 <= 2 * exSimi - 100)? 0: (
				(simiTtl * 100 - exSimi) / (100 - exSimi)
			)
		)
	)) * 10,
	simiColor = (simiTtl * 100 >= 99)? "#008800": (
		(simiTtl * 100 >= exSimi)? "#888800": "#ff0000"
	);
	$("#rs-cor").text(corrAns);
	$("#rs-ans").text(ans);
	$("#rs-simi-ttl").text((simiTtl * 100).toFixed(2) + "%").css("color", simiColor);
	$("#rs-simi-relaxed").text((simiRelaxed * 100).toFixed(2) + "%");
	$("#rs-simi-strict").text((simiStrict * 100).toFixed(2) + "%");
	$("#rs-score-num").attr("placeholder", "算法推荐: " + recScore.toFixed(0)).val(recScore.toFixed(0));
	++qPointer;
}

function see_simi_detail() {
	if ($("#rs-simi-detail").hasClass("none-display")) {
		show("#rs-simi-detail");
		$("#rs-simi-dswitch").css("--rotate", "90deg")
	}
	else {
		hide("#rs-simi-detail");
		$("#rs-simi-dswitch").css("--rotate", "0deg");
	}
}