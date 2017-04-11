// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter';
// import qs from 'qs';
// import path from 'path';
// import fs from 'fs';
// // const fs = require('fs');
// import url from 'url';
//
// function fetchFileRespone(fileName) {
//   // console.log(fileName);
//   const filePath = path.join(__dirname, "/src/mock", fileName);
//   fs.exists(filePath, function(exists) {
//     let code = 200;
//     if (exists) {
//       const data = fs.readFileSync(filePath, 'utf-8');
//       return [code, data];
//     } else {
//       code = 404;
//       return [code, {}];
//     }
//   });
// }
//
// function init(){
//   const mock = new MockAdapter(axios);
//   debugger;
//   mock.onAny().reply(config => {
//     console.log(config);
//     console.log(config.url);
//     const urlObj = url.parse(config.url, true);
//     const fileName = urlObj.pathname;
//     if (/\.json$/.test(fileName)) {
//       let filePath = fileName ;
//       console.log(filePath);
//       return fetchFileRespone(filePath);
//     }
//     return [200, {}];
//   });
// }
//
// export default { init }
