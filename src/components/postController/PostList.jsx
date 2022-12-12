import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Content from "../basic/Content";
import { Like, Visit } from "../../assets/SVG";

function PostCard(props) {
    const {
        _id,
        title,
        cate,
        subclass,
        tag,
        description,
        background,
        like,
        visit,
        createTime,
        comment,
    } = props.post;

    return (
        <Link
            className="bg-white mb-5 flex flex-col sm:rounded md:flex-row shadow"
            to={`/post/${_id}`}
        >
            {/* 详细信息 */}
            <div className="flex flex-col px-4 pt-4 pb-2 cursor-pointer">
                {/* 标题 */}
                <div className="text-2xl font-bold mb-2 duration-500 text-sky-500 hover:text-emerald-400">
                    {title}
                </div>
                {/* 标签、创建时间、访客、点赞 */}
                <div className="flex flex-row justify-between items-center select-none">
                    {/* 标签、创建时间 */}
                    <span className="w-auto text-xs text-gray-500 cursor-default">
                        {/* 标签 */}
                        {tag.map((item, index) => {
                            return (
                                <span
                                    key={index + item}
                                    className="mr-2 px-1 border border-gray-500"
                                >
                                    {item}
                                </span>
                            );
                        })}
                        {/* 创建时间 */}
                        <span>{createTime}</span>
                    </span>
                    <span className="flex flex-row font-mono cursor-default">
                        {/* 访客 */}
                        <span className="flex flex-row mr-3">
                            <Visit />
                            <span className="ml-1">{visit}</span>
                        </span>
                        {/* 点赞 */}
                        <span className="flex flex-row">
                            <Like />
                            <span className="ml-1">{like}</span>
                        </span>
                    </span>
                </div>
                {/* 描述 */}
                <div
                    className="overflow-hidden text-ellipsis mt-1"
                    style={{ height: "6rem" }}
                >
                    {description}
                </div>
            </div>
            {/* 展示图片 */}
            <div
                className="md:w-48 lg:w-56 duration-300 shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            />
        </Link>
    );
}

export default function PostList(props) {
    const { cateType } = useParams();
    const { isHomePage } = props;
    const [posts, setPosts] = useState([
        {
            _id: 1,
            title: "React 生命周期",
            tag: ["React", "基础", "组件"],
            description:
                "React 生命周期是 React 组件开发中必须掌握的基础，如何利用组件生命周期对组件的更新、卸载等有着不可或缺的重要性，其次对后期组件的维护有着极高的意义",
            background:
                "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
            like: 3,
            visit: 0,
            createTime: "2022/11/9",
        },
        {
            _id: 2,
            title: "React 生命周期",
            tag: ["React", "基础", "组件"],
            description:
                "React 生命周期是 React 组件开发中必须掌握的基础，如何利用组件生命周期对组件的更新、卸载等有着不可或缺的重要性，其次对后期组件的维护有着极高的意义",
            background:
                "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
            like: 3,
            visit: 0,
            createTime: "2022/11/9",
        },
        {
            _id: 3,
            title: "React 生命周期",
            tag: ["React", "基础", "组件"],
            description:
                "React 生命周期是 React 组件开发中必须掌握的基础，如何利用组件生命周期对组件的更新、卸载等有着不可或缺的重要性，其次对后期组件的维护有着极高的意义",
            background:
                "https://img0.baidu.com/it/u=3650583406,3707431716&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
            like: 3,
            visit: 0,
            createTime: "2022/11/9",
        },
    ]);

    return (
        <div className="h-full flex flex-col items-center">
            {/* 标题 */}
            <div className="text-4xl font-bold tracking-wide select-none my-3">
                {/* 优先展示路由 */}
                {cateType === undefined
                    ? isHomePage === undefined
                        ? ""
                        : "Top Ten"
                    : cateType}
            </div>

            {/* ***** */}
            {/* 仅首页展示 */}
            <div
                className={`${
                    isHomePage === true ? "flex" : "hidden"
                } w-full flex-row justify-end mb-1`}
            >
                <Link className="text-indigo-500 cursor-pointer" to="/cate/all">
                    全部＋
                </Link>
            </div>
            {/* ***** */}

            {/* 列表渲染post */}
            <Content className="grow flex flex-col items-center">
                {posts.map((item, index) => (
                    <PostCard key={index + item.title} post={item} />
                ))}
            </Content>
        </div>
    );
}
