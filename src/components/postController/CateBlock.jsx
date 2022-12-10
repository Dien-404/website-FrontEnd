import React from "react";
import { Link } from "react-router-dom";
import ScrollBarBeauty from "../ScrollBarBeauty";

export default function CateBlock(props) {
    const { subclass, count } = props;
    const posts = [
        {
            _id: 1,
            background:
                "https://img0.baidu.com/it/u=3727699935,3926869265&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            title: "如何使用Tailwind快速设计CSS12121212",
            description:
                "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
            createTime: "",
            tag: [],
            like: 0,
            visit: 0,
        },
        {
            _id: 2,
            background:
                "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
            title: "如何使用React",
            description:
                "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
            createTime: "",
            tag: [],
            like: 0,
            visit: 0,
        },
        {
            _id: 3,
            background:
                "https://img1.baidu.com/it/u=4027920460,3249220960&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            title: "Javascript的使用教程之135",
            description:
                "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
            createTime: "",
            tag: [],
            like: 0,
            visit: 0,
        },
        {
            _id: 4,
            background:
                "https://img2.baidu.com/it/u=2738198884,3183508795&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
            title: "olypic",
            description:
                "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
            createTime: "",
            tag: [],
            like: 0,
            visit: 0,
        },
    ];

    return (
        <div
            className="flex flex-col mt-6 max-w-md sm:max-w-none"
            key={subclass}
        >
            {/* title && More */}
            <div className="flex flex-row justify-between px-1 w-full">
                {/* 标签 title */}
                <div className="text-xl font-extrabold select-none">
                    {subclass}
                </div>
                {/* count>4? More */}
                <Link
                    className={`text-sm px-1 ${
                        count > 4
                            ? "text-indigo-500 cursor-pointer"
                            : "text-gray-300 cursor-default"
                    }`}
                    to={count > 4 ? `/cate/${subclass}` : ""}
                >
                    全部＋
                </Link>
            </div>

            {/* posts */}
            <ScrollBarBeauty className="flex flex-col sm:flex-row items-center sm:justify-start pt-3 pb-1 overflow-x-auto">
                {/* 渲染 */}
                {posts.map((postItem) => (
                    <Link
                        key={postItem._id}
                        className="flex flex-col bg-white w-full sm:w-72 sm:flex-shrink-0 rounded mb-3 sm:mb-0 sm:mx-1 cursor-pointer"
                        to={`/post/${postItem._id}`}
                    >
                        {/* background */}
                        <div className="h-64 sm:h-48 overflow-hidden">
                            <div
                                className="h-full bg-cover bg-center rounded-t duration-500 hover:scale-125"
                                style={{
                                    backgroundImage: `url(${postItem.background})`,
                                }}
                            />
                        </div>
                        {/* introduce */}
                        <div className="px-4 py-1 overflow-hidden">
                            {/* title */}
                            <div className="h-6 overflow-hidden font-bold">
                                {postItem.title}
                            </div>
                            {/* description */}
                            <div className="h-24 overflow-hidden">
                                {postItem.description}
                            </div>
                        </div>
                    </Link>
                ))}
            </ScrollBarBeauty>
        </div>
    );
}
