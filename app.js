const { App } = require('@slack/bolt');
const { redisStore } = require('./lib/redis-store');

// Commands
const { admin } = require('./commands/admin');
const { help } = require('./commands/help');
const { joinPrivate } = require('./commands/join-private');
const { listPrivate } = require('./commands/list-private');

// Actions
const { invitePrivateAction } = require('./actions/invite-private');
const { joinPrivateAction } = require('./actions/join-private');

// Initializes your app
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-secret',
  scopes: ['chat:write', 'commands', 'groups:read', 'groups:write.invites'],
  installationStore: redisStore,
});

// Commands
app.command('/admin', admin);
app.command('/help?', help);
app.command('/join-private', joinPrivate);
app.command('/list-private', listPrivate);

// Actions
app.action('invite-private-action', invitePrivateAction);
app.action('join-private-action', joinPrivateAction);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!'); // eslint-disable-line
})();
