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

		this.getUnderlyingDb = function() {
			return _dbh;
		}

		this.hasObjectStore = function(name) {
			var names = _dbh.objectStoreNames;
			for (var idx = 0; idx < names.length; idx++) {
				if (names[idx] == name) return true;
			}
			return false;
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

		this.getTxOnObjectStore = function(opts) {
			var tx = _dbh.transaction(opts.name, opts.mode || "readonly");
			if (opts.action) {
				opts.action(tx.objectStore(opts.name));
			}

			if (opts.complete) {
				tx.oncomplete = opts.complete.bind(tx);
			}

			if (opts.error) {
				tx.onerror = opts.error.bind(tx);
			}
			return tx;
		}

		this.getByKey = function(opts) {
			var tx = _dbh.transaction(opts.name, "readonly");
			var req = tx.objectStore(opts.name).get(opts.key);
			if (opts.success) {
				req.onsuccess = function(evt) {
					opts.success.bind(tx)(evt.target.result, evt);
				} 
			}

			if (opts.error) {
				tx.onerror = opts.error.bind(tx);
			}

			return tx;
		}

		this.iterate = function(opts) {
			var tx = _dbh.transaction(opts.name, "readonly");
			var store = tx.objectStore(opts.name);
			var req;

			if (opts.index) {
				req = store.index(opts.index).openCursor(opts.range);
			}
			else {
				req = store.openCursor(opts.range);
			}
			
			req.onsuccess = function(evt) {
				var cursor = evt.target.result;
				 if(cursor) {
				 	var cont = opts.each.bind(tx)(cursor.value);
				 	if (cont !== false) {
				 		cursor.continue();
				 	}
				 }
			}
		}

		this.deleteByKey = function(opts) {
			var tx = _dbh.transaction(opts.name, "readwrite");
			var req = tx.objectStore(opts.name).delete(opts.key);
			if (opts.success) {
				req.onsuccess = opts.success.bind(tx);
			}
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