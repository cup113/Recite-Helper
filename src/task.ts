/// <reference path="../src/question.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/display.ts"/>
function clear_questions() {
	var con = confirm(`确认要清空所有进度吗？请确保你已经保存或弃用此次进度（你现在一共有${questions.length}个问题）。此操作不可逆。`);
	if (con) {
		questions.splice(0, questions.length);
		$("#task-reading-process").text("清空完毕。");
	}
	indexesNow.splice(0, indexesNow.length);
	set_qPointer(0);
	hide("#recite");
	hide("#result");
}