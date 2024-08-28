let handler = async (m, { conn, args, text, usedPrefix, command }) => {
m.reply("hello");
};

handler.command = /^(doapk)$/i;
export default handler;