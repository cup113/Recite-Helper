/// <reference path="../src/question.ts"/>
function clear_questions() {
    var con = confirm("确认要清空所有进度吗？请确保你已经保存或弃用此次进度。此操作不可逆。");
    if (con) {
        questions.splice(0, questions.length);
    }
}
