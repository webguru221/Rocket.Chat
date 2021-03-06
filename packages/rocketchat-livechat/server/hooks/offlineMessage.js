import { RocketChat } from 'meteor/rocketchat:lib';
import { Livechat } from '../lib/Livechat';

RocketChat.callbacks.add('livechat.offlineMessage', (data) => {
	if (!RocketChat.settings.get('Livechat_webhook_on_offline_msg')) {
		return data;
	}

	const postData = {
		type: 'LivechatOfflineMessage',
		sentAt: new Date(),
		visitor: {
			name: data.name,
			email: data.email,
		},
		message: data.message,
	};

	Livechat.sendRequest(postData);
}, RocketChat.callbacks.priority.MEDIUM, 'livechat-send-email-offline-message');
