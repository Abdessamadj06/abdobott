import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) {
        conn.reply(m.chat, `من فضلك أدخل اسم الأنمي الذي ترغب في البحث عنه.`, m);
        return;
    }

    try {
        let searchQuery = encodeURIComponent(text);
        let url = `https://web.animerco.org/?s=${searchQuery}`;
        let response = await fetch(url);
        let html = await response.text();

        // هنا يمكنك استخدام مكتبة لتحليل HTML إذا كانت النتائج تأتي على شكل HTML
        // بدلاً من ذلك، يمكن استخدام تعبيرات عادية للبحث عن الروابط أو العناوين في المحتوى النصي
        
        // بعد تحليل النتيجة، يمكنك بناء قائمة بالإختيارات
        let listSections = [
            {
                title: `نتائج البحث`,
                rows: [
                    {
                        title: "نتيجة 1",
                        description: `وصف النتيجة 1`,
                        id: `${usedPrefix}animeresult 1`
                    },
                    {
                        title: "نتيجة 2",
                        description: `وصف النتيجة 2`,
                        id: `${usedPrefix}animeresult 2`
                    }
                ]
            }
        ];

        await conn.sendList(m.chat, `*نتائج*\n`, `نتائج البحث عن: ${text}`, `بحث`, listSections, m);
    } catch (e) {
        m.reply(`يرجى المحاولة مرة أخرى.`);
        console.log(e);
    }
};

handler.command = /^animebuscar|anime(سيرش)?$/i;

export default handler;
