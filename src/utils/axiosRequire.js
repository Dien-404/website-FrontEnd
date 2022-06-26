import axios from "axios";

const instance = axios.create({
    // baseURL: "http://120.25.241.44:8080",
    baseURL: "localhost:3000",
    // timeout: 1000,
});

const foo = {
    get: instance.get,
    post: instance.post,
};

export default foo;
