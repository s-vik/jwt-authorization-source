import * as axios from "axios";

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "http://142.93.134.108:1111/",
});

export const authAPI = {
  async createUser(email, password) {
    return await instance.post(`sign_up`, { email, password });
  },
  async loginUser(email, password) {
    return await instance.post(`login?email=${email}&password=${password}`);
  },
  async me() {
    return await instance.get("me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  async refresh() {
    return await instance.post(
      "refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
  },
};
