
import {expect} from "jsr:@std/expect";
import WorkerPool from "../worker_pool.ts";

const worker_url = "data:text/javascript;base64,";

Deno.test("can make new pool", () => {
  let wp = new WorkerPool();
  expect(wp).toBeTruthy();
  expect(wp.constructor).toBe(WorkerPool);
});

Deno.test("has a map to store the pool", () => {
  let wp = new WorkerPool();
  expect(wp).toBeTruthy();
});

Deno.test("can add and remove a worker", () => {
  let worker = new Worker(worker_url, {type: "module"});
  let worker2 = new Worker(worker_url, {type: "module"});
  expect(worker.constructor).toBe(Worker);
  let wp = new WorkerPool();
  wp.add(worker);
  expect(wp.size).toBe(1);
  wp.add(worker2);
  expect(wp.delete(worker)).toBeTruthy();
  expect(wp.size).toBe(1);
});

Deno.test("can cycle through each worker", () => {
  let worker1 = new Worker(worker_url, {type: "module"});
  let worker2 = new Worker(worker_url, {type: "module"});
  let wp = new WorkerPool();
  wp.add(worker1);
  expect(wp.next()).toBe(worker1);
  expect(wp.next()).toBe(worker1);
  wp.add(worker2);
  expect(wp.next()).toBe(worker2);
  expect(wp.next()).toBe(worker1);
});

