import React, { useState, useEffect } from "react";

export default function Home(props) {
    const [sort, setSort] = useState("visited");
    const [recommendation, setRecommendation] = useState(undefined);

    useEffect(() => {
        setRecommendation([
            {
                id: "number",
                title: "string",
                tag: ["string", "string", "string"],
                desription:
                    "React 使创建交互式 UI变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时React 能有效地更新并正确地渲染组件。以声明式编写UI，可以让你的代码更加可靠，且方便调试。虚拟DOM具有批处理和高效的Diff算法，",
                likes: "number",
                Comment: "number",
                time: "number",
            },
            {
                id: "number",
                title: "string",
                tag: ["string", "string"],
                desription:
                    "为你应用的每一个状态设计简洁的视图，当数据改变时React 能有效地更新并正确地渲染组件。以声明式编写UI，可以让你的代码更加可靠，且方便调试。虚拟DOM具有批处理和高效的Diff算法，可以无需担心性能问题而随时“刷新”整个页面，因为虚拟DOM可以确保只对界面上真正变化的部分进行实际的DOM操作。",
                likes: "number",
                Comment: "number",
                time: "number",
            },
            {
                id: "number",
                title: "string",
                tag: ["string"],
                desription:
                    "React 使创建交互式 UI变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时React 能有效地更新并正确地渲染组件。以声明式编写UI，可以让你的代码更加可靠，且方便调试。虚拟DOM具有批处理和高效的Diff算法，可以无需担心性能问题而随时“刷新”整个页面，因为虚拟DOM可以确保只对界面上真正变化的部分进行实际的DOM操作。",
                likes: "number",
                Comment: "number",
                time: "number",
            },
            {
                id: "number",
                title: "stringstringstring",
                tag: ["string", "string", "string"],
                desription:
                    "React 使创建交互式 UI变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时React 能有效地更新并正确地渲染组件。以声明式编写UI，可以让你的代码更加可靠，且方便调试。虚拟DOM具有批处理和高效的Diff算法，可以无需担心性能问题而随时“刷新”整个页面，因为虚拟DOM可以确保只对界面上真正变化的部分进行实际的DOM操作。",
                likes: "number",
                Comment: "number",
                time: "number",
            },
        ]);
    }, []);

    return (
        <>
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
            <div className="sm:px-24 lg:px-32 xl:px-40 py-1 duration-300 bg-gray-50 select-none">
                <div className="flex justify-center">*精选*</div>
                {/* 功能板块 */}
                <div className="flex justify-end">
                    <div className="flex flex-row">
                        排序：
                        <div
                            className={`cursor-pointer px-1 mx-1 duration-500 ${
                                sort === "visited" &&
                                "text-red-300 cursor-default"
                            }`}
                            onClick={() => {
                                setSort("visited");
                            }}
                        >
                            浏览{sort === "visited" && <span>↓</span>}
                        </div>
                        <div
                            className={`cursor-pointer px-1 mx-1 duration-500 ${
                                sort === "newest" &&
                                "text-red-300 cursor-default"
                            }`}
                            onClick={() => {
                                setSort("newest");
                            }}
                        >
                            最新{sort === "newest" && <span>↓</span>}
                        </div>
                    </div>
                </div>
                {/* 呈现板块 */}
                <div className="">
                    {/* 遍历推荐列表 */}
                    {recommendation?.map((item) => (
                        <div className="h-auto flex flex-col px-3 sm:p-2 mb-5 bg-white rounded duration-300">
                            {/* Title && Tag */}
                            <div className="flex flex-col sm:flex-row mb-4">
                                {/* Title */}
                                <div className="text-3xl sm:pr-2">
                                    {item.title}
                                </div>
                                {/* Tag */}
                                <div className="text-xs flex flex-row items-end">
                                    {/* 遍历tag标签 */}
                                    {item.tag.map((tag) => (
                                        <div className="px-2 ring-1 ring-gray-300 mr-2">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Description */}
                            <div className="overflow-hidden max-h-24">
                                {item.desription}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
