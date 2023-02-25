import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { http, GETLIST } from "../../utils/request";
// import { Like, Visit } from "../../assets/SVG";
import ScrollBarBeauty from "../basic/ScrollBarBeauty";

function PostCard(props) {
    const {
        _id,
        title,
        // tag,
        description,
        background,
        // like,
        // visit,
        // createTime,
    } = props;
    return (
        <Link
            className="flex flex-col bg-white w-full sm:w-80 sm:flex-shrink-0 rounded mb-3 sm:mb-0 sm:mx-1 cursor-pointer"
            to={`/post/${_id}`}
        >
            {/* background */}
            <div className="h-64 sm:h-52 overflow-hidden">
                <div
                    className="h-full bg-cover bg-center rounded-t duration-500 hover:scale-125"
                    style={{
                        backgroundImage: `url(${background})`,
                    }}
                />
            </div>
            {/* introduce */}
            <div className="px-4 py-1 overflow-hidden">
                {/* title */}
                <div className="h-6 overflow-hidden font-bold">{title}</div>
                {/* description */}
                <div className="h-24 overflow-hidden">{description}</div>
            </div>
        </Link>
    );
}

export default function CateBlock(props) {
    const { cate, subclass, count } = props;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await http.post(GETLIST, { cate, subclass, num: 4 });
            if (res.status === 200) {
                setPosts(res.data.data);
            }
        })();
    }, [cate, subclass, count]);

    return (
        <div
            className="flex flex-col w-full mt-6 max-w-md sm:max-w-none"
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
                {count === 0 ? (
                    <div className="flex grow justify-center items-center select-none cursor-not-allowed">
                        暂且无更多内容
                    </div>
                ) : (
                    posts.map((postItem) => (
                        <PostCard
                            key={postItem._id}
                            _id={postItem._id}
                            title={postItem.title}
                            // tag={postItem.tag}
                            description={postItem.description}
                            background={postItem.background}
                            // like={postItem.like}
                            // visit={postItem.visit}
                            // createTime={postItem.createTime}
                        />
                    ))
                )}
            </ScrollBarBeauty>
        </div>
    );
}
