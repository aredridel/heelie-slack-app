const formatChannelName = (command) => {
  switch (command.channel_name) {
    case 'directmessage': return 'a DM';
    case 'privategroup': return 'a private channel';
    default: return `<#${command.channel_id}>`;
  }
};

const admin = async ({
  command, client, ack,
}) => {
  // Acknowledge command request
  await ack();

  // Notify #admin
  const chan = formatChannelName(command);
  await client.chat.postMessage({
    channel: 'admin',
    text: `Message from <@${command.user_id}> in ${chan}: \n\n${command.text}`,
  });

  // Respond to reporter
  await client.chat.postMessage({
    channel: command.user_id,
    text: `Admins have been notified. They will respond as soon as possible. You sent: \n\n${command.text}`,
  });
};

module.exports = { admin };
