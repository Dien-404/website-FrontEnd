import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Content from "../basic/Content";
import { Like, Visit } from "../../assets/SVG";
import { format } from "../../utils/timeTransfer";
import { http, GETLIST } from "../../utils/request";

function PostCard(props) {
    const {
        _id,
        title,
        // cate,
        // subclass,
        tag,
        description,
        background,
        like,
        visit,
        createTime,
        // comment,
    } = props.post;

    return (
        <Link
            className="w-full bg-white mb-5 flex flex-col sm:rounded md:flex-row md:justify-between shadow"
            to={`/post/${_id}`}
        >
            {/* 详细信息 */}
            <div className="flex flex-col grow px-4 pt-4 pb-2 cursor-pointer">
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
                        <span>{format(createTime)}</span>
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
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            let myreq =
                isHomePage === true
                    ? { postType: "index", num: 10 }
                    : cateType === "all"
                    ? {}
                    : { postType: "cate", cate: cateType, subclass: cateType };

            const res = await http.post(GETLIST, myreq);
            if (res.status === 200) {
                setPosts(res.data.data);
            }
        })();
    }, [cateType, isHomePage]);

    return (
        <div className="h-full w-full flex flex-col items-center">
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
                className={`w-full flex-row justify-end mb-1 ${
                    isHomePage === true ? "flex" : "hidden"
                }`}
            >
                <Link
                    className={`${
                        posts.length === 0
                            ? "text-gray-300 cursor-default"
                            : "text-indigo-500 cursor-pointer"
                    }`}
                    to={posts.length === 0 ? "" : "/cate/all"}
                >
                    全部＋
                </Link>
            </div>
            {/* ***** */}

            {/* 列表渲染post */}
            <Content className="grow flex flex-col items-center">
                {posts.length === 0 ? (
                    <div className="w-full flex justify-center items-center">
                        暂无相关内容
                    </div>
                ) : (
                    posts.map((item, index) => (
                        <PostCard key={index + item.title} post={item} />
                    ))
                )}
            </Content>
        </div>
    );
}
