import Queue from './Queue'
// 击鼓传花
function hotPotato(elementsList,num){
  const queue = new Queue();
  const elimitateList = [];

  // 入队
  for(let i=0; i<elementsList.length;i++){
    queue.enqueue(elementsList[i])
  }

  // 淘汰
  while(queue.size()>1){
    for(let i=0;i<num;i++){
      queue.enqueue(queue.dequeue());
    }
    elimitateList.push(queue.dequeue())
  }
  return {
    elimitated: elimitateList,
    winner: queue.dequeue()
  }
}