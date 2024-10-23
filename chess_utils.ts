
export function nextPossibleMoves(tile, rows, cols)
{
  let result = new Set();
  let [row, col] = reverseBoardLookup(tile);
  for(let row_offset of [-2, -1, 1, 2])
  {
    let next_row = row+row_offset;
    if(next_row >= 0 && next_row < rows)
    {
      for(let col_offset of [-2, -1, 1, 2])
      {
        if((row_offset+col_offset)%2==0) continue;
        let next_col = col+col_offset
        if(next_col >= 0 && next_col < cols)
        {
          result.add(boardLookup(next_row, next_col));
        }
      }
    }
  }
  return result;
}

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

