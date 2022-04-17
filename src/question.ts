var questions: Question[] = [],
crscore: number = 15, // Common test required score
strictk: number = 7; // strict index (0~10)

class Answer {
	public content: string;
	public similarity: number;
	constructor(_content: string = "", _simi: number) {
		this.content = _content;
		this.similarity = _simi;
	}
}

class Question {
	public quesText: string; // Question Text
	public corrAns: string; // Correct Answer
	private score: number; // Score (Common Test)
	private passed: boolean; // if passed (Last Test)
	private answeredTimes: number;
	public faults: Answer[];
	constructor(_quesText: string = "", _corrAns: string = "", _score: number = 0, _passed: boolean = false) {
		this.quesText = _quesText;
		this.corrAns = _corrAns;
		this.score = _score;
		this.passed = _passed;
	}
}