import pkg from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'apk') {
        if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' Facebook lite';
        let q = text;
        let apiUrl = `https://lovely-moral-asp.ngrok-free.app/api/apkpure?q=${q}`;
        let response = await fetch(apiUrl);
        if (!response.ok) throw 'Error fetching APK data';
        let apkData = await response.json();

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

        const interactiveMessage = {
            body: { text: "Choose an APK to download :" },
            footer: { text: "_by JeenTeam_" },
            header: {
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia({ image: { url: apkData[0].icon } }, { upload: conn.waUploadToServer }))
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
        if (!text) throw 'error';
        
        const json = text;
        const parsedData = JSON.parse(json);
        
        await m.reply("Please Wait 🫸🏻");
        
        const downloadUrl = parsedData.downloadUrl;
        const packageName = parsedData.packageName;
        let downloadType = parsedData.downloadType;

        if (downloadType !== 'apk' && downloadType !== 'xapk') {
            downloadType = 'apk';
        }

        let mimetype = (await fetch(downloadUrl, { method: 'HEAD' })).headers.get('content-type');
        if (!mimetype || mimetype !== 'application/vnd.android.package-archive') {
            mimetype = 'application/vnd.android.package-archive';
        }

        const size = (await fetch(downloadUrl, { method: 'HEAD' })).headers.get('Content-Length');
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
export default handler;