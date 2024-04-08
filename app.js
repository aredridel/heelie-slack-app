const { App } = require('@slack/bolt');
const { admin } = require('./commands/admin')
const { redisStore } = require('./lib/redis-store');

// Initializes your app
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'my-secret',
    scopes: ['chat:write', 'commands'],
    installationStore: redisStore,
});

app.command('/admin', admin);

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();