import svg from './helper';

const { module, test } = QUnit;

module('Helper: svg', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(svg([]), undefined);
  });
});
