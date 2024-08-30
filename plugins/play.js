import _0x22db86 from "node-yt-dl";
const jann = async (_0x29d4c7, {
  text: _0x5dc799,
  command: _0x381a7f,
  usedPrefix: _0x4eeb70,
  conn: _0x40d980
}) => {
  if (!_0x5dc799) {
    throw "ما الأغنية التي تريدها؟، دعني أريك كيفية استخدام هذه الميزة\nمثال: " + (_0x4eeb70 + _0x381a7f) + " maher zain";
  }
  let _0x48bcf1 = await _0x22db86.search(_0x5dc799);
  let _0x5873cb = await _0x22db86.mp3(_0x48bcf1.data[0].url);
  let _0x10fd57 = "- العنوان : " + _0x48bcf1.data[0].title + "\n- القناة : " + _0x48bcf1.data[0].author.name + "\n- الرابط : " + _0x48bcf1.data[0].url + "\n\nتابعني على Instagram: instagram.com/noureddine_ouafy";
  const _0x2f7d60 = {
    url: _0x48bcf1.data[0].img
  };
  const _0x201083 = {
    image: _0x2f7d60,
    caption: _0x10fd57
  };
  let _0x5ccd67 = await _0x40d980.sendMessage(_0x29d4c7.chat, _0x201083, {
    quoted: _0x29d4c7
  });
  try {
    const _0x233449 = {
      url: _0x5873cb.media
    };
    const _0xcf13da = {
      audio: _0x233449,
      ptt: true,
      mimetype: "audio/mpeg"
    };
    const _0x1d7466 = {
      quoted: _0x5ccd67
    };
    await _0x40d980.sendMessage(_0x29d4c7.chat, _0xcf13da, _0x1d7466);
  } catch (_0x3e5975) {
    console.error(_0x3e5975);
    throw "عذراً، لم أتمكن من تشغيلها";
  }
};
handler.help = handler.command = ["play"];
handler.tags = ["downloader"];
export default handler;