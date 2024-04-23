const helpMessage = `Usage: /<command> <args>\n
Commands:
  admin <message>                Send a message to the admin channel
  join-private <channel>         Request an invite to the given channel
  list-private [filter] [--all]  List all available private channels`;

const help = async ({ ack, respond }) => {
  // Acknowledge command request
  await ack();

  // Respond to user
  respond(helpMessage);
};

module.exports = { help };
