(function (appCache) {
    var appCacheManager = {
        init: function () {
            this.appCacheManager = this;
            this.getDomElements();
            this.listenConextionStatusEvents();
            this.listenCacheEvents();
            this.listenClickEvents();
            this.handleConexionStatus();
        },
        getDomElements: function(){
            this.cacheLog = document.getElementById('cacheLog');
            this.progressLog = document.getElementById('progressLog');
            this.appCacheButton = document.getElementById('appCacheButton');
        },
        handleCacheEvent: function (e) {
            var log = document.createElement('p');
            log.innerHTML = 'Application Cache <b>' + e.type + '</b> event';
            switch (e.type) {
            case 'progress':
                appCacheManager.progressLog.innerHTML = ' ' + e.loaded + '/' + e.total + ' files downloaded';
                break;
            case 'noupdate':
                appCacheManager.progressLog.innerHTML = 'N/A';
                break;
            case 'updateready':
                appCacheManager.appCacheButton.innerHTML = 'Load new cache';
                appCacheManager.appCacheButton.classList.add('loaded');
                break;
            }
            appCacheManager.cacheLog.insertBefore(log, appCacheManager.cacheLog.firstChild);
        },
        handleCacheError: function () {
            console.error('Error: Cache failed to update!');
        },
        listenCacheEvents: function () {
            // Fired after the first cache of the manifest.
            appCache.addEventListener('cached', this.handleCacheEvent, false);

            // Checking for an update. Always the first event fired in the sequence.
            appCache.addEventListener('checking', this.handleCacheEvent, false);

            // An update was found. The browser is fetching resources.
            appCache.addEventListener('downloading', this.handleCacheEvent, false);

            // Fired for each resource listed in the manifest as it is being fetched.
            appCache.addEventListener('progress', this.handleCacheEvent, false);

            // Fired when the manifest resources have been newly redownloaded.
            appCache.addEventListener('updateready', this.handleCacheEvent, false);

            // Fired after the first download of the manifest.
            appCache.addEventListener('noupdate', this.handleCacheEvent, false);

            // Fired if the manifest file returns a 404 or 410.
            // This results in the application cache being deleted.
            appCache.addEventListener('obsolete', this.handleCacheEvent, false);

            // The manifest returns 404 or 410, the download failed,
            // or the manifest changed while the download was in progress.
            appCache.addEventListener('error', this.handleCacheError, false);
        },
        listenConextionStatusEvents: function () {
            window.addEventListener("offline", this.handleConexionStatus, false);
            window.addEventListener("online", this.handleConexionStatus, false);
        },
        handleConexionStatus: function () {
            var method = navigator.onLine ? "add" : "remove";
            document.body.classList[method]('online');
        },
        listenClickEvents: function () {
            this.appCacheButton.addEventListener('click', this.checkAppCache, false);
        },
        checkAppCache: function (e) {
            event.preventDefault();
            if (appCacheManager.appCacheButton.classList.contains('loaded')) {
                appCache.swapCache();
                location.reload();

            } else {
                appCache.update();
            }
        }
    };

    appCacheManager.init();

})(window.applicationCache);