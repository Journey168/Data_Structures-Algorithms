import LinkedList from './LinkedList'
import { equalsDefaultFn } from '../util'
import { Node } from './models/linked-list-models'

export default class CircularLinkedList extends LinkedList {
  constructor(equalsFn = equalsDefaultFn) {
    super(equalsFn);
  }

  // 插入方法
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = this.head;
          const current = this.getElementAt(this.size());
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true
    }
    return false
  }

  // 移除任意位置的元素
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size());
          this.head = this.head.next;
          current.next = this.head;
          current = removed
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current;
    }
    return undefined;
  }
}
