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

console.log(jsonToParamString(jsonParams));