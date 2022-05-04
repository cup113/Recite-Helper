/// <reference path="../src/question.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/display.ts"/>
function clear_questions() {
	var con = confirm(`确认要清空所有进度吗？请确保你已经保存或弃用此次进度（你现在一共有${questions.length}个问题）。此操作不可逆。`);
	if (con) {
		questions.splice(0, questions.length);
		$("#task-setq-body").html("");
		$("#task-reading-process").text("清空完毕。");
		indexesNow.splice(0, indexesNow.length);
		round = 1;
		set_qPointer(0);
	}
}

function update_qnum() {
	$("#task-qnum").text(questions.length.toString());
}

/**
 * @todo 添加页码功能编辑
 */

function update_task_question(_id: number) {
	if (_id >= 50 && _id <= 70) {
		console.warn("暂不支持50以上的问题编辑");
		return;
	}
	let q = questions[_id];
	$("<div></div>").addClass("task-setq-r")
	.append($("<span></span>").text(_id.toString()).attr("id", "task-setq-id-" + _id.toString()))
	.append($("<textarea></textarea>").val(q.get_quesText()).attr("disabled", "disabled"))
	.append($("<textarea></textarea>").val(q.get_corrAns()).attr("disabled", "disabled"))
	.append(
		$("<span></span>").append($("<button></button>").text("编辑").addClass("button-d").attr("type", "button").on('click', function (event) {
			if ($("#task-setq-active").length === 1) {
				Err.error_display("已经有问题处于编辑状态，请先提交上一个问题的编辑。");
			}
			else {
				let _id = event.target.parentElement.parentElement.children[0].id;
				task_start_edit(parseInt(_id.substring(_id.lastIndexOf("-") + 1)));
			}
		}))
	).appendTo($("#task-setq-body"));
}

function task_edit_submit(_id: number) {
	var divr = document.getElementById("task-setq-active"),
	quesNow = questions[_id];
	divr.id = "";
	quesNow.set_quesText($(divr.children[1] as HTMLElement).attr("disabled", "disabled").val() as string);
	quesNow.set_corrAns($(divr.children[2] as HTMLElement).attr("disabled", "disabled").val() as string);
	$(divr.children[3] as HTMLElement).html("").append(
		$("<button></button>").addClass("button-d").text("编辑").attr("type", "button").on('click', function (event) {
			if ($("#task-setq-active").length === 1) {
				Err.error_display("已经有问题处于编辑状态，请先提交上一个问题的编辑。");
			}
			else {
				let _id = event.target.parentElement.parentElement.children[0].id;
				task_start_edit(parseInt(_id.substring(_id.lastIndexOf("-") + 1)));
			}
		})
	);
}

function task_delete(_id: number) {
	$("#task-setq-active").remove();
	questions.splice(_id, 1);
	// 移动indexesNow
	if (indexesNow[qPointer] > _id) set_qPointer(qPointer - 1);
	var i = indexesNow.indexOf(_id);
	if (i !== -1) indexesNow.splice(i, 1);
	for (i=0; i<indexesNow.length; i++) {
		let qi = indexesNow[i];
		if (qi > _id) --indexesNow[i];
	}
	for (i=Math.max(0*50, _id + 1); i<Math.min(questions.length+1, 1*50); i++) {
		$("#task-setq-id-" + (i).toString()).attr("id", "task-setq-id-" + (i - 1).toString()).text((i - 1).toString());
	}
	if (questions.length >= 1 * 50 - 1) update_task_question(1 * 50 - 1);
	update_stage();
}

function task_start_edit(_id: number) {
	var divr = document.getElementById("task-setq-body").children[_id];
	divr.id = "task-setq-active";
	$([divr.children[1] as HTMLElement, divr.children[2] as HTMLElement]).removeAttr("disabled");
	$(divr.children[3] as HTMLElement).html("")
	.append($("<button></button>").addClass("button-d").attr("type", "button").text("删除").on("click", (event) => {let _id = event.target.parentElement.parentElement.children[0].id; task_delete(parseInt(_id.substring(_id.lastIndexOf("-") + 1)));}))
	.append($("<button></button>").addClass("button-d").attr("type", "button").text("完成").on("click", (event) => {let _id = event.target.parentElement.parentElement.children[0].id; task_edit_submit(parseInt(_id.substring(_id.lastIndexOf("-") + 1)));}));
}

function task_setq_init() {
	update_qnum();
	for (let i=0; i<questions.length; i++) update_task_question(i);
}

function task_addq() {
	questions.push(new Question("问题", "标答"));
	check_config();
	update_qnum();
	update_task_question(questions.length - 1);
	update_stage();
}

function start_task() {
	if (isReciting) {
		Err.error_display("请先暂停背诵（答完当前题目或强行中止），再设置任务。");
		return;
	}
	show("#task");
	hide("#recite");
	hide("#result");
	task_setq_init();
}

function close_task() {
	hide("#task");
	$("#task-setq-body").html("");
}