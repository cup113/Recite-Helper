/// <reference path="../src/convert.ts"/>
/// <reference path="../src/config.ts"/>
function file_upload_change() {
    var files = $("#file-upload-file")[0].files, filenames = [];
    for (var i = 0; i < files.length; i++) {
        filenames.push(files[i].name);
    }
    $("#file-upload-filename").text((files.length === 0) ? "未选择文件" : ((files.length === 1) ? filenames[0] : "\u5171".concat(files.length, "\u4E2A\u6587\u4EF6\uFF1A").concat(filenames.join(", "))));
    $("#task-upload-confirm").removeAttr("disabled");
}
function file_upload_confirm() {
    var files = $("#file-upload-file")[0].files, $process = $("#task-reading-process");
    if (files.length === 0) {
        $process.text("没有上传文件！").css("color", "red");
        return;
    }
    $("#task-upload-confirm").attr("disabled", "disabled");
    var titleChanged = false, fileread = 0, readend = function () {
        ++fileread;
        if (fileread === files.length) {
            $("#task-reading-process").text("读入完毕。时间: " + new Date().toLocaleTimeString()).css("color", "green");
            round = 1;
            check_config();
            update_stage();
            console.log(indexesNow);
        }
        else {
            $("#task-reading-process").text("\u8BFB\u5165\u4E2D(".concat(fileread, "/").concat(files.length, ")")).css("color", "black");
        }
    };
    $("#task-reading-process").text("\u8BFB\u5165\u4E2D(0/".concat(files.length, ")")).css("color", "black");
    for (var i = 0; i < files.length; i++) {
        var file = files[i], ext = get_file_extension(file.name);
        if ((!titleChanged) && (ext === "txt" || ext === "rhp")) {
            $("#title").text(file.name.substring(0, file.name.length - ext.length - 1));
            titleChanged = true;
        }
        if (ext === "txt") {
            read_txt(file, readend);
        }
        else if (ext === "rhp") {
            read_rhp(file, readend);
        }
        else {
            console.error("extension = ".concat(ext, ": failed."));
            readend();
        }
    }
}
function export_rhp() {
    if (questions.length === 0) {
        Err.error_display("暂时没有问题，无法导出");
        return;
    }
    var rhpfile = generate_rhp();
    $("<span></span>").appendTo($("<a></a>").attr({
        "href": URL.createObjectURL(rhpfile),
        "download": $("#title").text() + ".rhp"
    })).trigger("click");
}
