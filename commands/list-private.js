const Group = require('../models/group');

function comparator(g1, g2) {
  if (g1.name < g2.name) return -1;
  if (g1.name > g2.name) return 1;

  return 0;
}

function formatChannel(chan, user) {
  const purpose = chan.purpose.value.replace(/\[[^\]]*\]/g, '');
  const userInChannel = chan.members.find((m) => m === user);
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${chan.name}* [${chan.num_members}]\n${purpose}`,
    },
    ...(!userInChannel && {
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Join',
        },
        action_id: 'join-private-action',
        value: chan.id,
      },
    }),
  };
}

function displayGroupList(user, groups) {
  return {
    text: 'These channels are private to disallow previewing (view without join). Available private channels:',
    blocks: [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Available private channels:*\nThese channels are private to disallow previewing (view without join).',
      },
    },
    {
      type: 'divider',
    }, ...groups.sort(comparator).map((g) => formatChannel(g, user))],
  };
}

const listPrivate = async ({
  command, client, ack, respond,
}) => {
  await ack();

  let chans = await Group.get(client);
  if (command.text !== '--all') {
    chans = chans.filter((c) => !c.members.find((m) => m === command.user_id));
  }

  if (chans && chans.length) {
    await respond(displayGroupList(command.user_id, chans));
  } else {
    await respond('No private channels found');
  }
};

module.exports = { listPrivate };
