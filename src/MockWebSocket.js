import EventEmitter from 'wolfy87-eventemitter';

class MockWebSocket extends EventEmitter {

	constructor(url, protocols = [], emitInstance = true) {
		super();
		const self = this;

		self.url = url;
		self.protocol = protocols;
		self.readyState = MockWebSocket.OPEN;

		self.on('message', (message) => {
			if(typeof self.onmessage === 'function') {
				self.onmessage({
					data: message,
					origin: self.url
				});
			}
		});

		['open', 'close', 'error'].forEach(eventName => {
			self.on(eventName, function() {
				const eventFunction = self[`on${eventName}`];
				if(typeof eventFunction === 'function')
					eventFunction.apply(Array.prototype.slice.call(arguments))
			});
		});
	}

	send(message) {
		this.emit('send', message);
	}

	receive(message) {
		this.emit('message', message);
	}

	set readyState(state) {
		switch(state) {
			case MockWebSocket.CONNECTING:
				this._state = state;
				break;
			case MockWebSocket.OPEN:
				this._state = state;
				this.emit('open');
				break;
			case MockWebSocket.CLOSING:
				this._state = state;
				break;
			case MockWebSocket.CLOSED:
				this._state = state;
				this.emit('close');
				break;
			default:
				throw new Error('Unknown state');
				break;
		}
	}

	get readyState() {
		return this._state;
	}

	close(reason) {
		this.emit('close', reason);
	}

	static get CONNECTING() {
		return 0;
	}

	static get OPEN() {
		return 1;
	}

	static get CLOSING() {
		return 2;
	}

	static get CLOSED() {
		return 3;
	}
}

export default MockWebSocket;




