import { defaultToString } from '../util'


class ValuePari {
  constructor(key, value) {
    this.key = key;
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {};
  };

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePari(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false
  }

  get(key) {
    const valuePari = this.table[this.toStrFn(key)];
    return valuePari == null ? undefined : valuePari.value;
  }

  keyValues() {
    return Object.values(this.table)
  }

  keys() {
    return this.keyValues().map(valuePari => valuePari.key)
  }

  values() {
    return this.keyValues().map(valuePari => valuePari.value)
  }

  forEach(callbackFn) {
    const valueParis = this.keyValues()
    for (let i = 0; i < valuePari.length; i++) {
      const result = callbackFn(valuePari[i].key, valuePari[i].value);
      if (result === false) {
        break
      }
    }
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const valueParis = this.keyValues()
    let objString = `${valueParis[0].toString()}`
    for (let i = 1; i < valueParis.length; i++) {
      objString = `${objString},${valueParis[i].toString()}`
    }
    return objString;
  }
}