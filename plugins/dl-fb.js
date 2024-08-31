import _0xa5f472 from "axios";
import _0x425fbc from "cheerio";
let handler = async (_0x4a374a, {
  conn: _0x2392e8,
  command: _0x398195,
  args: _0x1588a0,
  text: _0x4b93c5,
  usedPrefix: _0x5b9b61
}) => {
  let _0x3ce183 = "[!] التحميل من الفيسبوك على شكل فيديو او مقطع صوتي نكتب الامر متبوع ب صيغة التي تريدها ثم  رابط الفيديو مثال :\n\n\t• hd\n\t• audio\n\n" + (_0x5b9b61 + _0x398195) + " hd https://www.facebook.com/100063533185520/videos/1177527700278287";
  if (!_0x4b93c5) {
    return _0x4a374a.reply(_0x3ce183);
  }
  const {
    code: _0x1cda34,
    title: _0x3cea52,
    link: _0x54d5f9,
    hd: _0x39a5e1,
    audio: _0x111070
  } = await facebook(_0x1588a0[1] || _0x1588a0[0] || _0x4b93c5);
  if (_0x1cda34 !== 200) {
    throw "ups.. server down";
  }
  await _0x2392e8.sendMessage(_0x4a374a.chat, {
    react: {
      text: "🕑",
      key: _0x4a374a.key
    }
  });
  const _0x6f1cb2 = {
    url: _0x54d5f9
  };
  if (_0x1588a0[0] == "hd") {
    await _0x2392e8.sendMessage(_0x4a374a.chat, {
      react: {
        text: "✅",
        key: _0x4a374a.key
      }
    });
    const _0xa2c1cd = {
      url: _0x39a5e1
    };
    const _0x3354fd = {
      video: _0xa2c1cd,
      caption: "乂 *F A C E B O O K*\n\n" + _0x3cea52 + "\n\n*quality*: HD\n*url*: " + _0x1588a0[1] + "\n\n\n instagram.com/abdoo._.98"
    };
    await _0x2392e8.sendMessage(_0x4a374a.chat, _0x3354fd, {
      quoted: _0x4a374a
    });
  } else if (_0x1588a0[0] == "audio") {
    await _0x2392e8.sendMessage(_0x4a374a.chat, {
      react: {
        text: "✅",
        key: _0x4a374a.key
      }
    });
    const _0x2a54e0 = {
      url: _0x111070
    };
    const _0x59cc4f = {
      audio: _0x2a54e0,
      mimetype: "audio/mpeg",
      ptt: false
    };
    await _0x2392e8.sendMessage(_0x4a374a.chat, _0x59cc4f, {
      quoted: _0x4a374a
    });
  } else {
    await _0x2392e8.sendMessage(_0x4a374a.chat, {
      video: _0x6f1cb2,
      caption: "乂 *F A C E B O O K*\n\n" + _0x3cea52 + "\n\n*url*: " + _0x1588a0[0] + "\n\n\n instagram.com/abdoo._.98"
    }, {
      quoted: _0x4a374a
    });
  }
};
handler.help = ["facebook audio", "facebook hd", "facebook"].map(_0x26c89f => "faceebook2 " + _0x26c89f);
handler.tags = ["downloader"];
handler.command = /^(facebook|fbdl|fb|facebookdl2)$/i;
export default handler;
async function facebook(_0x29342e) {
  return new Promise((_0x367d42, _0x201572) => {
    const _0x3facda = {
      url: _0x29342e
    };
    _0xa5f472.post("https://www.getfvid.com/downloader", new URLSearchParams(Object.entries(_0x3facda)), {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36"
      }
    }).then(({
      data: _0x543135
    }) => {
      const _0x3a2acc = _0x425fbc.load(_0x543135);
      const _0x4af063 = {
        code: 200
      };
      _0x4af063.title = _0x3a2acc("div.download-links > div.card > div.row > div:nth-child(2) > div > h5 > a").text();
      _0x4af063.hd = _0x3a2acc("div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href");
      _0x4af063.link = _0x3a2acc("div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href");
      _0x4af063.audio = _0x3a2acc("div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href");
      _0x367d42(_0x4af063);
    }).catch(_0x46442d => _0x201572({
      code: 503,
      status: false,
      result: _0x46442d
    }));
  });
}