
// 双端队列
class Deque {
  constructor() {
    this.count = 0;
    this.lowestcount = 0;
    this.items = {};
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.count = 0;
    this.lowestcount = 0;
    this.items = {};
  }
  size() {
    return this.count - this.lowestcount
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestcount > 0) {
      this.lowestcount--;
      this.items[this.lowestcount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  removeFront() {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestcount];
    delete this.items[this.lowestcount];
    this.lowestcount++;
    return result;
  }
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count]
    return result
  }
  peekFront() {
    if (this.isEmpty()) {
      return
    }
    return this.items[this.lowestcount];
  }
  peekBack() {
    if (this.isEmpty()) {
      return
    }
    return this.items[this.count - 1];
  }
  toString() {
    if (this.isEmpty()) {
      return ""
    }
    let objString = `${this.items[this.lowestcount]}`;
    for (let i = this.lowestcount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}