import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw 'Usage: ' + usedPrefix + command + ' <app name>';

    await m.reply('_Searching, please wait..._');

    try {
        let res = await apk(text);

        const message = `
*Name:* ${res.name}
*Downloads:* ${res.dc}
*Package:* ${res.path}
*File Size:* ${res.size}

> By majnon._.98
`;

        const fileName = `${res.path}.${res.format}`;

        await Promise.all([
            conn.sendMessage(m.chat, { image: { url: res.icon }, caption: message, footer: '_Apk files..._' }),
            conn.sendMessage(m.chat, { document: { url: res.dl }, mimetype: res.mimetype, fileName: fileName }, { quoted: m })
        ]);
    } catch (error) {
        await m.reply(`Error: ${error.message}`);
    }
}

handler.command = /^(apk2)$/i;
export default handler;

async function apk(text) {
    try {
        let response = await fetch(`https://apkpure.com/api/v1/search_suggestion_new?key=${text}`);
        let data = await response.json();

        if (!data || !data.results || data.results.length === 0) throw new Error('No results found!');
        
        let app = data.results[0];
        let name = app.title || 'Unknown';
        let icon = app.icon || '';
        let dl = app.downloadUrl || '';
        let format = app.format || 'apk';  // Default to 'apk' if format is not provided
        let dc = app.downloadCount || '0';
        let path = app.packageName || 'unknown';
        
        let mimetype = (await fetch(dl, { method: 'head' })).headers.get('content-type');
        let getsize = (await fetch(dl, { method: 'head' })).headers.get('Content-Length');

        if (parseInt(getsize) > 500000000) {  // 500 MB
            throw new Error('The apk file size is too large. The maximum download size is 500 megabytes.');
        }
        
        let size = formatBytes(parseInt(getsize));
        return { name, icon, dl, dc, path, format, size, mimetype };
    } catch (error) {
        throw new Error(`Error fetching APK data: ${error.message}`);
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}