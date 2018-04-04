(function() {

     app =  function() {
        let worker = new Worker("webservices.js");
        worker.onmessage = function (event) {
          // document.querySelector('#Lugares').innerHTML = event.data+ " <br>"
          document.write(event.data+ " <br>");
        }
    }
    window.addEventListener('load', app, false)
})()