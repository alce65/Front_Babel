(function(w) {

	var idb = w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;

	var hasIndexedDb = function() {
		return !!idb;
	}

	w.idb = {
		exists: hasIndexedDb
	}

})(window);