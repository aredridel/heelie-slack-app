const invitePrivateAction = async ({
  action, body, client, ack, respond,
}) => {
  await ack();

  // Invite user to channel
  const userId = action.value;
  await client.conversations.invite({
    channel: body.channel.id,
    users: userId,
  });

  respond(`Invite sent to <@${userId}> by <@${body.user.id}>!`);
};

module.exports = { invitePrivateAction };
