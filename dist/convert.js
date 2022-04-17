/// <reference path="./question.ts"/>
/** Read .txt file into `questions`
 * T(O(N)), M(O(3N))
 * @param textfile file object (extension: txt)
 */
function read_txt(textfile) {
    var reader = new FileReader();
    reader.readAsText(textfile);
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
        questions.push(new Question(t.substring(0, firstlf - 1), t.substring(firstlf + 1, t.length)));
    }
}
/** Generate .rhp file from `questions`.
 * T(O(N)), M(O(2N))
 * @returns Blob Object
 */
function generate_rhp() {
    var result = "";
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
        result += "q " + handle_lf(q.quesText) + "\r\n";
        result += "c " + handle_lf(q.corrAns) + "\r\n";
        result += "o " + q.score.toString() + " " + (q.passed ? "1" : "0") + "\r\n";
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
    var lines = reader.result.split("\r\n"), tempstr = "", questionNow = new Question();
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var l = lines_1[_i];
        if (l.length === 0)
            break;
        var first_ch = l[0];
        l = l.substring(2, l.length);
        if (first_ch == '-')
            tempstr += l;
        else if (first_ch == 'q')
            tempstr = l;
        else if (first_ch == 'c') {
            questionNow.quesText = tempstr;
            tempstr = l;
        }
        else if (first_ch == 'o') {
            questionNow.corrAns = tempstr;
            tempstr = l;
        }
        else if (first_ch == 'e') {
            tempstr = "";
            var arr = l.split(" ");
            if (arr.length < 2) {
                console.error("Length should be not less than 2.");
                continue;
            }
            questionNow.score = parseInt(arr[0]);
            questionNow.passed = (arr[1] == '0') ? false : true;
            questions.push(questionNow);
        }
    }
}
