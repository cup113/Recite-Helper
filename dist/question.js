var questions = [], crscore = 15, // Common test required score
strictk = 7; // strict index (0~10)
var Answer = /** @class */ (function () {
    function Answer(_content, _simi) {
        if (_content === void 0) { _content = ""; }
        this.content = _content;
        this.similarity = _simi;
    }
    return Answer;
}());
var Question = /** @class */ (function () {
    function Question(_quesText, _corrAns, _score, _passed) {
        if (_quesText === void 0) { _quesText = ""; }
        if (_corrAns === void 0) { _corrAns = ""; }
        if (_score === void 0) { _score = 0; }
        if (_passed === void 0) { _passed = false; }
        this.quesText = _quesText;
        this.corrAns = _corrAns;
        this.score = _score;
        this.passed = _passed;
    }
    return Question;
}());
