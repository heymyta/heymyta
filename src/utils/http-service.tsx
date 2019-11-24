import axios from 'axios';

class HttpService {
    service;
    constructor(){
        this.service = axios.create({
            baseURL: `heymyta-server.glitch.me/`
        });
        this.service.defaults.baseURL = 'https://heymyta-server.glitch.me/api'
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    }
    handleSuccess(res){
        return res;
    }
    handleError(error){
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
        return Promise.reject(error)
    }
    redirectTo = (document, path) => {
        document.location = path
    }
    async get(path, callback){
        console.log('path', path);
        return this.service.get(path).then(
            (res) => callback(res.status, res.data)
        );
    }

    async post(path, payload, callback) {
        return this.service.request({
          method: 'POST',
          url: path,
          responseType: 'json',
          data: payload
        }).then(
            (response) => callback(response.status, response.data)
        );
    }

}

export default new HttpService();