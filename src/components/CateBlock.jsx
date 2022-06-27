import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollBeauty = styled.div`
    ::-webkit-scrollbar {
        height: 0.3125rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: gray;
    }
    ::-webkit-scrollbar-button {
        display: none;
    }
`;

export default function CateBlock(props) {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        setData([
            {
                postId: 1,
                picture:
                    "https://img0.baidu.com/it/u=3727699935,3926869265&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
                title: "如何使用Tailwind快速设计CSS12121212",
                description:
                    "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
                time: "",
                tag: [],
                fileAddr: "",
            },
            {
                postId: 2,
                picture:
                    "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
                title: "如何使用React",
                description:
                    "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
                time: "",
                tag: [],
                fileAddr: "",
            },
            {
                postId: 3,
                picture:
                    "https://img1.baidu.com/it/u=4027920460,3249220960&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
                title: "Javascript的使用教程之135",
                description:
                    "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
                time: "",
                tag: [],
                fileAddr: "",
            },
            {
                postId: 4,
                picture:
                    "https://img2.baidu.com/it/u=2738198884,3183508795&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
                title: "olypic",
                description:
                    "description and more contentand ………… description …………这里是关于以下打开内容的介绍详情这里是关于以下打开内开内容的介绍详情这里是关于以下打开内容的介绍详情",
                time: "",
                tag: [],
                fileAddr: "",
            },
        ]);
    }, []);
    return (
        <div className="flex flex-col mt-6" key={props.cateId}>
            {/* title && More */}
            <div className="flex justify-center items-center">
                <div className="flex flex-row items-end justify-between px-1 w-full max-w-md sm:max-w-none">
                    <div className="text-xl font-extrabold select-none">
                        {props.cate}
                    </div>
                    {/* More */}
                    <div
                        className={`text-sm px-1 ${
                            props.count > 4
                                ? "text-indigo-500 cursor-pointer"
                                : "text-gray-300 cursor-default"
                        }`}
                    >
                        全部＋
                    </div>
                </div>
            </div>

            {/* content */}
            <ScrollBeauty className="flex flex-col sm:flex-row items-center sm:justify-between pt-3 pb-1 overflow-x-auto">
                {data?.map((item) => (
                    <div
                        key={item.postId}
                        className="flex flex-col bg-white w-full sm:w-72 sm:flex-shrink-0 rounded mb-3 sm:mb-0 sm:mx-1"
                        style={{ maxWidth: "28rem" }}
                    >
                        {/* picture */}
                        <div className="h-64 sm:h-48 overflow-hidden">
                            <div
                                className="h-full bg-cover bg-center rounded-t duration-500 hover:scale-125"
                                style={{
                                    backgroundImage: `url(${item.picture})`,
                                }}
                            />
                        </div>

                        {/* introduce */}
                        <div className="px-4 py-1 overflow-hidden">
                            {/* title */}
                            <div className="h-6 overflow-hidden font-bold">
                                {item.title}
                            </div>
                            {/* description */}
                            <div className="h-24 overflow-hidden">
                                {item.description}
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollBeauty>
        </div>
    );
}
