import { Grid } from './grid'
import { Player } from './player'

export class Game {
  constructor(sizeX, sizeY, playerCount) {
    this._turn = 0
    this._grid = new Grid(sizeX, sizeY)
    for (let playerId = 1; playerId <= playerCount; playerId++) {
      this._grid.addPlayer(new Player(playerId, sizeX, sizeY))
    }
  }

  evaluate() {
    this._grid.evaluate(this._turn)
    this._turn++
  }

  get grid() { return this._grid }
  get turn() { return this._turn }
  get players() { return this._grid.players }
}