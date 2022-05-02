/// <reference path="../src/convert.ts"/>

function file_upload_change() {
	var files = ($("#file-upload-file")[0] as HTMLInputElement).files,
	filenames: string[] = [];
	for (let i=0; i<files.length; i++) {
		filenames.push(files[i].name);
	}
	$("#file-upload-filename").text(
		(files.length === 0)? "未选择文件": (
			(files.length === 1)? filenames[0]: `共${files.length}个文件：${filenames.join(", ")}`
		)
	);
}

function file_upload_confirm() {
	var files = ($("#file-upload-file")[0] as HTMLInputElement).files,
	$process = $("#task-reading-process");
	if (files.length === 0) {
		$process.text("没有上传文件！").css("color", "red");
		return;
	}
	var titleChanged = false,
	fileread = 0,
	readend = function() {
		++fileread;
		if (fileread === files.length) {
			$("#task-reading-process").text("读入完毕。时间: " + new Date().toLocaleTimeString()).css("color", "green");
			console.log(questions);
		}
		else {
			$("#task-reading-process").text(`读入中(${fileread}/${files.length})`).css("color", "black");
		}
	};
	$("#task-reading-process").text(`读入中(0/${files.length})`).css("color", "black");
	for (let i=0; i<files.length; i++) {
		let file = files[i],
		ext = get_file_extension(file.name);
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
			console.error(`extension = ${ext}: failed.`);
			readend();
		}
	}
}

function export_rhp() {
	var rhpfile = generate_rhp();
	$("<span></span>").appendTo($("<a></a>").attr({
		"href": URL.createObjectURL(rhpfile),
		"download": $("#title").text() + ".rhp",
	})).trigger("click");
}