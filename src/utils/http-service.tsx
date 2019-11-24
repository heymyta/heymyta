import axios from 'axios';

class HttpService {
    service;
    constructor(){
<<<<<<< HEAD:src/utils/http-service.tsx
        this.service = axios.create({
            baseURL: `${process.env.SERVER_API_ENDPOINT_BASE}`
        });
        this.service.defaults.baseURL = `${process.env.SERVER_API_ENDPOINT}`
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
=======
        this.baseURL = `https://heymyta-server.glitch.me/api`;
        // this.baseURL = 'http://locahost:3004/api';
        this.service = axios.create({
            withCredentials: true
        });
        this.service.defaults.baseURL = this.baseURL;
        // this.service.interceptors.response.use(this.handleSuccess, this.handleError);
>>>>>>> dat_branch:src/services/http-service.ts
    }
    // handleSuccess(res){
    //     return res.data;
    // }
    // handleError(error){
        // switch (error.response.status) {
            //TODO: create these page. :)
            // case 401:
            //     this.redirectTo(document, '/')
            //     break;
            // case 404:
            //     this.redirectTo(document, '/404')
            //     break;
            // default:
            //     this.redirectTo(document, '/500')
            //     break;
        // }
        // return Promise.reject(error)
    // }
    redirectTo = (document, path) => {
        document.location = path
    }
    get(path, callback){
        console.log('path', path);
        return this.service.get(path).then(
            (res) => callback(res.status, res.data)
        );
    }

    post(path, payload, callback) {
        return this.service.request({
          method: 'POST',
          url: path,
          responseType: 'json',
          data: payload
        }).then(
            (response) => callback(response.status, response.data)
        );
    }

    async getAsync(path){
        const { data } = await this.service.get(path);
        return data;
    }

    async postAsync(path, payload){
        const { data } = await this.service.post(path, payload);
        return data;
    }

}

export default new HttpService();