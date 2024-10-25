
export default function extendWorker(worker: any|null) 
{
	return Object.assign(worker, (worker === globalThis) ? receiver : controller);
}

const controller = {

	sendCommand(command: string, data = {})
	{
		this.postMessage({command: command, data: data});
		return this;
	},

	handleReply(command: string, handler: Function)
	{
		this.addEventListener("message", function(e)
		{
			if(!!e.data.command && e.data.command == command)
			{
				handler(e.data.data || {});
			}
		});
		return this;
	},

};

const receiver = {

	handleCommand(command: string, handler: Function)
	{
		self.addEventListener("message", function(e)
		{
			if(!!e.data.command && e.data.command == command)
			{
				handler(e.data.data || {});
			}
		});
		return self;
	},

	sendReply(command: string, data = {})
	{
		postMessage({command: command, data: data});
		return self;
	},

};

