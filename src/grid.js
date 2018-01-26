import { Player } from './player'

export class Grid {
  constructor(sizeX, sizeY) {
    this._sizeX = sizeX
    this._sizeY = sizeY
    this._players = []
    this._grid = []
    this.initGrid(50, 50)
  }

  evaluate(turn) {
    for (const player of this._players) {
      if (player.isAlive) {
        let direction
        try {
          direction = player.pickelOlsson(this._grid, player.currentPosition, { x: this._sizeX, y: this._sizeY }, turn)
        }
        catch(err) {
          console.log('player', player.id, 'crashed at', turn, err)
          player.kill()
          continue
        }

        switch (direction) {
          case 0:
            player.currentPosition = { x: player.currentPosition.x, y: player.currentPosition.y + 1 }
            break
          case 1:
            player.currentPosition = { x: player.currentPosition.x + 1, y: player.currentPosition.y }
            break
          case 2:
            player.currentPosition = { x: player.currentPosition.x, y: player.currentPosition.y - 1}
            break
          case 3:
            player.currentPosition = { x: player.currentPosition.x - 1, y: player.currentPosition.y }
            break
          default:
            player.kill()
        }
      }
    }
    
    for (const player of this._players) {
      if (!player.isAlive) {
        continue;
      }
      for (const opponent of this._players) {
        if (opponent === player) {
          continue
        }

        if (player.currentPosition.x === opponent.currentPosition.x && player.currentPosition.y === opponent.currentPosition.y) {    
          player.kill()
        }
      }

      if (
        player.currentPosition.x < this._sizeX && player.currentPosition.x >= 0 && 
        player.currentPosition.y < this._sizeY && player.currentPosition.y >= 0 &&
        this._grid[player.currentPosition.x][player.currentPosition.y] === 0 && player.isAlive
      ) {
        this._grid[player.currentPosition.x][player.currentPosition.y] = player.id
      }
      else {
        player.kill()
      }
    }
  }

  initGrid(sizeX, sizeY) {
    for (let y = 0; y < sizeY; y++) {
      const values = []
      this._grid.push(values)
      for (let x = 0; x < sizeX; x++) {
        values.push(0)
      }
    }
  }

  addPlayer(player) {
    this._players.push(player)
    this._grid[player.currentPosition.x][player.currentPosition.y] = player.id
    console.log(player.id, player.currentPosition)
  }

  get players() { return this._players }
  get grid() { return this._grid }
}