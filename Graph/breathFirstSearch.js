const Graph = require('./graph')
const Queue = require('../Queue/Queue')
const Stack = require('../Stack')

// 初始化图
const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
console.log(graph.toString())

// 图的遍历  广度优先算法
const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initialzeColor = (vertices) => {
  const color = {}
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initialzeColor(vertices)
  const queue = new Queue()

  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        queue.enqueue(w)
      }
    }
    color[u] = Colors.BLACK
    if (callback) {
      callback(u)
    }
  }
}

const printVertex = value => {
  console.log('Visited vertex: ' + value)
}
breadthFirstSearch(graph, myVertices[0], printVertex)


// 利用BFS 广度优先寻找最短路径
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initialzeColor(vertices)
  const queue = new Queue()
  const distances = {}
  const predecessors = {}

  queue.enqueue(startVertex)
  // 初始化 开始节点到每个顶点的距离为0  前溯节点为空
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }
  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]

      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        distances[w] = distances[u] + 1
        predecessors[w] = u
        queue.enqueue(w)
      }
    }
    color[u] = Colors.BLACK
  }

  return {
    distances,
    predecessors
  }
}


// 寻找最短路径
const shortTestPath = BFS(graph,myVertices[0])
console.log('shortTestPath',shortTestPath)
const fromVertex = myVertices[0]

for(let i=1; i<myVertices.length;i++){
  const toVertex = myVertices[i]
  const path = new Stack()
  for(let v = toVertex; v!==fromVertex; v=shortTestPath.predecessors[v]){
    path.push(v)
  }
  path.push(fromVertex)
  let s = path.pop()
  while(!path.isEmpty()){
    s += ' - ' + path.pop()
  }
  console.log(s)
}