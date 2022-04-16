var questions: Question[] = [];
class Question {
	public quesText: string; // Question Text
	public corrAns: string; // Correct Answer
	public score: number; // Score (Common Test)
	public cpassed: number; // if passed (Common Test)
	public lpassed: boolean; // if passed (Last Test)
	constructor(_quesText: string, _corrAns: string) {
		this.quesText = _quesText;
		this.corrAns = _corrAns;
	}
	
}