Heelie is a Node app built on the Bolt library.

### 1. Create Slack App
* Go to https://api.slack.com/apps
* Bootstrap App config using [manifest.yml.template](/manifest.yml.template)

### 2. Run the bot

To run it locally, you will need to:
1. Install and run Redis
2. Run Ngrok (or otherwise create a public URL for the bot)
3. Add environment variables (see below)
4. Run the app `npm start`

To run it on Heroku, you will need to:
1. Add the Redis Cloud add-on
2. Set up auto-deploys connected to the Github repo
3. Add Config Vars (see below)

#### Required environment variables
The Slack configs can be found on the Slack App homepage.
  * SLACK_SIGNING_SECRET
  * SLACK_CLIENT_ID
  * SLACK_CLIENT_SECRET
  * COC_URL (optional)

### 3. Set up Slack App on the Workspace
* Go to your_app_url/slack/install
* Create #admin and add the bot. User reports via /admin will be posted there 
* Add the bot to any private channels that are open to invites. 
