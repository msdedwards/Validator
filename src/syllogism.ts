import { Proposition } from './proposition';
import { Term } from './term';
import { Mood } from './mood';
import { Figure } from './figure';


export class Syllogism {
    public firstProposition: Proposition;
    public secondProposition: Proposition;
    public conclusion: Proposition;
    public majorTerm: Term
    public minorTerm: Term;
    public middleTerm: Term;
    public name: string;
    public isValid: boolean;
    public brokenRules: number[];
    public cssClass: string;
    public expanded = false;

    constructor(public id: number, public firstMood: Mood, public secondMood: Mood, public conclusionMood: Mood, public figure: Figure) {
        this.majorTerm = new Term('P');
        this.minorTerm = new Term('S');
        this.middleTerm = new Term('M');
        switch (figure) {
            case Figure.one:
                this.firstProposition = new Proposition(firstMood, this.middleTerm, this.majorTerm);
                this.secondProposition = new Proposition(secondMood, this.minorTerm, this.middleTerm);
            break;
            case Figure.two:
                this.firstProposition = new Proposition(firstMood, this.majorTerm, this.middleTerm);
                this.secondProposition = new Proposition(secondMood, this.minorTerm, this.middleTerm);
            break;
            case Figure.three:
                this.firstProposition = new Proposition(firstMood, this.middleTerm, this.majorTerm);
                this.secondProposition = new Proposition(secondMood, this.middleTerm, this.minorTerm);
            break;
            case Figure.four:
                this.firstProposition = new Proposition(firstMood, this.majorTerm, this.middleTerm);
                this.secondProposition = new Proposition(secondMood, this.middleTerm, this.minorTerm);
            break;
        }
        this.conclusion = new Proposition(conclusionMood, this.minorTerm, this.majorTerm, true);
        this.brokenRules = this.getBrokenRules();
        this.isValid = !this.brokenRules.length;
        this.name = this.getName();
    }

    public getName(): string {
        return `${this.firstMood}${this.secondMood}${this.conclusionMood}-${this.figure}`;
    }

    public getBrokenRules(): number[] {
        let rules = [];
        // first rule broken
        if ((this.firstProposition.isNegative) && (this.secondProposition.isNegative)) rules.push(1);
        // second rule broken
        if ((this.firstProposition.isNegative || this.secondProposition.isNegative) && !this.conclusion.isNegative) rules.push(2);
        // third rule broken
        if ((this.firstProposition.isUniversal && this.secondProposition.isUniversal) && !this.conclusion.isUniversal) rules.push(3);
        // fourth rule broken
        if (!this.middleTerm.isDistributed) rules.push(4);
        // fifth rule broken
        if((this.majorTerm.isDistributedInConclusion && !this.majorTerm.isDistributed) || (this.minorTerm.isDistributedInConclusion && !this.minorTerm.isDistributed)) rules.push(5);
        return rules;
    }
}