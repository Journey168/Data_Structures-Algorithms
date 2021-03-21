const Graph = require('./graph')

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

// 定义颜色常量
const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initializeColor = (vertices) => {
  const color = {}
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

// 深度优先遍历图
const dethFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      dethFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}

const dethFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY
  if (callback) {
    callback(u)
  }
  const neighbors = adjList.get(u)
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      dethFirstSearchVisit(w, color, adjList, callback)
    }
  }
  color[u] = Colors.BLACK
}

const printVertex = value => {
  console.log('Visited vertex', value)
}
dethFirstSearch(graph, printVertex)



// 深度优先算法  获取发现时间和完成探索时间
const DFS = (graph) => {
  const vertices = graph.getVertices(),
    adjList = graph.getAdjList(),
    color = initializeColor(vertices),
    d = {},
    f = {},
    p = {},
    time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0
    d[vertices[i]] = 0
    p[vertices[i]] = null
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList)
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY
  d[u] = ++time.count;
  const neighbors = adjList.get(u)
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      p[w] = u
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count
}

// 利用改进后的深度优先算法  应用于拓扑排序 编排一些顺序任务
const graph1 = new Graph(true)
const myVertices1 = ['A', 'B', 'C', 'D', 'E', 'F']
for (let i = 0; i < myVertices1.length; i++) {
  graph1.addVertex(myVertices1[i])
}
graph1.addEdge('A', 'C')
graph1.addEdge('A', 'D')
graph1.addEdge('B', 'D')
graph1.addEdge('B', 'E')
graph1.addEdge('C', 'F')
graph1.addEdge('F', 'E')
const result = DFS(graph1)
const fTimes = result.finished
let s = ''

for (let count = 0; count < myVertices1.length; count++) {
  let max = 0,
    maxName = null;

  for (let i = 0; i < myVertices1.length; i++) {
    if (fTimes[myVertices1[i]] > max) {
      max = fTimes[myVertices1[i]]
      maxName = myVertices1[i]
    }
  }
  s = s ? s + ' - ' + maxName : s + maxName
  delete fTimes[maxName]
}

console.log(s)