import { SubscriptionClient } from 'subscriptions-transport-ws';
import MockWebSocket from './MockWebSocket';

class MockSocketSubscriptionClient extends SubscriptionClient {

	constructor(options = {}) {
		const mockURL = 'ws://127.0.0.1:8000';
		//const mockSocketInstances = MockWebSocketTracked.instances;
		super(mockURL, options, MockWebSocket);
	}

	/*


	return new Promise((resolve, reject) => {

		const onSocketInstance = (socket) => {

			// If socket dest is our fake dest...call off
			if(false) {
				mockSocketInstances.off('instance', onSocketInstance);
				resolve(socket);
			}
		};

		mockSocketInstances.on('instance', onSocketInstance);
	});

	// TODO set fake address
	const client = new SubscriptionClient('ws://127.0.0.1:8000', {
		reconnect: true,
	}, MockWebSocketTracked);
	*/

}

export default MockSocketSubscriptionClient;
