import MockSocketSubscriptionServer from './MockSocketSubscriptionServer';
import RpcServerSubscriptionServerLink from './RpcServerSubscriptionServerLink';

// Link RPC Server with subscriptionServer
class RpcSubscriptionServer {
	constructor(options) {
		this.subscriptionServer = new MockSocketSubscriptionServer(options);
	}

	connect(rpcServer = null) {
		return new RpcServerSubscriptionServerLink(rpcServer, this.subscriptionServer);
	}
}

export default RpcSubscriptionServer;
