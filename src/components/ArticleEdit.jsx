import React, { useState, useEffect } from "react";
// import { useDeferredValue } from "react";
import ArticlePost from "./ArticlePost";

export default function ArticleEdit() {
    const [postValue, setPostValue] = useState(
        "这里是文章主体内容，采用markdown语法规则\n# 一级标题不匹配\n## 二级标题\n### 三级标题\n**加粗字体**"
    );
    // const deferredValue = useDeferredValue(postValue, { timeoutMs: 2000 });
    const [articlePost, setArticlePost] = useState({
        title: "这里是文章主标题",
        description: "这是是关于文章的说明",
        value: [],
    });
    useEffect(() => {
        setArticlePost({ ...articlePost, value: postValue.split("\n") });
    }, [postValue]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row justify-evenly">
                <div className="w-full flex-col m-2">
                    <div className="flex mb-2 items-center">
                        <label className="select-none mr-2">文章标题</label>
                        <input
                            type="text"
                            maxLength="25"
                            className="ring-1 grow p-1 outline-none focus:ring-lime-500 duration-300"
                            value={articlePost.title}
                            onChange={(e) => {
                                setArticlePost({
                                    ...articlePost,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="flex mb-2 items-center">
                        <label className="select-none mr-2">文章描述</label>
                        <textarea
                            rows="4"
                            className="ring-1 grow p-1 resize-none outline-none focus:ring-lime-500 duration-300"
                            value={articlePost.description}
                            onChange={(e) => {
                                setArticlePost({
                                    ...articlePost,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="w-full m-2 flex flex-row">
                    {/* 左栏 */}
                    <div className="flex flex-col">
                        {/* 文章标签 */}
                        <div className="flex mb-2 items-center">
                            <label className="select-none mr-2">文章标签</label>
                            <input
                                type="text"
                                placeholder="以英文字符,分开多个标签"
                                className="ring-1 grow p-1 outline-none focus:ring-lime-500 duration-300"
                            />
                        </div>
                        {/* 背景图片 */}
                        <div className="flex mb-2 items-center">
                            <label className="select-none mr-2">背景图片</label>
                            {/* <input type="file" /> */}
                        </div>
                    </div>
                    {/* 右栏 */}
                    <div className="flex flex-col">
                        <div className="flex mb-2 items-center">上传文件</div>
                        <div className="flex mb-2 items-center">提交按钮</div>
                    </div>
                </div>
            </div>
            <div className="grow flex flex-row">
                <div className="flex flex-col w-1/2 border m-2 p-2">
                    <label className="select-none">文章内容:</label>
                    <textarea
                        className="w-full grow ring-1 p-1 resize-none outline-none focus:ring-lime-500 duration-300"
                        value={postValue}
                        onChange={(e) => {
                            setPostValue(e.target.value);
                        }}
                    />
                </div>
                <div className="w-1/2 border m-2 select-none overflow-hidden">
                    <ArticlePost articlePost={articlePost} />
                </div>
            </div>
        </div>
    );
}
