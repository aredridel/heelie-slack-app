const admin = async ({ command, client, ack, respond }) => {
    // Acknowledge command request
    await ack();

    // Notify #admin
    const chan = (command.channel_name === 'directmessage')
        ? 'a DM'
        : (command.channel_name) === 'privategroup'
            ? 'a private channel'
            : `<#${command.channel_id}>`

    await client.chat.postMessage({
        channel: 'admin',
        text: `Message from <@${command.user_id}> in ${chan}: \n\n${command.text}`,
    })

    // Respond to reporter
    respond(`Admins have been notified. They will respond as soon as possible. You sent:\n\n${command.text}`)

    // await client.chat.postMessage({
    //     channel: command.user_id,
    //     text: `Admins have been notified. They will respond as soon as possible. You sent: \n\n${command.text}`,
    // })
};

module.exports = {admin};
