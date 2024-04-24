const CHANNEL_FETCH_LIMIT = 100;

const get = async (client) => {
  const conversations = await client.conversations.list({
    types: 'private_channel',
    exclude_archived: true,
    limit: CHANNEL_FETCH_LIMIT,
  });

  const channels = conversations.channels.filter((g) => (
    !g.name.match(/^admin/i)
  ));

  const memberPopulatedChannelsP = channels.map(async (g) => {
    // note: not paginated
    const res = await client.conversations.members({ channel: g.id });

    g.members = res.members; // eslint-disable-line
    return g;
  });

  return Promise.all(memberPopulatedChannelsP);
};

module.exports = { get };
