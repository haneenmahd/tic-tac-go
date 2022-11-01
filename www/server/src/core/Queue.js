class Queue {
  constructor() {
    this.queue = [];
  }

  join(el) {
    this.queue.push(el);
  }

  remove(el) {
    const elIndex = this.queue.indexOf(el);

    this.queue.splice(elIndex, 1);
  }

  findRandom() {
    let randomIndex = Math.floor(Math.random() * this.queue.length);

    return this.queue[randomIndex];
  }
}

export default Queue;
