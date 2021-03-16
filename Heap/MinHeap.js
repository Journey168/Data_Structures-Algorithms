import { Compare, defaultCompare } from '../util'
function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp
}

export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  // 左侧节点的位置
  getLeftIndex(index) {
    return 2 * index + 1
  }
  // 右侧节点的位置
  getRightIndex(index) {
    return 2 * index + 2
  }
  // 父节点的位置 
  getParentIndex(index) {
    if (index === 0) {
      return undefined
    }
    return Math.floor((index - 1) / 2)
  }

  // 插入节点
  insert(value) {
    if (value != null) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
      swap(this.heap, parent, index)
      index = parent;
      parent = this.getParentIndex(index)
    }
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  // 导出最小值
  extract() {
    if (this.isEmpty()) {
      return undefined
    }
    if (this.size() === 1) {
      return this.heap.shift()
    }
    const removeValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removeValue;
  }
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size()
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left
    }
    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
}