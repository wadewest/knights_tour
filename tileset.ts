
export default class TileSet extends Set
{

	constructor(rows = 8, cols = 8)
	{
		super();
		for(let i = 0; i < rows; i++)
		{
			for(let j = 0; j < cols; j++)
			{
				let tile = ""
				tile += String.fromCharCode(97+j);
				tile += (i+1).toString();
				this.add(tile);
			}
		}
	}

}

