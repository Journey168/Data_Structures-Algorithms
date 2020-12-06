const { defaultToString } = require("../util");

class ValuePari {
  constructor(key, value) {
    this.key = key;
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {}
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
      const positoin = this.hashCode(key);
      this.table[positoin] = new ValuePari(key, value);
      return true
    }
    return false
  }

  get(key) {
    const valuePari = this.table[this.hashCode(key)];
    return valuePari == null ? undefined : valuePari.value;
  }

  remove(key) {
    const hash = this.hashCode(key);
    const valuePari = this.table[hahs];
    if (valuePari != null) {
      delete this.table[hash]
      return true
    }
    return false
  }
}

