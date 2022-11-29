import axios from "axios";

const instance = axios.create({
    // baseURL: "http://120.25.241.44:8000",
    baseURL: "localhost:3000",
    timeout: 5000,
});

const myHttp = {
    get: instance.get,
    post: instance.post,
};

// 行内块标签对象
function InlineStyle({
    italic = false,
    bold = false,
    code = false,
    content = undefined,
}) {
    return {
        italic,
        bold,
        code,
        content,
    };
}

// 块级标签对象
// 标题
function Title({ type = "title", titleType = "dafault", content }) {
    return {
        type,
        titleType,
        content,
    };
}
// 代码块
function Code({ type = "code", codeType = "undefine", content }) {
    return {
        type,
        codeType,
        content,
    };
}
// 资源
function Asset({
    type = "asset",
    assetType,
    alt = "图片描述",
    src = "wrong src",
}) {
    return {
        type,
        assetType,
        alt,
        src,
    };
}
// 列表
function List({ type = "list", listType = false, content }) {
    return {
        type,
        listType,
        content,
    };
}
// 段落
function Parallel({ type = "parallel", content }) {
    return {
        type,
        content,
    };
}

export { InlineStyle, Title, Code, Asset, List, Parallel, myHttp };
