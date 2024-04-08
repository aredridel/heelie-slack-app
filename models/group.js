const get = async (client, filter) => {
  filter = filter || /.*/

  const conversations = await client.conversations.list({
    types: 'private_channel',
    exclude_archived: true,
    limit: 100,
  });

  const channels = conversations.channels.filter(g => (
    (g.name.match(filter) || `#${g.name}`.match(filter) || g.purpose.value.match(filter)) &&
    !g.name.match(/^admin/i) &&
    !g.purpose.value.match(/\[secret\]/gi)
  ));

  const memberPopulatedChannelsP = channels.map(async (g) => {
    // note: not paginated
    const res = await client.conversations.members({channel: g.id});

    g.members = res.members;
    return g;
  });

  return Promise.all(memberPopulatedChannelsP);
}

module.exports = {get}
