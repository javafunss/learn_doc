function jsonToParamString(jsonObj) {
    let paramString = "";
    for (let key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            // 避免编码问题，可选：paramString += encodeURIComponent(key) + ": " + encodeURIComponent(jsonObj[key]) + "\n";
            paramString += key + ":" + jsonObj[key] + "\n";
        }
    }
    return paramString.trim(); // 移除最后的换行符
}

let jsonParams = {
  phone: "18580360183",
  nickName: "李鹏学生6",
  birthDay: "2020-01-01",
  role: 1,
  gender: "2",
  avatra: "https://applinks.61cczj.com/cat_img_v3/WechatIMG12201.jpg",
  appId: "1380447381118427138",
  kindergartenId: "1631855037754011650",
  classId: "1767025798247727106",
  playerId: "1699964609554886657",
};
console.log(jsonToParamString(jsonParams));