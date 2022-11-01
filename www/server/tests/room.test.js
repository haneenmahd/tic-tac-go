import Room from "../src/core/Room.js";
import generateId from "../src/utils/generateId.js";

test("Checks if a room has players", () => {
  const room = new Room();

  for (let i = 0; i < 20; i++) {
    room.addPlayer(generateId());
  }

  expect(room.players.length).toBe(2);
});

test("Add new move", () => {
  const room = new Room();

  room.addMove(0, "X");

  expect(room.squares[0]).toBe("X");
  expect(room.squares[1]).not.toBe("X");
});
