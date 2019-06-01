import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import MockWebSocketServer from './MockWebSocketServer';

class MockSocketSubscriptionServer {
	constructor(options) {
		// Set up mock server
		this.mockSocketServer = new MockWebSocketServer();

		const subscriptionServer = SubscriptionServer.create(
			Object.assign(options, {execute: execute, subscribe: subscribe}),
			this.mockSocketServer
		);
	}

	connect() {
		// TODO add option to override mock url
		return this.mockSocketServer.connect('mockurl', ['graphql-ws']);
	}
}

export default MockSocketSubscriptionServer;



