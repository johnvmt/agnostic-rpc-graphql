// Link RPC Server with subscriptionServer
class RpcServerSubscriptionServerLink {
	constructor(rpcServer, subscriptionServer, options = {}) {
		const self = this;

		const gqlSocketsByRequestId = new Map();

		self.rpcServer = rpcServer;
		self.subscriptionServer = subscriptionServer;

		self.rpcServer.on('request', (requestController) => {
			const requestId = requestController.requestId;

			if(!gqlSocketsByRequestId.has(requestId)) {
				const gqlSocket = subscriptionServer.connect(options.url);

				gqlSocket.on('send', message => {
					requestController.respond(message);
				});

				gqlSocket.once('close', () => {
					try {
						requestController.cancel();
					}
					catch(error) {}
				});

				requestController.once('end', () => {
					gqlSocket.close()
				});

				gqlSocketsByRequestId.set(requestId, gqlSocket);
			}

			const gqlSocket = gqlSocketsByRequestId.get(requestId);

			gqlSocket.receive(requestController.request);
		});
	}
}

export default RpcServerSubscriptionServerLink;
