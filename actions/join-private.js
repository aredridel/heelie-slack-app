const joinPrivateAction = async ({
  action, body, client, ack, respond,
}) => {
  await ack();

  const channelId = action.value;
  const userId = body.user.id;

  if (!channelId) {
    respond('A channel is required. Use `/list-private` to see a list of available private channels.');
  }

  await client.chat.postMessage({
    channel: channelId,
    text: `Invite request from <@${userId}>! Use \`/invite <@${userId}>\` to accept (anyone here can do this)!`,
  });

  respond('Invite request sent to channel');
};

module.exports = { joinPrivateAction };
