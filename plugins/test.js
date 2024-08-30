import yts from 'yt-search';
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from "@adiwajshing/baileys";

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, "Please provide the name of a YouTube video or channel.", m);
    }

    try {
        let result = await yts(text);
        let videos = result.videos;
        let channels = result.channels;
        let searchResults = videos.concat(channels);
        
        let sections = [];
        searchResults.forEach((item, index) => {
            let image = item.thumbnail || item.image;
            sections.push({
                title: item.type === 'video' ? `Video: ${item.title}` : `Channel: ${item.name}`,
                rows: [
                    {
                        title: "Watch Video",
                        description: `${item.title || item.name} | ${item.timestamp || ''}\n`,
                        rowId: `${usedPrefix}ytmp4 ${item.url}`,
                        image
                    },
                    {
                        title: "Download Audio",
                        description: `${item.title || item.name} | ${item.timestamp || ''}\n`,
                        rowId: `${usedPrefix}ytmp3 ${item.url}`,
                        image
                    }
                ]
            });
        });

        const listMessage = {
            text: `Search results for: ${text}`,
            sections,
            title: "YouTube Search",
            buttonText: "Select a result",
            headerType: 1
        };

        const message = await generateWAMessageFromContent(m.chat, proto.Message.fromObject({
            listMessage: proto.Message.ListMessage.create(listMessage)
        }), {});

        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (e) {
        conn.reply(m.chat, `An error occurred. Please try again later.`, m);
        console.error(e);
    }
};

handler.command = ["test"];

export default handler;