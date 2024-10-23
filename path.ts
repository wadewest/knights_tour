
export default class Path
{

	constructor(obj)
	{
		this.status = "enroute"
		this.route = new Array();
		this.remaining = new Set();
		if(!obj) return;
		if(obj instanceof Set)
		{
			this.remaining = new Set(obj);
			return;
		}
		if(obj.constructor == this.constructor)
		{
			this.status = obj.status;
			this.route = new Array(...obj.route);
			this.remaining = new Set(obj.remaining);
			return;
		}
	}

	head()
	{
		if(this.route.length == 0) return null;
		return this.route[this.route.length-1];
	}

	push(tile)
	{
		this.route.push(tile);
		this.remaining.delete(tile);
		return this;
	}

	cloneTo(tile)
	{
		return (new this.constructor(this)).push(tile);
	}

}
