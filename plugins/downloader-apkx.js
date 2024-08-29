import pkg from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'apk') {
        if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' Facebook lite';
        await m.reply("*LOADING...*");
        let query = args.join(' ');
        let apiUrl = `https://apkpure.com/api/v1/search_suggestion_new?key=${encodeURIComponent(query)}&limit=20`;
        let response = await fetch(apiUrl);
        if (!response.ok) throw 'Error fetching APK data';
        let apkData = await response.json();
        if (!apkData || apkData.length === 0) throw 'No APK data found';

        const list = apkData.map((app, index) => {
            let json = JSON.stringify({
                downloadUrl: app.downloadUrl,
                downloadType: app.downloadType,
                packageName: app.packageName
            });

            return {
                title: `App ${index + 1}: ${app.title}`,
                rows: [
                    {
                        title: app.title,
                        id: `${usedPrefix}doapk ${json}`
                    }
                ]
            };
        });

        const sections = list.map((item) => {
            return {
                title: item.title,
                rows: item.rows
            };
        });

        const buttonParamsJson = JSON.stringify({
            title: "Available APKs",
            sections: sections
        });
        
        let icon = apkData[0].icon;
        if (!icon) throw 'No icon found for the APK!';

        const interactiveMessage = {
            body: { text: "Choose an APK to download :" },
            footer: { text: "_by JeenTeam_" },
            header: {
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia({ image: { url: icon } }, { upload: conn.waUploadToServer }))
            },
            nativeFlowMessage: {
                buttons: [{
                    name: "single_select",
                    buttonParamsJson
                }]
            }
        };

        const message = {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage
        };

        await conn.relayMessage(m.chat, { viewOnceMessage: { message } }, {});
    } else if (command === 'doapk') {
        if (!text) throw 'Error: No data provided.';
        
        const json = text;
        const parsedData = JSON.parse(json);
        
        await m.reply("Please Wait 🫸🏻");
        
        const downloadUrl = parsedData.downloadUrl;
        const packageName = parsedData.packageName;
        let downloadType = parsedData.downloadType;

        if (downloadType !== 'apk' && downloadType !== 'xapk') {
            downloadType = 'apk';
        }

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
handler.help = ['apk']
handler.tags = ['downloader']
export default handler;