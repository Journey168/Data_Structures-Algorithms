const Dictionary = require('../Dictionary/dictionary')

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = [] //顶点数量
    this.adjList = new Dictionary()  // 用于存放顶点对应的边
  }

  // 添加顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  // 添加边
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v)
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w)
    }
    this.adjList.get(v).push(w)
    if (!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }

  // 返回所有顶点
  getVertices() {
    return this.vertices
  }

  // 返回所有顶点对应的边、
  getAdjList() {
    return this.adjList
  }


  toString() {
    let s = ''
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `
      }
      s += '\n'
    }
    return s
  }
}

module.exports = Graph

// 测试代码
// const graph = new Graph()
// const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

// for (let i = 0; i < myVertices.length; i++) {
//   graph.addVertex(myVertices[i])
// }

// graph.addEdge('A', 'B')
// graph.addEdge('A', 'C')
// graph.addEdge('A', 'D')
// graph.addEdge('C', 'D')
// graph.addEdge('C', 'G')
// graph.addEdge('D', 'G')
// graph.addEdge('D', 'H')
// graph.addEdge('B', 'E')
// graph.addEdge('B', 'F')
// graph.addEdge('E', 'I')

// console.log(graph.toString())



