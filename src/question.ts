var questions: Question[] = [],
crscore: number = 15, // Common test required score
strictk: number = 7; // strict index (0~10)

class Question {
	private quesText: string; // Question Text
	private corrAns: string; // Correct Answer
	private score: number; // Score (Common Test)
	private passed: boolean; // if passed (Last Test)
	private answeredTimes: number;
	private faults: string[];
	constructor(_quesText: string = "", _corrAns: string = "", _score: number = 0, _passed: boolean = false) {
		this.quesText = _quesText;
		this.corrAns = _corrAns;
		this.score = _score;
		this.passed = _passed;
	}
	public get_quesText() {return this.quesText;}
	public get_corrAns() {return this.corrAns;}
	public get_score() {return this.score;}
	public get_passed() {return this.passed;}
	public get_answeredTimes() {return this.answeredTimes;}
	public get_faults() {return this.faults;}
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
}