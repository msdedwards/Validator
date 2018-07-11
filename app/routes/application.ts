import Route from '@ember/routing/route';
import {Mood} from '../models/proposition'
import {Syllogism} from '../models/syllogism';

export default class Application extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model() {
    let syllogisms = [];
    let figures = [1, 2, 3, 4];
    let id = 0;
    for(let mood1 in Mood) {
      for(let mood2 in Mood) {
        for(let mood3 in Mood) {
          for (let figure of figures) {
            syllogisms.push(new Syllogism(id++, mood1 as Mood, mood2 as Mood, mood3 as Mood, figure));
          }
        }
      }
    }
    return syllogisms;
  }
  // normal class body definition here
}
