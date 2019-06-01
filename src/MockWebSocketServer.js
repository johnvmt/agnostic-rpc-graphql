import { SubscriptionClient } from 'subscriptions-transport-ws';
import EventEmitter from 'wolfy87-eventemitter';
import MockWebSocket from './MockWebSocket';

class MockWebSocketServer extends EventEmitter {

	constructor() {
		super();
	}

	connect(url, protocols = []) {
		let connection = new MockWebSocket(url, protocols, false);
		this.emit('connection', connection);
		return connection;
	}
}

export default MockWebSocketServer;
