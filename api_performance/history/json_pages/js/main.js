(function (history) {
  var historyManager = {
    /**
     * Inicializa la app
     */
    init: function () {
      this.historyManager = this;
      this.pageInfo = {};
      this.getDomElements(); // Obtiene los elementos del DOM que vamos a utilizar
      this.shimLinks(); // establece el mismo manejador de eventos para todos los enlaces
      this.listenHistoryStates(); // informa por consola de los eventos de los estados
      this.loadCurrentState();
    },
    /**
     * Obtiene los elementos del DOM que vamos a utilizar
     */
    getDomElements: function () {
      this.links = document.querySelectorAll('#menu a');
      this.titleElement = document.getElementById('title');
      this.contentElement = document.getElementById('content');
    },
    shimLinks: function () {
      for (var index = 0; index < this.links.length; index++) {
        this.links[index].addEventListener('click', this.processLink.bind(this), false);
      }
    },
    /**
     * Manejador de eventos de todos los enlaces
     */
    processLink: function (e) {
      e.preventDefault();  
      this.pageInfo = {
        timestamp: (new Date()).getMilliseconds(),
        title: e.currentTarget.title,
        srcUrl: e.currentTarget.href,
        url: e.currentTarget.href,
        jsonFile: this.getJsonFile(e.currentTarget.href)
      };
      historyManager.getDataFromJson(this.pageInfo.jsonFile);
    },
    getJsonFile: function (url) {
      return 'data/' + url
        .substring(url.lastIndexOf('/') + 1)
        .replace('.html', '.json');
    },
    getParameterByName: function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getDataFromJson: function (jsonFile) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', jsonFile, true);
      xhr.onreadystatechange = jsonGot.bind(this);
      xhr.send();

      function jsonGot() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            
            var pageData = JSON.parse(xhr.responseText);
            historyManager.titleElement.innerHTML = pageData.title;
            document.title = pageData.title;
            historyManager.contentElement.innerHTML = pageData.content;
            history.pushState(this.pageInfo, pageData.title, this.pageInfo.url);
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
    },
    loadCurrentState: function () {
      var jsonFile;
      if (history.state && history.state.jsonFile) {
        jsonFile = history.state.jsonFile;
      } else {
        this.getParameterByName('from');
        var urlFrom = location.pathname.replace('index', this.getParameterByName('from'));
        jsonFile = this.getJsonFile(urlFrom);
      }
      if (jsonFile && jsonFile != 'data/') {
        console.log(jsonFile)
        this.getDataFromJson(jsonFile);
      }
    },
    listenHistoryStates: function () {
      window.addEventListener('popstate', function (e) {
        console.log('popstate event ==> %o', e);
      }, false);
      window.addEventListener('hashchange', function (e) {
        console.log('popstate event ==> %o', e);
      }, false);
    },
    onpopstate: function (e) {
      console.log(this, e);
    }
  };

  historyManager.init();

})(window.history);