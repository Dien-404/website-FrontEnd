import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";

export default function Home(props) {
    return (
        <div className="flex flex-col h-full">
            {/* 首页欢迎展示 */}
            <div
                className="sm:px-24 lg:px-32 xl:px-40 duration-300 h-64 sm:h-96 select-none mb-5 bg-cover bg-center"
                style={{
                    background:
                        "url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-04%2F5a4dea60a72e2.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673191610&t=2113e353f8b754aab1c3f8a5a840adf1)",
                }}
            >
                <div className="flex flex-col w-full h-full px-5">
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
                </div>
            </div>
            {/* 主要内容部分 */}
            <div className="grow sm:px-24 lg:px-32 xl:px-40 py-1 duration-300 bg-gray-50 flex flex-col">
                <div className="flex justify-center select-none">*精选*</div>
                {/* 功能板块 */}
                <div className="flex justify-end">
                    <Link
                        className="text-indigo-500 cursor-pointer"
                        to="/cate/all"
                    >
                        全部＋
                    </Link>
                </div>
                {/* 呈现板块 */}
                {/* 传入list属性，popular代表主页的精选帖子 */}
                <ArticleList list="popular" />
            </div>
        </div>
    );
}
