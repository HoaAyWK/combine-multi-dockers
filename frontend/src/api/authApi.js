import axiosClient from "./axiosClient";
const authApi = {
  login(data) {
    const url = "/api/v1/Auth/login";
    return axiosClient.post(url, data);
  },
};
export default authApi;
