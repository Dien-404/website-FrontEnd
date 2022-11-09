import React from "react";
import ArticleCard from "./ArticleCard";

export default function AllArticle() {
    // const post = {
    //     post_id: 1,
    //     post_title: "React 生命周期",
    //     post_tag: ["React", "基础", "组件"],
    //     post_description:
    //         "React 生命周期是 React 组件开发中必须掌握的基础，如何利用组件生命周期对组件的更新、卸载等有着不可或缺的重要性，其次对后期组件的维护有着极高的意义",
    //     likes: 3,
    //     visited: 0,
    //     create_time: "2022/11/9",
    // };
    // const post_number = 12;
    return (
        <div className="h-full flex flex-col items-center sm:px-24 lg:px-32 xl:px-40 py-1 duration-300 bg-gray-50">
            <span className="text-3xl font-serif font-bold my-4 select-none">
                Articles
            </span>
            <ArticleCard />
            <ArticleCard />
        </div>
    );
}
