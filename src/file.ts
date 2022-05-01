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
	var files = ($("#file-upload-file")[0] as HTMLInputElement).files;
	if (files.length === 0) {
		console.error("No files input");
		return;
	}
	for (let i=0; i<files.length; i++) {
		$("#task-reading-process").text(`读入中(0/${files.length})`);
		let file = files[i],
		ext = get_file_extension(file.name);
		if (ext === "txt") {
			read_txt(file);
		}
		else if (ext === "rhp") {
			read_rhp(file);
		}
		else {
			console.error(`extension = ${ext}: failed.`);
		}
	}
	$("#task-reading-process").text("读入完毕。时间: " + new Date().toLocaleTimeString()).css("color", "green");
	console.log(questions);
}

function export_rhp() {
	var rhpfile = generate_rhp();
	$("<span></span>").appendTo($("<a></a>").attr({
		"href": URL.createObjectURL(rhpfile),
		"download": $("#title").text() + ".rhp",
	})).trigger("click");
}