import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "/api",
    timeout: 5000,
});

// 拦截器添加token
instance.interceptors.request.use(
    (config) => {
        if (localStorage.token) {
            config.headers.Authorization = localStorage.getItem("token");
        }
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);

// AXIOS 实例
const http = {
    get: instance.get,
    post: instance.post,
};

// 地址

const GETLIST = "/posts/getpostlist";
const GETDETAIL = "/posts/getsinglepost";
const POSTVISIT = "/posts/visit";
const GETCATES = "/cates/catepage";

const FEEDBACK = "/feedback";

const PICTUREUPLOAD = "/upload";

const VERIFYTOKEN = "users/verifytoken";
const SENDCODE = "/users/sendcode";
const LOGIN = "/users/login";
const REGIST = "/users/regist";
const GETUSER = "/users/getsingleuser";

const GETUSERLIKELIST = "/users/getuserlikelist";
const USERLIKETHEPOST = "/users/userlikethepost";
export {
    http,
    GETLIST,
    GETCATES,
    GETDETAIL,
    POSTVISIT,
    FEEDBACK,
    SENDCODE,
    LOGIN,
    REGIST,
    GETUSER,
    VERIFYTOKEN,
    PICTUREUPLOAD,
    GETUSERLIKELIST,
    USERLIKETHEPOST,
};
