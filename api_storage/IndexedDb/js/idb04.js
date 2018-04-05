(function(w) {

	var idb = w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;


	var Database = function(name, version) {
		var _dbh = null;
		var _isOpened = false;

		this.name = name;
		this.version = version;
		this.isOpened = function() {
			return _isOpened;
		}

		this.open = function(dbh) {
			if (dbh && dbh != _dbh) {
				_dbh = dbh;
				_isOpened = true;
			}
		}

		this.createObjectStore = function(name, opts) {
			var store = _dbh.createObjectStore(name, opts);
			return store;
		}

	}


	var hasIndexedDb = function() {
		return !!idb;
	}

	var open = function(opts) {
		var db = new Database(opts.name, opts.version || 1);
		var req = idb.open(db.name, db.version);
		req.onerror = opts.error.bind(req);
		req.onsuccess = function(evt) {
			db.open(evt.target.result);
			if (opts.success) {
				opts.success.bind(db)(evt);
			}
		}
		req.onupgradeneeded = function(evt) {
			db.open(evt.target.result);
			if (opts.upgrade) {
				opts.upgrade.bind(db)(evt);
			}
		}

		return db;
	}

	w.idb = {
		exists: hasIndexedDb,
		open: open
	}

})(window);