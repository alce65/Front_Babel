function app () {
    var messageManager = {
        init: function(){
            this.getWindows() ;
            this.listenButtonsClicks() ;
        },
        getWindows: function(){
            this.pages = {
                page1: window.top.document.querySelector('#page1').contentWindow,
                page2: window.top.document.querySelector('#page2').contentWindow
            }
            this. helloPageButtons = document.querySelectorAll('.helloPageBtn');
        },
        listenButtonsClicks: function(){
            for(let i = this.helloPageButtons.length-1; i >= 0; i--) {
                this.helloPageButtons[i].addEventListener('click', this.sayHello.bind(this), false)
            }
        },
        sayHello: function(e){
            let page = e.currentTarget.dataset.page;
           
            this.sendMessage(page, 'Hola ' + page);
        },
        sendMessage: function(toPage, message){
            this.pages[toPage].postMessage({message: message}, location.origin); 
            console.log(`Enviado mensaje hacia ${toPage}`)
        }
    }
    messageManager.init()
}
(function(){
    window.addEventListener('load', app, false)
})()