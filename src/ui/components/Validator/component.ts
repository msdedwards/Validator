import Component, { tracked } from '@glimmer/component';
import { Syllogism } from '../../../syllogism';
import { Mood } from '../../../mood';
import { Figure } from '../../../figure';

export default class Validator extends Component {
    @tracked currentSyllogism = null;
    @tracked expanded = false;
    toggle(syllogism: Syllogism) {
        this.currentSyllogism = syllogism;
        this.expanded = !this.expanded;
    }
    get syllogisms(){
        const figures = [1,2,3,4];
        let syllogisms = [];
        let id = 0;
        for (let mood1 in Mood) {
            for (let mood2 in Mood) {
                for (let mood3 in Mood) {
                    for (let figure of figures) {
                        syllogisms.push(new Syllogism(id++, mood1 as Mood, mood2 as Mood, mood3 as Mood, figure as Figure));
                    }
                }
            }
        }
        return syllogisms;
    }
}
