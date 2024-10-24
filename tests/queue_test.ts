
import {assertEquals} from "jsr:@std/assert";
import Queue from "../queue.ts";

Deno.test("can push and peek", () => {
  let q = new Queue();
  let i = "q";
  assertEquals(q.push(i), q);
  assertEquals(q.peek(), i);
});

Deno.test("can pop an item", () => {
  let q = new Queue();
  let i = "q";
  q.push(i);
  assertEquals(q.pop(), i);
});

Deno.test("can 'get' size", () => {
  let q = new Queue();
  assertEquals(q.size, 0);
  q.push("q");
  assertEquals(q.size, 1);
});
