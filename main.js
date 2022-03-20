'use strict';
var dStartTime = new Date(), // 开始时间
dEndTime = new Date(), // 结束时间
bCommonFinished = false, // 普遍测试是否完成
bExamFinished = false, // 考核是否完成
nExamScore = 0, // 考核总分（加权平均）
questions_list = [], // 问题列表
a
;

class Question {
	constructor(nId, sQuestion, sCorrectAnswer, nScore=0, nExamScore=0, nWeight = 1) {
		this.nId = nId; // 编号
		this.sQuestion = sQuestion; // 问题
		this.sCorrectAnswer = sCorrectAnswer; // 标答
		this.nScore = nScore; // 初步测试积分
		this.nExamScore = nExamScore; // 考核分数
		this.nWeight = nWeight; // 权重
	}
};

function show_section(selector) {
	var $section = $(selector),
	$closeIconDiv = $section.children(".close-icon-fullscreen")[0];
	if ($section.hasClass("none-display")) {
		$section.toggleClass("none-display");
		if ($closeIconDiv != undefined) $closeIconDiv.focus();
	}
	else $section.addClass("none-display");
}