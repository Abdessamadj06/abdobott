import fetch from 'node-fetch';
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@adiwajshing/baileys';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('البحث عن الأنمي مثال:\n.anime اسم الأنمي');
    }

    const searchQuery = encodeURIComponent(text);
    const searchUrl = `https://web.animerco.org/?s=${searchQuery}`;

    // البحث عن الأنمي باستخدام الموقع
    const response = await fetch(searchUrl);
    const html = await response.text();

    // يجب هنا تحليل البيانات من HTML لاستخراج الروابط والمعلومات المطلوبة. 
    // سأفترض أن لديك طريقة للحصول على الروابط من HTML.
    const results = extractAnimeResults(html); // هذه دالة افتراضية تحتاج إلى تنفيذ.

    if (!results.length) {
        return m.reply('لم يتم العثور على نتائج');
    }

    const sections = results.map(result => ({
        title: result.title,
        rows: [
            {
                title: 'تحميل كفيديو',
                description: `تحميل الفيديو من "${result.title}"`,
                id: `.downloadvideo ${result.url}`
            },
            {
                title: 'تحميل كموسيقى',
                description: `تحميل الموسيقى من "${result.title}"`,
                id: `.downloadaudio ${result.url}`
            }
        ]
    }));

    const listMessage = {
        title: 'إضغط هنا لاختيار التحميل!',
        sections: [{ title: 'نتائج البحث', rows: sections }]
    };

    const imageUrl = results[0]?.image || 'default_image_url_here';
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
                    body: proto.Message.InteractiveMessage.Body.create({ text: 'يرجى اختيار الفيديو أو الصوت' }),
                    footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Anime Bot' }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: 'Anime Bot',
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

handler.command = ['anime'];
handler.help = ['anime'];
handler.tags = ['search'];
export default handler;