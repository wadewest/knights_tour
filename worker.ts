
import Queue from "./queue.ts";
import Path from "./path.ts";
import extendWorker from "./worker_utils.ts";
import {boardLookup, reverseBoardLookup, nextPossibleMoves} from "./chess_utils.ts";

extendWorker(self);

let initialized = false;
let start = "a1";
let rows = 8;
let cols = 8;
let path_queue = null;
let timer = null;

handleCommand("die", () => close());
handleCommand("ping", () => {
	sendReply("ping", "pong");
	console.log("pong")
});

handleCommand("init", (data) => {
  if(!!data.start) start = data.start;
  if(!!data.rows) rows = data.rows;
  if(!!data.cols) cols = data.cols;
  path_queue = new Queue();
	if(!!timer) clearInterval(timer);
	timer = null;
  initialized = true;
	sendReply("init", initialized);
});

handleCommand("enqueue", (data) => {
	if(!!data.path) 
	{
		path_queue.push(new Path(data.path));
		sendReply("enqueue", {size: path_queue.size()});
		return;
	}
	sendReply("enqueue");
});

handleCommand("step", () => {
	updateLoop()
	sendReply("step");
});

handleCommand("start", () => {
	if(!timer) timer = setInterval(updateLoop, 0);
});

handleCommand("stop", () => {
	if(!!timer) clearInterval(timer);
	timer = null;
});

function updateLoop()
{
  if(!!initialized && !!path_queue.peek())
  {
    processMove(path_queue.pop());
  }
}

function processMove(path)
{
  if(path.remaining.size == 0)
  {
    path.status = "complete";
    postMessage({
      type: "new_path",
      path: path
    });
    return;
  }
  let next_moves = nextPossibleMoves(path.head(), rows, cols);
  next_moves = next_moves.intersection(path.remaining);
  if(next_moves.size == 0)
  {
    path.status = "dead";
    postMessage({
      type: "dead_path",
      path: path
    });
    return;
  }
  postMessage({
    type: "enqueue",
		size: path_queue.size,
    paths: next_moves.values().map(n => {
      return path.cloneTo(n);
    }).toArray()
  });
}

