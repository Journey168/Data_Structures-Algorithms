import { defaultEquals } from '../util/index.js';
import { Node } from './models/linked-list-models';
export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  // 添加一个元素
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node
    }
    this.count++
  }

  // 获取指定元素
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // 删除指定位置的元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        this.head = current.next;
      } else {
        let previous = this.getElementAt(index - 1);
        // for (let i = 0; i < index; i++) {
        //   previous = current;
        //   current = current.next
        // }
        // 将previous 与 current的下一项链接起来  跳过current 从而移除它
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element
    }
    return undefined
  }

  // 插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++
      return true
    }
    return false
  }

  // 查询元素的位置
  indexOf(element){
    let curretn = this.head;
    for(let i=0; i<this.count&&current!=null;i++){
      if(this.equalsFn(element,current.element)){
        return i
      }
      current = current.next
    }
    return -1;
  }

  // 删除元素
  remove(element){
    const index = this.indexOf(element);
    return this.removeAt(index)
  }

  // 数据大小
  size(){
    return this.count
  }

 // 是否为空
 isEmpty(){
   return this.size() === 0
 } 

  // 获取头部元素
  getHead(){
    return this.head
  }

  // toString方法
  toString(){
    if(this.head==null){
      return ''
    }

    let objString = `${this.head.element}`
    let current = this.head.next
    for(let i=1;i<this.size()&&current!=null;i++){
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }

  
}
