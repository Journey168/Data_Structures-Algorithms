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

  // 比loselose稍好的散列函数
  djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }
  // 散列函数
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

