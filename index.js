const ipv4toInt32 = (ipv4) => {
  const [DOT, SPACE, ZERO, NINE, ERR, MAX_BITS, PREFIX_BITS] = ['.', ' ', '0', '9', 'invalid input', 8, '00000000'];
  let [i, char, ret, dotCount] = [0, ipv4[0], '', 0];

  while(char){
    // get block string
    let [block, hasDigit, hasSpace] = ['', false, false];
    while( char && char !== DOT ){
      // unexpect space between digits
      if( hasDigit && hasSpace && !( char < ZERO || char > NINE ) ){
        return ERR;
      }

      // update digit & space state
      hasDigit = hasDigit || !( char < ZERO || char > NINE );
      hasSpace = char === SPACE;

      // iterate
      block += char;
      char = ipv4[++i];
    }

    // has next block
    if( char === DOT ){
      // extra dot found
      if( ++dotCount > 3 ){
        return ERR;
      }

      char = ipv4[++i];
    }

    // transform begins
    let decimal = parseInt(block, 10);
    if( Number.isNaN(decimal) ){
      // check illegal char or space inside digits
      return ERR;
    }

    let binaryStr = decimal.toString(2);
    if( binaryStr.length > MAX_BITS ){
      // exceed 8 bits
      return ERR;
    }

    ret += (PREFIX_BITS + binaryStr).slice(-8);
  }

  if( dotCount < 3 ){
    // incorrect format
    return ERR;
  }

  return parseInt(ret, 2);
};

module.exports = ipv4toInt32;