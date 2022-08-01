"use strict";
var questions = [], indexesNow = [];
class Question {
    constructor(_quesText = "", _corrAns = "", _score = 0, _passed = false, _answeredTimes = 0) {
        this.quesText = _quesText;
        this.corrAns = _corrAns;
        this.score = _score;
        this.passed = _passed;
        this.answeredTimes = _answeredTimes;
    }
    get_quesText() { return this.quesText; }
    get_corrAns() { return this.corrAns; }
    get_score() { return this.score; }
    get_passed() { return this.passed; }
    get_answeredTimes() { return this.answeredTimes; }
    set_quesText(_quesText) {
        this.quesText = _quesText;
    }
    set_corrAns(_corrAns) {
        this.corrAns = _corrAns;
    }
    set_score(_score) {
        this.score = _score;
    }
    set_passed(_passed) {
        this.passed = _passed;
    }
    set_answeredTimes(_answeredTimes) {
        this.answeredTimes = _answeredTimes;
    }
    add_score(scoreAdd) {
        this.set_score(this.score + scoreAdd);
    }
    add_answered() {
        this.set_answeredTimes(this.answeredTimes + 1);
    }
}
