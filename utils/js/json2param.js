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

let jsonParams = {"playerId":"1601035471309930497","role":"1","phone":"18580360183","gender":"1","birthDate":"2023-01-22","avatra":"http://uban.61cczj.com/FodPxDvCs5Wrs-nCOv4fN8YhH5Dk","nickName":"牟某某1","familyPlayerId":"1427238761812111361"}
console.log(jsonToParamString(jsonParams));