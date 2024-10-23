import Queue from "./queue.ts";
import TileSet from "./tileset.ts";
import Path from "./path.ts";
import {boardLookup, reverseBoardLookup} from "./chess_utils.ts";

const rows = 8;
const cols = 8;

const path_queue = new Queue();

const tiles = new TileSet(rows, cols);
const zero_path = new Path(tiles);


