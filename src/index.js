import { Game } from './game'
import { initGraphics, drawGrid } from './graphics'

const startGame = () => {
    const sizeX = 50
    const sizeY = 50
    initGraphics(sizeX, sizeY)
    const game = new Game(sizeX, sizeY, 5)

    setInterval(() => {
        game.evaluate()
        let alivePlayers = 5
        
        for (const player of game.players) {
            if (!player.isAlive) {
                alivePlayers--
            }
        }

        drawGrid(sizeX, sizeY, game.grid.grid)
    }, 50)
};

startGame()
