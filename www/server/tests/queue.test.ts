import Queue from "../src/core/Queue.js";
import Player from "../src/core/Player.js";

test("Join and remove in queue", () => {
  const queue = new Queue();

  queue.join(new Player("0", "Hello", "X"));

  expect(queue.queue.length).toBe(1);

  queue.remove(new Player("0", "Hello", "X"));

  expect(queue.queue.length).toBe(0);
});
