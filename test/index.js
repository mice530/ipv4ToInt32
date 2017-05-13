const ipv4toInt32 = require('../index');
const assert = require('assert');

describe('ipv4toInt32', () => {
  it('should handle regular input correctly', () => {
    assert.strictEqual( ipv4toInt32('172.168.5.1'), 2896692481, 'test case 172.168.5.1 failed' );

    assert.strictEqual( ipv4toInt32('0.0.0.0'), 0 );

    assert.strictEqual( ipv4toInt32('255.255.255.255'), 4294967295, 'test case 172.168.5.1 failed' );
  });

  it('should handle spaces correctly', () => {
    assert.strictEqual( ipv4toInt32('172 .168.5.1'), 2896692481, 'test case 172.168.5.1 failed' );

    assert.strictEqual( ipv4toInt32('172. 168.5.1'), 2896692481, 'test case 172.168.5.1 failed' );

    assert.strictEqual( ipv4toInt32('172.168 . 5.1'), 2896692481, 'test case 172.168.5.1 failed' );
  });

  it('should report error on invalid input', () => {
    const errMsg = 'invalid input';

    // unexpect space
    assert.strictEqual( ipv4toInt32('17 2.168.5.1'), errMsg, 'test case 17 2.168.5.1 failed' );

    // unexpect char
    assert.strictEqual( ipv4toInt32('172.168.f5.1'), errMsg, 'test case 172.168.f5.1 failed' );

    // unexpect numbers
    assert.strictEqual( ipv4toInt32('172.1668.5.1'), errMsg, 'test case 172.1668.5.1 failed' );

    // unexpect dot
    assert.strictEqual( ipv4toInt32('172..1668.5.1'), errMsg, 'test case 172..1668.5.1 failed' );

    // incorrect format
    assert.strictEqual( ipv4toInt32('1.172.1668.5.1'), errMsg, 'test case 1.172.1668.5.1 failed' );
    assert.strictEqual( ipv4toInt32('168.5.1'), errMsg, 'test case 168.5.1 failed' );
    assert.strictEqual( ipv4toInt32('.68.5.1'), errMsg, 'test case .68.5.1 failed' );
    assert.strictEqual( ipv4toInt32('172.68.256.1'), errMsg, 'test case 172.68.256.1 failed' );


  });
});