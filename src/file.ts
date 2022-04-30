function file_upload_change() {
	var files = ($("#file-upload-file")[0] as HTMLInputElement).files,
	filenames: string[] = [];
	for (let i=0; i<files.length; i++) {
		filenames.push(files[i].name);
	}
	$("#file-upload-filename").text(`共${files.length}个文件：${filenames.join(", ")}`);
}