import pkg from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { generateWAMessageFromContent, prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'apk') {
        if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' Free Fire';
        await m.reply("*LOADING...*");

        let query = text;
        let apiUrl = `https://apkpure.com/api/v1/search_suggestion_new?key=${encodeURIComponent(query)}&limit=20`;
        let response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (!response.ok) throw 'Error fetching APK data';

        let apkData = await response.json();
        if (!apkData || apkData.length === 0) throw 'No APK data found';

        const sections = apkData.map((app, index) => {
            let json = JSON.stringify({
                downloadUrl: app.fullDownloadUrl,
                packageName: app.packageName
            });

            return {
                title: `${app.title} (${app.version})`,
                rowId: `${usedPrefix}doapk ${json}`,
                description: `Installations: ${app.installTotal}, Rating: ${app.score}`
            };
        });

        let listMessage = {
            text: 'Choose an APK to download:',
            footer: '_by JeenTeam_',
            title: 'Available APKs',
            buttonText: 'Select APK',
            sections: [{
                title: "Search Results",
                rows: sections
            }]
        };

        await conn.sendMessage(m.chat, { listMessage }, { quoted: m });

    } else if (command === 'doapk') {
        if (!text) throw 'Error: No data provided.';

        const json = text;
        const parsedData = JSON.parse(json);

        await m.reply("Please Wait 🫸🏻");

        const downloadUrl = parsedData.downloadUrl;
        const packageName = parsedData.packageName;
        let downloadType = 'apk';

        let response = await fetch(downloadUrl, { method: 'HEAD' });
        let mimetype = response.headers.get('content-type');
        let size = response.headers.get('Content-Length');

        if (size > 699 * 1024 * 1024) throw 'File size exceeds 699 MB';

        const fileName = `${packageName}.${downloadType}`;

        await conn.sendMessage(
            m.chat,
            { document: { url: downloadUrl }, mimetype: mimetype, fileName: fileName },
            { quoted: m }
        );
    }
};

handler.command = /^(apk|doapk)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
export default handler;