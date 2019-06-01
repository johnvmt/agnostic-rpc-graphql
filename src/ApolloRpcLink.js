// Return a link for an Apollo client
import { WebSocketLink } from 'apollo-link-ws';
import MockSocketSubscriptionClient from './MockSocketSubscriptionClient';

class ApolloRpcLink extends WebSocketLink {
	constructor(rpcClient) {

		// Set up GQL client with the mock socket
		const mockSocketSubscriptionClient = new MockSocketSubscriptionClient(); // There's no reconnect since we're actually the server
		const mockClientSocket = mockSocketSubscriptionClient.client; // Link this socket to the real one
		super(mockSocketSubscriptionClient);

		const self = this;

		// Set up RPC client request
		self.rpcRequest = rpcClient.requestController({
			multipleRequests: true,
			multipleResponses: true
		});

		// Link RPC client request with mock GQL socket
		// Catch GQL requests going out from the mock socket and put them into the RPC request channel
		mockClientSocket.on('send', data => {
			self.rpcRequest.request(data);
		});

		// Catch GQL responses coming back in on the RPC request channel and put them into the mock socket
		self.rpcRequest.on('response', (response) => {
			mockClientSocket.receive(response);
		});

		mockClientSocket.on('error', error => {
			console.error('error', error);
		});
	}

	close() {
		this.rpcRequest.cancel();
	}
}

export default ApolloRpcLink;
