import _0x48cf12 from "yt-search";
const {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = await (await import("@adiwajshing/baileys")).default;
const handler = async (_0xf71aaf, {
  conn: _0x478b75,
  text: _0x3df0cf
}) => {
  if (!_0x3df0cf) {
    return _0xf71aaf.reply("البحث في اليوتوب مثال :\n.yts اخبار اليوم  ");
  }
  const _0x575381 = (await _0x48cf12(_0x3df0cf)).all;
  const _0x5cef98 = _0x575381.filter(_0x3c5aef => _0x3c5aef.type === "video");
  const _0xa39c2f = _0x575381.filter(_0x4f2c7d => _0x4f2c7d.type === "channel");
  const _0x298774 = "يرجى اختيار الفيديو الخاص بك أو ملفات الصوت الخاصة بك عن طريق النقر على الزر";
  const _0x5816b7 = _0xa39c2f.length ? _0xa39c2f[0].image : _0x5cef98.length ? _0x5cef98[0].image : urlmenu.main;
  const _0x3cf8b6 = [{
    title: "jeen bot",
    rows: [{
      header: "jeen bot",
    }]
  }];
  _0x5cef98.forEach(_0x4c97ff => {
    const _0x33fef2 = {
      title: _0x4c97ff.title,
      rows: [{
        title: "على شكل فيديو",
        description: "Get video from \"" + _0x4c97ff.title + "\"",
        id: ".ytmp4 " + _0x4c97ff.url
      }, {
        title: "على شكل موسيقى",
        description: "Get audio from \"" + _0x4c97ff.title + "\"",
        id: ".play " + _0x4c97ff.url
      }]
    };
    _0x3cf8b6.push(_0x33fef2);
  });
  const _0x50ed44 = {
    title: "إضغط هنا !",
    sections: _0x3cf8b6
  };
  const _0x8ec024 = _0x50ed44;
  const _0x471972 = {
    text: _0x298774
  };
  const _0x562a6d = {
    url: _0x5816b7
  };
  const _0x310fac = {
    image: _0x562a6d
  };
  const _0x113075 = {
    upload: _0x478b75.waUploadToServer
  };
  const _0x3dfa77 = await generateWAMessageFromContent(_0xf71aaf.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create(_0x471972),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "jeen"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: "jeen bot",
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia(_0x310fac, _0x113075))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
              name: "single_select",
              buttonParamsJson: JSON.stringify(_0x8ec024)
            }]
          })
        })
      }
    }
  }, {});
  await _0x478b75.relayMessage(_0x3dfa77.key.remoteJid, _0x3dfa77.message, {
    messageId: _0x3dfa77.key.id
  });
};
handler.command = ["ytsearch", "yts"];
handler.help = "ytsearch";
handler.tags = "search";
export default handler;