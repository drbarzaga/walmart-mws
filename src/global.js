global.uuid = uuid;
global.base_64 = base_64;
global.token = null;

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function base_64(data) {
  return Buffer.from(data, "binary").toString("base64");
}
