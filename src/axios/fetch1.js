
import axios from 'axios';//引入axios

//设置token
axios.defaults.headers.common['Content-type'] = "application/json";

export function fetch(options){
  return axios(options);
}