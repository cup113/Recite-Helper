var questions: Question[] = [],
indexesNow: number[] = [];

class Question {
	private quesText: string; // Question Text
	private corrAns: string; // Correct Answer
	private score: number; // Score (Common Test)
	private passed: boolean; // if passed (Last Test)
	private answeredTimes: number;
	constructor(_quesText: string = "", _corrAns: string = "", _score: number = 0, _passed: boolean = false, _answeredTimes: number = 0) {
		this.quesText = _quesText;
		this.corrAns = _corrAns;
		this.score = _score;
		this.passed = _passed;
		this.answeredTimes = _answeredTimes;
	}
	public get_quesText() {return this.quesText;}
	public get_corrAns() {return this.corrAns;}
	public get_score() {return this.score;}
	public get_passed() {return this.passed;}
	public get_answeredTimes() {return this.answeredTimes;}
	public set_quesText(_quesText: string) {
		this.quesText = _quesText;
	}
	public set_corrAns(_corrAns: string) {
		this.corrAns = _corrAns;
	}
	public set_score(_score: number) {
		this.score = _score;
	}
	public set_passed(_passed: boolean) {
		this.passed = _passed;
	}
	public set_answeredTimes(_answeredTimes: number) {
		this.answeredTimes = _answeredTimes;
	}

	public add_score(scoreAdd: number) {
		this.set_score(this.score + scoreAdd);
	}
}