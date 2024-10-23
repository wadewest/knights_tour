
export function reverseBoardLookup(tile)
{
  let arr = tile.split('');
  let col = arr.shift().codePointAt(0) - 97;
  let row = parseInt(arr.join('')) - 1;
  return [row, col];
}

export function boardLookup(row, col)
{
  let str = "";
  str += String.fromCharCode(col+97);
  str += (row+1);
  return str;
}

