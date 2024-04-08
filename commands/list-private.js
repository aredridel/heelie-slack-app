const Group = require('../models/group')

function formatChannel(chan, user) {
    const omitCount = chan.purpose.value && chan.purpose.value.match(/\[no\-count\]/g)
    const purpose = chan.purpose.value.replace(/\[[^\]]*\]/g, '')
    const userInChannel = chan.members.find(m => m === user)
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: `*${chan.name}* [${omitCount ? '?' : chan.members.length - 1}]\n${purpose}`,
        },
        ...(!userInChannel && {
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Join",
                },
                action_id: "join-private-action",
                value: chan.id,
            }
        })
    }
}

function displayGroupList(filter, user, groups) {
    return {
        text: `These channels are private to disallow previewing (view without join). Available private channels: `,
        blocks: [{
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Available private channels:*\nThese channels are private to disallow previewing (view without join).`
            }
        },
            {
                type: "divider"
            }, ...groups.map(g => formatChannel(g, user))],
    }
}

const listPrivate = async ({command, client, ack, respond}) => {
    await ack();

    const filter = command.filter ? new RegExp(command.filter) : null
    let chans = await Group.get(client, filter)
    if (command.text !== "--all") {
        chans = chans.filter(c => !c.members.find(m => m === command.user_id));
    }

    if (chans && chans.length) {
        respond(displayGroupList(filter, command.user_id, chans))
    } else {
        respond(filter ? `No channels matching \`${filter}\`` : `No private channels available`)
    }
}

module.exports = {listPrivate};
