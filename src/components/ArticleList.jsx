import React from "react";

function ArticleCard(props) {
    const post = {
        post_id: 1,
        post_title: "React 生命周期",
        post_tag: ["React", "基础", "组件"],
        post_description:
            "React 生命周期是 React 组件开发中必须掌握的基础，如何利用组件生命周期对组件的更新、卸载等有着不可或缺的重要性，其次对后期组件的维护有着极高的意义",
        post_background:
            "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
        likes: 3,
        visited: 0,
        create_time: "2022/11/9",
    };
    return (
        <div className="bg-white mb-3 flex flex-col sm:rounded md:flex-row shadow-sm md:shadow">
            <div className="flex flex-col px-2 py-1 cursor-pointer">
                <div className="text-2xl">{post.post_title}</div>
                <div className="flex flex-row text-xs text-gray-500 select-none">
                    {post.post_tag.map((item) => {
                        return (
                            <span className="mr-2 px-1 border border-gray-500">
                                {item}
                            </span>
                        );
                    })}
                    <div className="">{post.create_time}</div>
                </div>
                <div
                    className="overflow-hidden text-ellipsis"
                    style={{ height: "4.5rem" }}
                >
                    {post.post_description}
                </div>
            </div>
            <div className="relative w-full px-2 md:p-0 md:w-32 lg:w-48 duration-300 shrink-0 font-mono">
                {/* 图片 */}
                <div
                    className="absolute w-full h-full hidden md:block bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.post_background})` }}
                />
                {/* 显隐内容 */}
                <div className="relative z-10 w-full h-full flex flex-row md:flex-col duration-300 select-none md:hover:bg-white md:text-transparent md:hover:text-black">
                    <div className="">小红花: {post.likes}</div>
                    <div className="">访客量: {post.visited}</div>
                </div>
            </div>
        </div>
    );
}

export default function ArticleList(props) {
    return (
        <div className="grow flex flex-col justify-between">
            {/* 文章卡片 */}
            <div className="">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
            </div>
            {/* 目录 */}
            <div className="flex justify-center items-center">1234567</div>
        </div>
    );
}
