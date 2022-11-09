import React from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

export default function Home(props) {
    return (
        <div className="flex flex-col h-full">
            {/* 首页欢迎展示 */}
            <div className="sm:px-24 lg:px-32 xl:px-40 duration-300 h-64 select-none mb-5">
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
            <div className="grow sm:px-24 lg:px-32 xl:px-40 py-1 duration-300 bg-gray-50">
                <div className="flex justify-center select-none">*精选*</div>
                {/* 功能板块 */}
                <div className="flex justify-end">
                    <Link
                        className="text-indigo-500 cursor-pointer"
                        to="/articles"
                    >
                        全部＋
                    </Link>
                </div>
                {/* 呈现板块 */}
                <div className="h-full">
                    <ArticleCard />
                    <ArticleCard />
                </div>
            </div>
        </div>
    );
}
