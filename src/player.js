const davve = (grid, pos, size, turn) => {
  var corners = [{x:0,y:0},{x:0,y:size.y},{x:size.x,y:0}, {x:size.x, y:size.y}]
  
    var corner = false;
    for (var i = 0 ; i < corners.length; i++) {
      if (pos.x == corners[i].x && pos.y == corners[i].y) {
        corner = true;
      }
    }
  
    if (!corner) {
      var paths = [];
      paths.push(Math.sqrt(Math.pow(corners[0].x-pos.x,2)+Math.pow(corners[0].y-pos.y,2)))
      paths.push(Math.sqrt(Math.pow(corners[1].x-pos.x,2)+Math.pow(corners[1].y-pos.y,2)))
      paths.push(Math.sqrt(Math.pow(corners[2].x-pos.x,2)+Math.pow(corners[2].y-pos.y,2)))
      paths.push(Math.sqrt(Math.pow(corners[3].x-pos.x,2)+Math.pow(corners[3].y-pos.y,2)))
      var length = 10000000;
      var shortest = 0;
      for (var i = 0 ; i < paths.length; i++) {
        if (paths[i] < length) {
          length = paths[i];
          shortest = i;
        }
      }
      return shortest;
    } else {
      var availableMovments = [];
      if (pos.x+1 != size.x && grid[pos.x+1][pos.y] == 0) {
        availableMovments.push(1);
      } 
      if (pos.y+1 != size.y && grid[pos.x][pos.y+1] == 0) {
        // up = true;
        availableMovments.push(0);
      } 
      if (pos.y-1 != 0 && grid[pos.x][pos.y-1] == 0) {
        // up = true;
        availableMovments.push(2);
      } 
      if (pos.x-1 != 0 && grid[pos.x-1][pos.y] == 0) {
        // up = true;
        availableMovments.push(3);
      }
  
      var move = availableMovments[Math.floor(Math.random()*availableMovments.length)]
      return move;
    }	
  }
  
  const benji = (grid, pos, size, turn) => {
    const UP = 0
    const RIGHT = 1
    const DOWN = 2
    const LEFT = 3
  
    const isWithinBounds = (x, y) => {
      return x >= 0 && y >= 0 && x < size.x && y < size.y
    }
  
    const isFree = (x, y) => {
      return grid[x][y] === 0
    }
  
    const isGood = (x, y) => {
      return isWithinBounds(x, y) && isFree(x, y)
    }
  
    const {x, y} = pos
  
    const free = [0, 0, 0, 0]
  
    // UP
    {
      if (isGood(x + 0, y + 1)) {
        free[UP]++
  
        free[UP] += isGood(x - 1, y + 1) ? 1 : 0
        free[UP] += isGood(x + 1, y + 1) ? 1 : 0
        
        if (isGood(x + 0, y + 2)) {
          free[UP]++
  
          if (isGood(x + 0, y + 3)) {
            free[UP]++
          }
        }
      }
    }
  
    // RIGHT
    {
      if (isGood(x + 1, y + 0)) {
        free[RIGHT]++
  
        free[RIGHT] += isGood(x + 1, y + 1) ? 1 : 0
        free[RIGHT] += isGood(x + 1, y - 1) ? 1 : 0
        
        if (isGood(x + 2, y + 0)) {
          free[RIGHT]++
  
          if (isGood(x + 3, y + 0)) {
            free[RIGHT]++
          }
        }
      }
    }
  
    // DOWN
    {
      if (isGood(x + 0, y - 1)) {
        free[DOWN]++
  
        free[DOWN] += isGood(x - 1, y - 1) ? 1 : 0
        free[DOWN] += isGood(x + 1, y - 1) ? 1 : 0
        
        if (isGood(x + 0, y - 2)) {
          free[DOWN]++
  
          if (isGood(x + 0, y - 3)) {
            free[DOWN]++
          }
        }
      }
    }
  
    // LEFT
    {
      if (isGood(x - 1, y + 0)) {
        free[LEFT]++
  
        free[LEFT] += isGood(x - 1, y + 1) ? 1 : 0
        free[LEFT] += isGood(x - 1, y - 1) ? 1 : 0
        
        if (isGood(x - 2, y + 0)) {
          free[LEFT]++
  
          if (isGood(x - 3, y + 0)) {
            free[LEFT]++
          }
        }
      }
    }
  
    let mosts = []
    let mostcount = -1
    for (let i = 0; i < 4; ++i) {
      if (free[i] > mostcount) {
        mosts = [i]
        mostcount = free[i]
      } else if (free[i] === mostcount) {
        mosts.push(i)
      }
    }
  
    if (mosts.length === 0) {
      return 0
    } else if (mosts.length === 1) {
      return mosts[0]
    } else {
      return mosts[0]
    }
  
    return 0
  }
  
  const simon = (grid, pos, size, turn) => {
   
      const UP = 0
      const RIGHT = 1
      const DOWN = 2
      const LEFT = 3
      let randomNumber = 0
  
      let upDistance = 0
      let rightDistance = 0
      let downDistance = 0
      let leftDistance = 0
      let chance = 1.0
      // let iteratorAlive = true
      // let posX = pos.x
      // let pos
      // // up
      // while (iteratorAlive) {
  
      // }
      let steps = 0
      while (steps++ < 1000) {
          //check up
          if (pos.y != 0 && grid[pos.x][pos.y + 1] === 0) {
              randomNumber = Math.random()
              let occupiedSpace = 0
              // if (grid[pos.x - 1][pos.y + 1] != 0) occupiedSpace++
              // if (grid[pos.x + 1][pos.y + 1] != 0) occupiedSpace++
              // if (occupiedSpace < 1) {
              //     chance = 0.7
              // } else {
              //     chance = 0.1
              // }
              chance = 0.1
              if (randomNumber < chance) {
                  return UP
              }
          }
  
          // check right
          randomNumber = Math.random()
          if (grid[pos.x + 1][pos.y] === 0 && randomNumber < 0.15) {
              if (pos.x != size.x - 1) {
                  return RIGHT
              }
          }
  
          // check down
          randomNumber = Math.random()
          if (grid[pos.x][pos.y - 1] === 0 && randomNumber < 0.15) {
              if (pos.y != size.y - 1) {
                  return DOWN
              }
          }
  
          // check left
          randomNumber = Math.random()
          if (grid[pos.x - 1][pos.y] === 0 && randomNumber < 0.1) {
              if (pos.x != 0) {
                  return LEFT
              }
          }
      }
  
  }
  
  const filip = (grid, pos, size, turn) => {
      var lengths = [0, 0, 0, 0]
  
    const checkDirection = (dir, steps) => {
      let newPos = {x: 0, y: 0}
      if (dir === 0) {
        newPos = {x: pos.x, y: pos.y + steps}
      } else if (dir === 1) {
        newPos = {x: pos.x + 1, y: pos.y}    
      } else if (dir === 2) {
        newPos = {x: pos.x, y: pos.y - 1}            
      } else if (dir === 3) {
        newPos = {x: pos.x - 1, y: pos.y}            
      }
  
      if (newPos.x >= 0 && newPos.x < size.x && newPos.y >= 0 && newPos.y < size.y) { 
        if (grid[newPos.x][newPos.y] === 0) {
          return true
        }
      }
      return false
    }
  
    for (let dir = 0; dir < 4; dir++) {
      let steps = 0
      while (steps < size.x) {
        if (checkDirection(dir, steps)) {
          lengths[dir] += 1
        }
        else {
          break
        }
        steps++
      }
    }
  
    let best = -1
    let bestIdx = 0
    for (let i = 0; i < 4; i++) {
      if (lengths[i] > best) {
        best = lengths[i]
        bestIdx = i
      }
    }
    
    return bestIdx // lengths.indexOf(Math.max(...lengths))
  }
  
  const jonte = (grid, pos, size, turn) => {
      const {x, y} = pos
    let dir = 0
    const moves = []
  
    // tactic
    let tactic = true
    if (turn < 20) {
      if (y-1 >= size.y && grid[x][y-1] === 0) {
        moves.push(3)
      } else {
        if (x+1 <= size.x && grid[x+1][y] === 0)
          moves.push(2)    
        else if (y+1 <= size.y && grid[x][y+1] === 0)
          moves.push(1)    
        else if (x-1 >= size.x && grid[x-1][y] === 0)
          moves.push(0)    
        else
          tactic = false
      }
    } else {
      tactic = false
    }
  // las inte din fitta
    // safe
    if (x+1 <= size.x && grid[x+1][y] === 0)
      moves.push(2)    
    if (x-1 >= size.x && grid[x-1][y] === 0)
      moves.push(0)    
    if (y+1 <= size.y && grid[x][y+1] === 0)
      moves.push(1)    
    if (y-1 >= size.y && grid[x][y-1] === 0)
      moves.push(3)    
    
    let its = 0
    dir = tactic === false ? moves[Math.floor(Math.random() * moves.length)] : moves[0]
  
    while (dir > 3) {
      dir = moves[Math.floor(Math.random() * moves.length)]
      its++
      if (its > 10) dir = 0
    }
  
    return dir
  }
  
  

export class Player {
  constructor(id, sizeX, sizeY) {
    this._id = id
    this._isAlive = true
    this._currentPosition = { x: Math.floor(Math.random() * sizeX), y: Math.floor(Math.random() * sizeY) }
  }

  pickelOlsson(grid, pos, size, turn) {
    switch (this._id) {
      case 1:
        return benji(grid, pos, size, turn) // Röd
      case 2:
        return jonte(grid, pos, size, turn) // Grön
      case 3:
        return davve(grid, pos, size, turn) // Blå
      case 4:
        return filip(grid, pos, size, turn) // Orange
      case 5:
        return simon(grid, pos, size, turn) // Lila
    }
  }

  kill() {
    this._isAlive = false
    console.log("player " + this._id + " killed")
  }
  

  get currentPosition() { return this._currentPosition }
  set currentPosition(newPos) { this._currentPosition = newPos }
  get id() { return this._id }
  get isAlive() { return this._isAlive }
}