import MockSocketSubscriptionServer from './MockSocketSubscriptionServer';
import RpcServerSubscriptionServerLink from './RpcServerSubscriptionServerLink';

// Link RPC Server with subscriptionServer
class RpcSubscriptionServer {
	constructor(options) {
		this.subscriptionServer = new MockSocketSubscriptionServer(options);
	}

	connect(rpcServer, linkOptions) {
		return new RpcServerSubscriptionServerLink(rpcServer, this.subscriptionServer, linkOptions);
	}
}

export default RpcSubscriptionServer;
