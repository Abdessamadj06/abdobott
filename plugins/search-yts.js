import yts from 'yt-search';
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = await (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('البحث في اليوتوب مثال :\n.yts اخبار اليوم');
    }

    const searchResults = (await yts(text)).all;
    const videoResults = searchResults.filter(result => result.type === 'video');
    const channelResults = searchResults.filter(result => result.type === 'channel');

    const messageText = 'يرجى اختيار الفيديو الخاص بك أو ملفات الصوت الخاصة بك عن طريق النقر على الزر';
    const imageUrl = channelResults.length ? channelResults[0].image : (videoResults.length ? videoResults[0].image : 'default_image_url_here');
    
    const sections = [
        {
            title: 'jeen bot',
            rows: [
                {
                    title: 'jeen bot',
                }
            ]
        }
    ];

    videoResults.forEach(video => {
        sections.push({
            title: video.title,
            rows: [
                {
                    title: 'على شكل فيديو',
                    description: `Get video from "${video.title}"`,
                    id: `.ytmp4 ${video.url}`
                },
                {
                    title: 'على شكل موسيقى',
                    description: `Get audio from "${video.title}"`,
                    id: `.play ${video.url}`
                }
            ]
        });
    });

    const listMessage = {
        title: 'إضغط هنا !',
        sections
    };

    const imageMessage = {
        image: { url: imageUrl }
    };

    const mediaMessageOptions = {
        upload: conn.waUploadToServer
    };

    const waMessage = await generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({ text: messageText }),
                    footer: proto.Message.InteractiveMessage.Footer.create({ text: 'jeen' }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: 'jeen bot',
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia(imageMessage, mediaMessageOptions))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            name: 'single_select',
                            buttonParamsJson: JSON.stringify(listMessage)
                        }]
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, waMessage.message, { messageId: waMessage.key.id });
};

handler.command = ['ytsearch', 'yts'];
export default handler;