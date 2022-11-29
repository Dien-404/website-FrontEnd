import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticlePost from "./ArticlePost";

export default function ArticleId() {
    const { id } = useParams();
    // 此处需要根据 id 获取文章信息
    // 文章信息模板
    const articlePost = {
        id: 1,
        title: "React 生命周期",
        tag: ["react", "进阶"],
        description: "这是一条关于文章的说明",
        background: undefined,
        likes: 121,
        visited: 121,
        create_time: "2022/11/13",
        value: [
            {
                type: "parallel",
                content: ["这里是文章主体内容，采用markdown语法规则"],
            },
            { type: "parallel", content: ["# 一级标题不匹配"] },
            { type: "title", titleType: "second", content: ["二级标题"] },
            { type: "title", titleType: "third", content: ["三级标题"] },
            {
                type: "parallel",
                content: [
                    "",
                    {
                        italic: false,
                        bold: true,
                        code: false,
                        content: "加粗字体",
                    },
                    "",
                ],
            },
        ],
    };
    const { title, tag, description, likes, visited, create_time, value } =
        articlePost;
    useEffect(() => {
        console.log(id);
    });

    return (
        <div className="h-full bg-gray-50 flex justify-center">
            <div className="w-full max-w-xl sm:max-w-4xl lg:max-w-5xl duration-300 flex flex-row justify-between py-2">
                {/* 内容展示部分 */}
                <ArticlePost
                    title={title}
                    tag={tag}
                    description={description}
                    likes={likes}
                    visited={visited}
                    create_time={create_time}
                    value={value}
                />
                {/* 点赞评论等功能放入此处 */}
                <div className="w-44 shrink-0 ml-4 hidden md:block">
                    <div className="sticky top-16 bg-white rounded shadow w-full">
                        目录
                    </div>
                </div>
            </div>
        </div>
    );
}
