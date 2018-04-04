(function() {

     app =  function() {
        let worker = new Worker("webservices.js");
        worker.onmessage = function (event) {
          document.write(event.data+ " <br>");
        }
    }
    window.addEventListener('load', app, false)
})()