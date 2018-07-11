import { Term, MajorMinorTerm } from "validator/models/term";

export enum Mood {
    A = 'A',
    E = 'E',
    I = 'I',
    O = 'O'
};
export class Proposition {
    isNegative: boolean;
    isUniversal: boolean;
    quantifier: string;
    copula: string;
    description: string;
    constructor(public mood: Mood, public subject: Term, public predicate: Term, public  isConclusion: boolean) {
        this.copula = "is";
        switch (mood) {
            case Mood.A:
                this.quantifier = "All";
                this.isUniversal = true;
                this.isNegative = false;
                if (isConclusion) {
                    (subject as MajorMinorTerm).isDistributedInConclusion = true;
                    (predicate as MajorMinorTerm).isDistributedInConclusion = false;
                } else {
                    subject.isDistributed = true;
                }
                break;
            case Mood.E:
                this.quantifier = "No";

                this.isUniversal = true;
                this.isNegative = true;
                if (isConclusion) {
                    (subject as MajorMinorTerm).isDistributedInConclusion = true;
                    (predicate as MajorMinorTerm).isDistributedInConclusion = true;
                } else {
                    subject.isDistributed = true;
                    predicate.isDistributed = true;
                }
                break;
            case Mood.I:
                this.quantifier = "Some";
                this.isUniversal = false;
                this.isNegative = false;
                if (isConclusion) {
                    (subject as MajorMinorTerm).isDistributedInConclusion = false;
                    (predicate as MajorMinorTerm).isDistributedInConclusion = false;
                }
                break;
            default: //Mood.O
                this.quantifier = "Some";
                this.copula = "is not";
                this.isUniversal = false;
                this.isNegative = true;
                if (isConclusion) {
                    (subject as MajorMinorTerm).isDistributedInConclusion = false;
                    (predicate as MajorMinorTerm).isDistributedInConclusion = true;
                } else {
                    this.predicate.isDistributed = true;
                }
        }
        this.description = `${this.quantifier} ${this.subject.name} ${this.copula} ${this.predicate.name}`
    }
}
