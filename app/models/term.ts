export class Term {
    public isDistributed = false;
    constructor(public name: string) {
        this.name = name || "No Name";
    }
}
export class MajorMinorTerm extends Term {
    public isDistributedInConclusion = false;
}
export class MiddleTerm extends Term {}
