export default class Queue
{

	constructor()
	{
		this.front_index = 0n;
		this.back_index = 0n;
		this.items = new Map();
	}

	push(item)
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

}

