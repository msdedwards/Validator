import { Term } from "./term";
import { Mood } from "./mood";

export class Proposition {
    isNegative = false;
    isUniversal = false;
    quantifier: string;
    copula: string;
    description: string;
    constructor(public mood: Mood, public subject: Term, public predicate: Term, public isConclusion = false) {
        this.copula = "is";
        switch (mood) {
            case Mood.A:
                this.quantifier = "All";
                this.isUniversal = true;
                break;
            case Mood.E:
                this.quantifier = "No";
                this.isUniversal = true;
                this.isNegative = true;
                break;
            case Mood.I:
                this.quantifier = "Some";
                break;
            case Mood.O:
                this.quantifier = "Some";
                this.copula = "is not";
                this.isNegative = true;
                break;
        }
        if (isConclusion) {
            subject.isDistributedInConclusion = this.isUniversal;
            predicate.isDistributedInConclusion = this.isNegative;
        } else {
            if (this.isUniversal) {
                subject.isDistributed = true;
            }
            if (this.isNegative) {
                predicate.isDistributed = true;
            }
        }
        this.description = `${this.quantifier} ${this.subject.name} ${this.copula} ${this.predicate.name}`
    }
}
