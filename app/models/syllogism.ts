import { Proposition, Mood } from "validator/models/proposition";
import { MajorMinorTerm, MiddleTerm } from "validator/models/term";

export class Syllogism {
    public firstProposition: Proposition;
    public secondProposition: Proposition;
    public conclusion: Proposition;
    public majorTerm: MajorMinorTerm
    public minorTerm: MajorMinorTerm;
    public middleTerm: MiddleTerm;
    public name: string;
    public isValid: boolean;
    public brokenRule: number;
    public description: string;
    public cssClass: string;

    constructor(public id: number, public firstMood: Mood, public secondMood: Mood, public conclusionMood: Mood, public figure: number) {
        this.name = this.getName();
        this.majorTerm = new MajorMinorTerm("P");
        this.minorTerm = new MajorMinorTerm("S");
        this.middleTerm = new MiddleTerm("M");
        switch (figure) {
            case 1:
                this.firstProposition = new Proposition(firstMood, this.middleTerm, this.majorTerm, false);
                this.secondProposition = new Proposition(secondMood, this.minorTerm, this.middleTerm, false);
                break;
            case 2:
                this.firstProposition = new Proposition(firstMood, this.majorTerm, this.middleTerm, false);
                this.secondProposition = new Proposition(secondMood, this.minorTerm, this.middleTerm, false);
                break;
            case 3:
                this.firstProposition = new Proposition(firstMood, this.middleTerm, this.majorTerm, false);
                this.secondProposition = new Proposition(secondMood, this.middleTerm, this.minorTerm, false);
                break;
            default:
                this.firstProposition = new Proposition(firstMood, this.majorTerm, this.middleTerm, false);
                this.secondProposition = new Proposition(secondMood, this.middleTerm, this.minorTerm, false);
                break;
        }
        this.conclusion = new Proposition(conclusionMood, this.minorTerm, this.majorTerm, true);
        this.brokenRule = this.getBrokenRule();
        this.isValid = !!this.brokenRule;
        this.description = this.write();
        this.cssClass = `${this.firstMood}${this.secondMood}${this.conclusionMood}${this.figure}`;
    }

    public getName(): string {
        return this.firstMood.toString() + this.secondMood.toString() + this.conclusionMood.toString() + "-" + this.figure;
    }

    public getBrokenRule(): number {
        if ((this.firstProposition.isNegative) && (this.secondProposition.isNegative)) {
            //first rule broken
            return 1;
        }
        if ((this.firstProposition.isNegative || this.secondProposition.isNegative) && !this.conclusion.isNegative) {
            //second rule broken
            return 2;
        }
        if ((this.firstProposition.isUniversal && this.secondProposition.isUniversal) && !this.conclusion.isUniversal) {
            //third rule broken
            return 3;
        }
        if (!this.middleTerm.isDistributed) {
            //fourth rule broken
            return 4;
        }
        if ((!(this.majorTerm as MajorMinorTerm).isDistributed && (this.majorTerm as MajorMinorTerm).isDistributedInConclusion) || (!(this.minorTerm as MajorMinorTerm).isDistributed && (this.minorTerm as MajorMinorTerm).isDistributedInConclusion)) {
            //fifth rule broken
            return 5;
        }
        return 0;
    }
    public write(): string
    {
        return `
        ${this.firstProposition.description}
        ${this.secondProposition.description}
        ${this.conclusion.description}

        `;
    }
}