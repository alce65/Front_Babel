function app() {

    let canvas = document.querySelector('canvas')
    let c = canvas.getContext('2d')

    let rojo = '#0000ff'

    c.fillStyle = rojo
    c.strokeStyle = '#00ff00'
    // c.fillRect(100,100, 200, 200)
    c.strokeRect(98,98, 202, 202)

    c.strokeStyle = 'black'
    c.font = `40px Arial`
    //c.fillText('Hola Mundo', 100, 350)
    c.strokeText('Hola Mundo', 100, 350)
}



window.addEventListener('load', app)