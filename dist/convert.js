/// <reference path="../src/question.ts"/>
function get_file_extension(filename) {
    var last_dot = filename.lastIndexOf("."), ext = filename.substring(last_dot + 1);
    return ext;
}
/** Read .txt file into `questions`
 * T(O(N)), M(O(3N))
 * @param textfile file object (extension: txt)
 */
function read_txt(textfile) {
    var reader = new FileReader();
    reader.readAsText(textfile);
    reader.onload = function () {
        var txtContent = "", tclen = reader.result.length;
        // CRLF/CR->LF
        for (var i = 0; i < tclen; i++) {
            var ch = reader.result[i];
            if (ch == '\r') {
                txtContent += '\n';
                if (i + 1 < tclen && reader.result[i + 1] == '\n')
                    ++i;
            }
            else
                txtContent += ch;
        }
        var tquests = txtContent.split("\n\n");
        for (var _i = 0, tquests_1 = tquests; _i < tquests_1.length; _i++) {
            var t = tquests_1[_i];
            var firstlf = t.indexOf("\n");
            if (firstlf === -1) {
                console.error("File format error");
                continue;
            }
            questions.push(new Question(t.substring(0, firstlf), t.substring(firstlf + 1)));
        }
    };
}
/** Generate .rhp file from `questions`.
 * T(O(N)), M(O(2N))
 * @returns Blob Object
 */
function generate_rhp() {
    var result = "v 1\r\n";
    var handle_lf = function (str) {
        var tlines = str.split("\n"), ret = "";
        for (var i = 0; i < tlines.length; i++) {
            if (i != 0)
                ret += "- ";
            ret += tlines[i];
            ret += "\r\n";
        }
        return ret;
    };
    for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
        var q = questions_1[_i];
        result += "q " + handle_lf(q.get_quesText());
        result += "c " + handle_lf(q.get_corrAns());
        result += "o " + q.get_score().toString() + " " + (q.get_passed() ? "1" : "0") + "\r\n";
        result += "e \r\n";
    }
    var ret = new Blob([result]);
    return ret;
}
/** Read rhp file.
 * T(O(N)), M(O(2N))
 * @param rhpfile file object (RHP)
 */
function read_rhp(rhpfile) {
    var reader = new FileReader();
    reader.readAsText(rhpfile);
    reader.onload = function () {
        var lines = reader.result.split("\r\n"), tempstr = "", questionNow = new Question();
        var version = parseInt(lines[0].substring(2));
        if (isNaN(version))
            console.error("Version is not a number.");
        for (var i = 1; i < lines.length; i++) {
            var l = lines[i];
            if (l.length === 0)
                break;
            var first_ch = l[0];
            l = l.substring(2, l.length);
            if (first_ch == '-')
                tempstr += l;
            else if (first_ch == 'q')
                tempstr = l;
            else if (first_ch == 'c') {
                questionNow.set_quesText(tempstr);
                tempstr = l;
            }
            else if (first_ch == 'o') {
                questionNow.set_corrAns(tempstr);
                tempstr = l;
            }
            else if (first_ch == 'e') {
                var arr = tempstr.split(" ");
                if (arr.length < 2) {
                    console.error("Length should be not less than 2.");
                    continue;
                }
                questionNow.set_score(parseInt(arr[0]));
                questionNow.set_passed((arr[1] == '0') ? false : true);
                questions.push(questionNow);
                questionNow = new Question();
                tempstr = "";
            }
        }
    };
}
