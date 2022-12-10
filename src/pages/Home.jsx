import React from "react";
import Content from "../components/basic/Content";
import PostList from "../components/postController/PostList";

export default function Home(props) {
    return (
        <div className="flex flex-col items-center h-full">
            {/* 首页欢迎展示 */}
            <div
                className="flex justify-center w-full h-64 sm:h-96 select-none mb-5 duration-300"
                style={{
                    background:
                        "url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-04%2F5a4dea60a72e2.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673191610&t=2113e353f8b754aab1c3f8a5a840adf1)",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            >
                <Content className="flex flex-col h-full">
                    <div
                        className="flex items-end h-full font-serif text-6xl text-indigo-300 capitalize"
                        style={{
                            textShadow: ".4375rem .1875rem .3125rem #ddd",
                        }}
                    >
                        welcome
                    </div>
                    <div className="flex justify-end items-center h-10 text-gray-400">
                        浏览量：{100}
                    </div>
                </Content>
            </div>
            {/* 主要内容部分 */}
            <Content className="grow flex flex-col items-center">
                <PostList postType="popular" />
            </Content>
        </div>
    );
}
