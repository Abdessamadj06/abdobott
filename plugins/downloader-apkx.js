import pkg from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' name app';
    let q = args[0];
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
                    id: `.doapk`
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
        footer: { text: "_by Mee6Team_" },
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
};

handler.command = /^(apk)$/i;
export default handler;