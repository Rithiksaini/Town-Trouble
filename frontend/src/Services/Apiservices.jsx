import axios from 'axios'
import { toast } from "react-hot-toast"

export const BASE_URL = 'http://localhost:8000/'
class ApiServices {
  getToken() {
    let obj = {
      Authorization: sessionStorage.getItem("token"),
    };
    if (!obj) {
      toast.error("Please Login / Your session is expired please login again.");
    }
    return obj;
  }
  login(data) {
    return axios.post(BASE_URL + "user/login", data);
  }
  register(data) {
    return axios.post(BASE_URL + "customer/registeration", data);
  }
  allIssue(data) {
    return axios.post(BASE_URL + "customer/issue/all", data);
  }
  singleIssue(data) {
    return axios.post(BASE_URL + "customer/issue/single", data);
  }
  upvoteSingle(data) {
    return axios.post(BASE_URL + "customer/upvote/single", data);
  }
  upvoteAdd(data) {
    return axios.post(BASE_URL + "customer/upvote/add", data);
  }
  upvoteLength(data) {
    return axios.post(BASE_URL + "customer/upvote/length", data);
  }
  addIssue(data) {
    return axios.post(BASE_URL + "customer/issue/add", data, {
      headers: this.getToken(),
    });
  }
  updateIssue(data) {
    return axios.post(BASE_URL + "customer/issue/update", data, {
      headers: this.getToken(),
    });
  }
}
export default new ApiServices;