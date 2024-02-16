/* eslint-disable @typescript-eslint/no-explicit-any */

// import { configuration } from '@/configuration';
// import axios, { CreateAxiosDefaults } from 'axios';
// const connections = {
//   dev: 'http://localhost:5000/',
//   prod: 'https://oneup.insync-softwares.com/api/',
// };

// export default class AxiosFactory {
//   static createInstance<T = any>(config?: CreateAxiosDefaults<T>) {
//     const basePath = connections[configuration.mode];
//     const _config = config ? config : ({} as CreateAxiosDefaults<any>);
//     const burl = _config.baseURL ? _config.baseURL : '';
//     _config.baseURL = basePath + burl;
//     _config.withCredentials = true;
//     return axios.create(_config);
//   }
// }
