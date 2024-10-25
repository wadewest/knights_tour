
import extendWorker from "./worker_utils.ts";

export default class WorkerPool extends Map<Worker, any>
{

  #gen;

  constructor()
  {
    super();
    this.#gen = this.generator();
  }

  *generator()
  {
    while(true) for(let w of this.keys()) yield w;
  }

  add(worker: Worker): this
  {
    this.set(worker, {});
    return this;
  }

  next(): Worker
  {
    return this.#gen.next().value as Worker;
  }

}

