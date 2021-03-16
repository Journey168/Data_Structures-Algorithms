function defaultEquals(a,b) {
  return a===b
}

function defaultToString(item){
  if(item===null){
    return 'NULL'
  }else if(item===undefined){
    return 'UNDEFINED'
  }else if(typeof item === 'string'||item instanceof String){
    return `${item}`
  }
  return item.toString()
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};
function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


exports.defaultEquals = defaultEquals
exports.defaultToString = defaultToString
exports.defaultCompare = defaultCompare
exports.Compare = Compare