import { Compare, defaultCompare } from '../../util'
import { Node } from '../models'

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  // 插入节点
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key)
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 遍历树
  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback)
      this.callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
    }
  }
  // 后续遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
      callback(node.key)
    }
  }

  min() {
    return this.minNode(this.root)
  }
  mixNode(node) {
    let current = node.left;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current.key;
  }

  max() {
    return this.maxNode(this.root)
  }
  maxNode(node) {
    let current = node.right;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current.key
  }

  search(key) {
    return this.searchNode(this.root, key)
  }
  searchNode(node, key) {
    if (node == null) {
      return false
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    return this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 第一种情况
      if (node.left == null && node.right == null) {
        node = null;
        return node
      }
      // 第二种情况
      if (node.left == null) {
        node = node.right;
        return node
      } else if (node.right == null) {
        node = node.left
        return node
      }
      // 第三种情况
      const aux = this.mixNode(node.right)
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}