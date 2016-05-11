var _=require('./lodash.js');
var dat=require('./data.js');
dat=dat.data;
console.log(JSON.stringify(_.take(dat,8000)));
