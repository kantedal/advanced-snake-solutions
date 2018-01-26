var canvas
var ctx
var colors = ['white', 'red', 'green', 'blue', 'orange', 'purple']

export const initGraphics = (sizeX, sizeY) => {
    console.log('hello')
    canvas = document.getElementById("myCanvas")

    canvas.width = sizeX
    canvas.height = sizeY

    ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // var grid = new Array(sizeX);
    // for (var i = 0; i < sizeX; i++) {
    //     grid[i] = new Array(sizeY);
    //     for (var k = 0; k < sizeY; k++){
    //         grid[i][k] = Math.floor(Math.random() * 6);
    //     }
    // }
}


export const drawGrid = (sizeX, sizeY, grid) => {
    for (var x = 0; x < sizeX; x++) {
        for (var y = 0; y < sizeY; y++) {
            ctx.fillStyle = colors[grid[x][y]]
            ctx.fillRect(x, y, 1, 1)
        }
    }
}