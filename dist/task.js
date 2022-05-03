/// <reference path="../src/question.ts"/>
/// <reference path="../src/config.ts"/>
/// <reference path="../src/display.ts"/>
function clear_questions() {
    var con = confirm("\u786E\u8BA4\u8981\u6E05\u7A7A\u6240\u6709\u8FDB\u5EA6\u5417\uFF1F\u8BF7\u786E\u4FDD\u4F60\u5DF2\u7ECF\u4FDD\u5B58\u6216\u5F03\u7528\u6B64\u6B21\u8FDB\u5EA6\uFF08\u4F60\u73B0\u5728\u4E00\u5171\u6709".concat(questions.length, "\u4E2A\u95EE\u9898\uFF09\u3002\u6B64\u64CD\u4F5C\u4E0D\u53EF\u9006\u3002"));
    if (con) {
        questions.splice(0, questions.length);
        $("#task-reading-process").text("清空完毕。");
    }
    indexesNow.splice(0, indexesNow.length);
    set_qPointer(0);
    hide("#recite");
    hide("#result");
}
