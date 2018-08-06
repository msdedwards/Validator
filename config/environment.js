'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'validator',
    environment,
    moduleConfiguration: {
      types: {
        application: { definitiveCollection: 'main' },
        component: { definitiveCollection: 'components' },
        'component-test': { unresolvable: true },
        helper: { definitiveCollection: 'components' },
        'helper-test': { unresolvable: true },
        renderer: { definitiveCollection: 'main' },
        template: { definitiveCollection: 'components' },
        syllogism: { definitiveCollection: 'syllogisms' },
        mood: { definitiveCollection: 'moods' },
        proposition: { definitiveCollection: 'propositions' },
        term: { definitiveCollection: 'terms' },
        figure: { definitiveCollection: 'figures' }
      },
      collections: {
        main: {
          types: ['application', 'renderer']
        },
        components: {
          group: 'ui',
          types: ['component', 'component-test', 'template', 'helper', 'helper-test'],
          defaultType: 'component',
          privateCollections: ['utils']
        },
        styles: {
          group: 'ui',
          unresolvable: true
        },
        utils: {
          unresolvable: true
        },
        mood: { unresolvable: true },
        syllogism: { unresolvable: true },
        proposition: { unresolvable: true },
        term: { unresolvable: true },
        figure: { unresolvable: true }
      }
    }
  };

  return ENV;
};
