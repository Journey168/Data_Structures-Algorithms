class Set {
  constructor() {
    this.items = {}
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  add(element) {
    if (!this.items[element]) {
      this.items[element] = element
      return true
    }
    return false
  }

  delete(element) {
    if (this.items[element]) {
      delete this.items[element]
      return true
    }
    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  values() {
    return Object.values(this.items)
  }

  // 并集
  union(otherSet) {
    const unionSet = new Set()

    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }

    values = otherSet.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }

    return unionSet;
  }

  // 交集
  intersection(otherSet) {
    const intersectionSet = new Set()

    const values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }
    return intersectionSet
  }
  intersection1() {
    const intersectionSet = new Set()
    const values = this.values()
    const otherValues = this.values()
    let biggerSet = values
    let smallSet = otherValues
    if (biggerSet.length < smallSet.length) {
      biggerSet = otherValues;
      smallSet = values
    }
    smallSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value)
      }
    })
    return intersectionSet
  }

  // 差集
  difference(otherSet) {
    const differenceSet = new Set()
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  // 判断是否是子集
  isSubsetOf(otherSet){
    if(this.size()>otherSet.size()){
      return false
    }
    let isSubset = true;
    this.values().every(value=>{
      if(!otherSet.has(value)){
        isSubset = false
        return false
      }
      return true
    })
    return isSubset
  }
}


