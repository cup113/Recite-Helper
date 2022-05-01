var questions = [], crscore = 15, // Common test required score
strictk = 7; // strict index (0~10)
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
    Question.prototype.get_quesText = function () { return this.quesText; };
    Question.prototype.get_corrAns = function () { return this.corrAns; };
    Question.prototype.get_score = function () { return this.score; };
    Question.prototype.get_passed = function () { return this.passed; };
    Question.prototype.get_answeredTimes = function () { return this.answeredTimes; };
    Question.prototype.get_faults = function () { return this.faults; };
    Question.prototype.set_quesText = function (_quesText) {
        this.quesText = _quesText;
    };
    Question.prototype.set_corrAns = function (_corrAns) {
        this.corrAns = _corrAns;
    };
    Question.prototype.set_score = function (_score) {
        this.score = _score;
    };
    Question.prototype.set_passed = function (_passed) {
        this.passed = _passed;
    };
    Question.prototype.set_answeredTimes = function (_answeredTimes) {
        this.answeredTimes = _answeredTimes;
    };
    return Question;
}());
