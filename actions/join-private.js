const sendInviteRequest = (client, channelId, userId) => client.chat.postMessage({
  channel: channelId,
  text: `Invite request from <@${userId}>`,
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `<@${userId}> has requested to join this channel.`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'invite-private-action',
          value: userId,
          text: {
            type: 'plain_text',
            text: 'Invite',
            emoji: true,
          },
        },
      ],
    }],
});

const joinPrivateAction = async ({
  action, body, client, ack, respond,
}) => {
  await ack();

  const channelId = action.value;
  const userId = body.user.id;

  if (!channelId) {
    respond('A channel is required. Use `/list-private` to see a list of available private channels.');
    return;
  }

  await sendInviteRequest(client, channelId, userId);

  respond('Invite request sent to channel');
};

module.exports = { joinPrivateAction, sendInviteRequest };
