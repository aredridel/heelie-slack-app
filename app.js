const { App } = require('@slack/bolt');
const { redisStore } = require('./lib/redis-store');

const { admin } = require('./commands/admin')
const { joinPrivate } = require('./commands/join-private');
const { listPrivate } = require('./commands/list-private');

// Initializes your app
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'my-secret',
    scopes: ['chat:write', 'commands', 'groups:read'],
    installationStore: redisStore,
});

app.command('/admin', admin);
app.command('/join-private', joinPrivate);
app.command('/list-private', listPrivate);

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();