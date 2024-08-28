import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("تحويل نص ل  تعليق جذاب مثال : \n\n *.elevenlab* hello how are you silana bot")
  conn.sendMessage(m.chat, {
    audio: { url: `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(text)}&key=Bell409&voice=bella` }, 
    mimetype: "audio/mpeg", 
    ptt: true 
  }, { quoted: m })
}

handler.command = ['elevenlab']
handler.help = ['elevenlab']
handler.tags = ['misc']
export default handler
