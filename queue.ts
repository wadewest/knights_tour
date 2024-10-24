export default class Queue
{

  front_index = 0n;
  back_index = 0n;
  items: Map<bigint, any>;

	constructor()
	{
		this.items = new Map();
	}

	push(item: any)
	{
		this.items.set(this.back_index, item);
		this.back_index++;
		return this;
	}

	pop()
	{
		const item = this.peek();
		if(!!item)
		{
			this.items.delete(this.front_index);
			this.front_index++;
			return item;
		}
		return null;
	}

	peek()
	{
		return this.items.get(this.front_index);
	}

	get size()
	{
		return this.items.size;
	}

}

