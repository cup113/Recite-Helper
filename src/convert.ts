/// <reference path="../src/question.ts"/>

function get_file_extension(filename: string) {
	var last_dot = filename.lastIndexOf("."),
	ext = filename.substring(last_dot + 1);
	return ext;
}

/** Read .txt file into `questions`
 * 
 * T(O(N)), M(O(3N)) N=textfile.size
 * @param textfile file object (extension: txt)
 */
function read_txt(textfile: File, onreadend: () => any = ()=>(0)) {
	var reader = new FileReader(),
	filename = textfile.name;
	reader.readAsText(textfile);
	reader.onload = function () {
	var txtContent: string = "",
	tclen = (reader.result as string).length,
	errCount = 0;
	// CRLF/CR->LF
	for (let i=0; i<tclen; i++) {
		var ch = (reader.result as string)[i];
		if (ch == '\r') {
			txtContent += '\n';
			if (i + 1 < tclen && (reader.result as string)[i+1] == '\n') ++i;
		}
		else txtContent += ch;
	}
	var tquests = txtContent.split("\n\n");
	for (let t of tquests) {
		let firstlf = t.indexOf("\n");
		if (firstlf === -1) {
			++errCount;
			continue;
		}
		questions.push(new Question(t.substring(0, firstlf), t.substring(firstlf + 1)));
	}
	if (errCount > 0) {
		console.warn(filename + ": Format error * " + errCount.toString());
	}
	onreadend();
	};
	reader.onerror = function() {console.warn(filename + ": Read file failed."); onreadend();};
}

function generate_txt() {
	var result = "";
	for (let q of questions) {
		result += q.get_quesText().split("\n").join("\r\n") + "\r\n";
		result += q.get_corrAns().split("\n").join("\r\n") + "\r\n\r\n";
	}
	result = result.substring(0, result.length - 4);
	return new Blob([result]);
}

/** Generate .rhp file from `questions`.
 * T(O(N)), M(O(2N))
 * @returns Blob Object
 */
function generate_rhp(): Blob {
	var result = "v 3\r\n";
	var handle_lf = (str: string) => {
		var tlines = str.split("\n"),
		ret = "";
		for (let i=0; i<tlines.length; i++) {
			if (i != 0) ret += "- ";
			ret += tlines[i];
			ret += "\r\n";
		}
		return ret;
	};
	for (let q of questions) {
		result += "q " + handle_lf(q.get_quesText());
		result += "c " + handle_lf(q.get_corrAns());
		result += "o " + q.get_score().toString() + " " + (q.get_passed()? "1": "0") + " " + q.get_answeredTimes().toString()+ "\r\n";
		result += "e \r\n";
	}
	var ret = new Blob([result]);
	return ret;
}

/** Read rhp file.
 * T(O(N)), M(O(2N))
 * @param rhpfile file object (RHP)
 */
function read_rhp(rhpfile: File, onreadend: () => any = ()=>(0)) {
	var reader = new FileReader(),
	filename = rhpfile.name;
	reader.readAsText(rhpfile);
	reader.onload = function () {
	var content = "",
	tclen = (reader.result as string).length;
	// CRLF/CR->LF
	for (let i=0; i<tclen; i++) {
		var ch = (reader.result as string)[i];
		if (ch == '\r') {
			content += '\n';
			if (i + 1 < tclen && (reader.result as string)[i+1] == '\n') ++i;
		}
		else content += ch;
	}
	var lines = content.split("\n"),
	tempstr = "",
	questionNow = new Question();
	var version = parseInt(lines[0].substring(2));
	if (isNaN(version)) console.warn(filename + ": Version declareation error.");
	for (let i=1; i<lines.length; i++) {
		let l = lines[i];
		if (l.length === 0) break;
		let first_ch = l[0];
		l = l.substring(2, l.length);

		if (first_ch == '-') tempstr += "\n" + l;
		else if (first_ch == 'q') tempstr = l;
		else if (first_ch == 'c') {
			questionNow.set_quesText(tempstr);
			tempstr = l;
		}
		else if (first_ch == 'o') {
			questionNow.set_corrAns(tempstr);
			tempstr = l;
		}
		else if (first_ch == 'e') {
			let arr = tempstr.split(" ");
			if (arr.length < 3) {
				console.error("Length should be not less than 3.");
				continue;
			}
			if (isNaN(parseInt(arr[0]))) arr[0] = '0';
			if (isNaN(parseInt(arr[2]))) arr[2] = '0';
			questionNow.set_score(parseInt(arr[0]));
			questionNow.set_passed((arr[1] == '0')? false: true);
			questionNow.set_answeredTimes(parseInt(arr[2]));
			questions.push(questionNow);
			questionNow = new Question();
			tempstr = "";
		}
	}
	onreadend();
	};
	reader.onerror = function() {console.warn(filename + ": Read file failed."); onreadend();};
}