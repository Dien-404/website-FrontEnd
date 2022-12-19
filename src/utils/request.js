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
const GETLIST = "/posts/getpostlist";
const GETCATES = "/cates/catepage";
const GETDETAIL = "/posts/getsinglepost";
const FEEDBACK = "/feedback";
const SENDCODE = "/users/sendcode";
const LOGIN = "/users/login";
const REGIST = "/users/regist";

export {
    http,
    GETLIST,
    GETCATES,
    GETDETAIL,
    FEEDBACK,
    SENDCODE,
    LOGIN,
    REGIST,
};
