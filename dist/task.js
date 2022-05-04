/// <reference path="../src/question.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/display.ts"/>
function clear_questions() {
    var con = confirm("\u786E\u8BA4\u8981\u6E05\u7A7A\u6240\u6709\u8FDB\u5EA6\u5417\uFF1F\u8BF7\u786E\u4FDD\u4F60\u5DF2\u7ECF\u4FDD\u5B58\u6216\u5F03\u7528\u6B64\u6B21\u8FDB\u5EA6\uFF08\u4F60\u73B0\u5728\u4E00\u5171\u6709".concat(questions.length, "\u4E2A\u95EE\u9898\uFF09\u3002\u6B64\u64CD\u4F5C\u4E0D\u53EF\u9006\u3002"));
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
function update_task_question(_id) {
    if (_id >= 50) {
        if (_id === 50)
            Err.error_display("暂不支持50以上的问题编辑", 8000, "⚠");
        return;
    }
    var q = questions[_id];
    $("<div></div>").addClass("task-setq-r")
        .append($("<span></span>").text(_id.toString()).attr("id", "task-setq-id-" + _id.toString()))
        .append($("<textarea></textarea>").val(q.get_quesText()).attr("disabled", "disabled"))
        .append($("<textarea></textarea>").val(q.get_corrAns()).attr("disabled", "disabled"))
        .append($("<span></span>").append($("<button></button>").text("编辑").addClass("button-d").attr("type", "button").on('click', function (event) {
        if ($("#task-setq-active").length === 1) {
            Err.error_display("已经有问题处于编辑状态，请先提交上一个问题的编辑。");
        }
        else {
            var _id_1 = event.target.parentElement.parentElement.children[0].id;
            task_start_edit(parseInt(_id_1.substring(_id_1.lastIndexOf("-") + 1)));
        }
    }))).appendTo($("#task-setq-body"));
}
function task_edit_submit(_id) {
    var divr = document.getElementById("task-setq-active"), quesNow = questions[_id];
    divr.id = "";
    quesNow.set_quesText($(divr.children[1]).attr("disabled", "disabled").val());
    quesNow.set_corrAns($(divr.children[2]).attr("disabled", "disabled").val());
    $(divr.children[3]).html("").append($("<button></button>").addClass("button-d").text("编辑").attr("type", "button").on('click', function (event) {
        if ($("#task-setq-active").length === 1) {
            Err.error_display("已经有问题处于编辑状态，请先提交上一个问题的编辑。");
        }
        else {
            var _id_2 = event.target.parentElement.parentElement.children[0].id;
            task_start_edit(parseInt(_id_2.substring(_id_2.lastIndexOf("-") + 1)));
        }
    }));
}
function task_delete(_id) {
    $("#task-setq-active").remove();
    questions.splice(_id, 1);
    // 移动indexesNow
    if (indexesNow[qPointer] > _id)
        set_qPointer(qPointer - 1);
    var i = indexesNow.indexOf(_id);
    if (i !== -1)
        indexesNow.splice(i, 1);
    for (i = 0; i < indexesNow.length; i++) {
        var qi = indexesNow[i];
        if (qi > _id)
            --indexesNow[i];
    }
    for (i = Math.max(0 * 50, _id + 1); i < Math.min(questions.length + 1, 1 * 50); i++) {
        $("#task-setq-id-" + (i).toString()).attr("id", "task-setq-id-" + (i - 1).toString()).text((i - 1).toString());
    }
    if (questions.length >= 1 * 50 - 1)
        update_task_question(1 * 50 - 1);
    update_stage();
}
function task_start_edit(_id) {
    var divr = document.getElementById("task-setq-body").children[_id];
    divr.id = "task-setq-active";
    $([divr.children[1], divr.children[2]]).removeAttr("disabled");
    $(divr.children[3]).html("")
        .append($("<button></button>").addClass("button-d").attr("type", "button").text("删除").on("click", function (event) { var _id = event.target.parentElement.parentElement.children[0].id; task_delete(parseInt(_id.substring(_id.lastIndexOf("-") + 1))); }))
        .append($("<button></button>").addClass("button-d").attr("type", "button").text("完成").on("click", function (event) { var _id = event.target.parentElement.parentElement.children[0].id; task_edit_submit(parseInt(_id.substring(_id.lastIndexOf("-") + 1))); }));
}
function task_setq_init() {
    update_qnum();
    for (var i = 0; i < questions.length; i++)
        update_task_question(i);
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
