const ipv4toInt32 = require('../index');
const assert = require('chai').assert;

describe('ipv4toInt32', () => {
  it('should handle regular input correctly', () => {
    assert.equal( ipv4toInt32('172.168.5.1'), 2896692481 );

    assert.equal( ipv4toInt32('0.0.0.0'), 0 );

    assert.equal( ipv4toInt32('255.255.255.255'), 4294967295 );
  });

  it('should handle spaces correctly', () => {
    assert.equal( ipv4toInt32('172 .168.5.1'), 2896692481 );

    assert.equal( ipv4toInt32('172. 168.5.1'), 2896692481 );

    assert.equal( ipv4toInt32('172.168 . 5.1'), 2896692481 );
  });

  it('should report error on invalid input', () => {
    const errMsg = 'invalid input';

    // unexpect space
    assert.equal( ipv4toInt32('17 2.168.5.1'), errMsg );

    // unexpect char
    assert.equal( ipv4toInt32('172.168.f5.1'), errMsg );

    // unexpect numbers
    assert.equal( ipv4toInt32('172.1668.5.1'), errMsg );

    // unexpect dot
    assert.equal( ipv4toInt32('172..1668.5.1'), errMsg );

    // incorrect format
    assert.equal( ipv4toInt32('1.172.1668.5.1'), errMsg );
    assert.equal( ipv4toInt32('168.5.1'), errMsg );
    assert.equal( ipv4toInt32('.68.5.1'), errMsg );
    assert.equal( ipv4toInt32('172.68.256.1'), errMsg );


  });
});