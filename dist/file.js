function file_upload_change() {
    var files = $("#file-upload-file")[0].files, filenames = [];
    for (var i = 0; i < files.length; i++) {
        filenames.push(files[i].name);
    }
    $("#file-upload-filename").text("\u5171".concat(files.length, "\u4E2A\u6587\u4EF6\uFF1A").concat(filenames.join(", ")));
}
