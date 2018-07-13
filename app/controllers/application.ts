import Controller from '@ember/controller';
import { Syllogism } from 'validator/models/syllogism';

export default class Application extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  actions = {
    expand(syllogism: Syllogism){
      syllogism.expanded = true;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
