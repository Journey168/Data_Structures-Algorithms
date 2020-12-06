import { defaultToString } from "../util"
import LinkedList from '../LinkedList/LinkedList'

class ValuePari {
  constructor(key, value) {
    this.key = key;
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 7;
  }
  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePari(key, value));
      return true
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let currrent = linkedlist.getHead();
      while (currrent != null) {
        if (currrent.element.key === key) {
          linkedList.remove(currrent.element)
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true
        }
        currrent = currrent.next;
      }
    }
    return false;
  }
}