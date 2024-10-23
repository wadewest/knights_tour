export default function extendWorker(worker) 
{
	return Object.assign(worker, (worker === globalThis) ? receiver : controller);
}

const controller = {

	sendCommand(command, data = {})
	{
		this.postMessage({command: command, data: data});
		return this;
	},

	handleReply(command, handler)
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

	handleCommand(command, handler)
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

	sendReply(command, data = {})
	{
		postMessage({command: command, data: data});
		return self;
	},

};

