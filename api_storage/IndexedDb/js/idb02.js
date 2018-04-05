(function(w) {

	var idb = w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;

	var hasIndexedDb = function() {
		return !!idb;
	}

	var open = function(opts) {
		var req = idb.open(opts.name, opts.version || 1);
		req.onerror = opts.error.bind(req);
		req.onsuccess = opts.success.bind(req);
	}

	w.idb = {
		exists: hasIndexedDb,
		open: open
	}

})(window);