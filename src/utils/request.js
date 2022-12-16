import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "/api",
    timeout: 5000,
});

// AXIOS 实例
const http = {
    get: instance.get,
    post: instance.post,
};

// 地址
const GETLIST = "/posts/getlist";
const GETCATES = "/cates/getcates";
const GETDETAIL = "/posts/getdetail";
const SENDMAIL = "/sendmail";

export { http, GETLIST, GETCATES, GETDETAIL, SENDMAIL };
