
const ns = {}
ns.NODE_URL = ''
ns.wechatConfig = {
    appid: '',
    mchid: '',
    partnerKey: '',// appsecret
}

for(let prop in ns) {
   if(ns.hasOwnProperty(prop)) {
     module.exports[prop] = ns[prop];
   }
}