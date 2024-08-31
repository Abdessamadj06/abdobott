import yts from 'yt-search';
import { prepareWAMessageMedia, generateWAMessageFromContent } from 'baileys';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) {
        conn.reply(m.chat, `Please provide the name of a YouTube video or channel.`, m);
        return;
    }
    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `Search results for *${text}*`;

        let listSections = [];

        for (let index in ytres) {
            let v = ytres[index];
            let thumbnailUrl = v.thumbnail;

            listSections.push({
                title: `Results`,
                rows: [
                    {
                        header: 'Audio',
                        title: `${v.title}`,
                        description: `${v.timestamp}\n`,
                        id: `${usedPrefix}ytmp3 ${v.url}`
                    },
                    {
                        header: "Video",
                        title: `${v.title}`,
                        description: `${v.timestamp}\n`,
                        id: `${usedPrefix}ytmp4 ${v.url}`
                    }
                ]
            });

            // Send image and interactive list per result
            var messageMedia = await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: conn.waUploadToServer });
            const interactiveMessage = {
                body: { text: `*${v.title}*\nDuration: ${v.timestamp}\nAuthor: ${v.author.name}\nViews: ${v.views}\n\n` },
                footer: { text: `Results` },
                header: {
                    title: `*< YouTube Search Results />*`,
                    hasMediaAttachment: true,
                    imageMessage: messageMedia.imageMessage,
                }
            };

            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage,
                    },
                },
            }, { userJid: conn.user.jid, quoted: m });

            conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        }
    } catch (e) {
        m.reply(`Please try again.`);
        console.log(e);
    }
};

handler.command = /^playlist|ytbuscar|yts(earch)?$/i;

export default handler;