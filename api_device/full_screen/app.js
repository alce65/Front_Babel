function app() {
    let elem = document.querySelector('#img1')
    elem.addEventListener('click', fullScreen)

    function fullScreen() {
        if (elem.requestFullscreen) { 
            elem.requestFullscreen( )
        } else if (elem.msRequestFullScreen) { 
            elem.msRequestFullscreen()
        } else if (elem.mozRequestFullScreen) { 
            elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen()
        }
    }
}

(function() {
    window.addEventListener('load', app, false)
})()