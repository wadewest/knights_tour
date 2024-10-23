
import Queue from "./queue.ts";
import TileSet from "./tileset.ts";
import Path from "./path.ts";
import extendWorker from "./worker_utils.ts";
import {boardLookup, reverseBoardLookup, nextPossibleMoves} from "./chess_utils.ts";

const start = "a1";
const rows = 8;
const cols = 8;

const path_queue = new Queue();

const tiles = new TileSet(rows, cols);
const path = (new Path(tiles)).push(start);
const worker_url = new URL("./worker.ts", import.meta.url);
const worker = new Worker(worker_url.href, {type: "module"});
extendWorker(worker);
worker.addEventListener("error", e => console.log(e));

worker.handleReply("init", (initialized) => {
	if(initialized)
	{
		worker.sendCommand("enqueue", {path: path});
		console.log("Initialized worker");
	}
});

worker.handleReply("enqueue", (data) => {
	if(data.size > 0)
	{
		worker.sendCommand("start");
	}
});

const complete_paths = new Array();
const dead_paths = new Array();
let current_queue_size = 0;
worker.addEventListener("message", e => {
	if(!!e.data.type)
	{
		switch(e.data.type)
		{
			case "new_path":
				complete_paths.push(e.data.path);
				break;
			case "dead_path":
				dead_paths.push(e.data.path);
				break;
			case "enqueue":
				for(let p of e.data.paths)
				{
					current_queue_size = e.data.size;
					worker.sendCommand("enqueue", {path: p});
				}
				break;
			default:
				console.log("Unknown type: "+e.data.type);
		}
		console.log("Completed: "+complete_paths.length+", Dead Ends: "+dead_paths.length+", Queue Size: "+current_queue_size);
	}
});

worker.sendCommand("init");

