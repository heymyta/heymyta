import axios from 'axios';
import {toast} from 'react-toastify';

class HttpService {
    service;
    baseURL;
    constructor(){
        this.baseURL = `${process.env.REACT_APP_SERVER_API_ENDPOINT}`;
        this.service = axios.create({
            withCredentials: true,
            timeout: 300000 //300s = 5min
        });
        this.service.defaults.baseURL = this.baseURL;
    }

    get(path){
        return this.service.get(path).then((res)=>res.data)
        .catch((e) => {
            if(e.status == '502'){
                toast.error(`You are making to many request(${e.message})`);
            }else{
                toast.error(`error ${e.status}: ${e.message}`);
            }
        });
    }

    post(path, payload) {
        return this.service.request({
          method: 'POST',
          url: path,
          responseType: 'json',
          data: payload
        }).then((res)=>res.data)
        .catch((e) => {
            if(e.status == '502'){
                toast.error(`You are making to many request(${e.message})`);
            }else{
                toast.error(`error ${e.status}: ${e.message}`);
            }
        });
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