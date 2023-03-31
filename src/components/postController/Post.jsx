import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { format } from "../../utils/timeTransfer";
import {
    http,
    GETDETAIL,
    GETUSERLIKELIST,
    USERLIKETHEPOST,
    POSTVISIT,
} from "../../utils/request";
import { MyContext } from "../../routers/index";
import { Like, Visit } from "../../assets/SVG";

import Content from "../basic/Content";
import Code from "../postRender/Code";
import List from "../postRender/List";
import Paragraph from "../postRender/Paragraph";
import Title from "../postRender/Title";
import CommentFrame from "./CommentFrame";

export default function Post(props) {
    const { loginUser } = useContext(MyContext);
    const { _id } = useParams();
    // 文章信息
    const [post, setPost] = useState({});

    // 交互like
    const [reLike, setReLike] = useState(0);

    // 当前用户是否喜欢
    const [isLike, setIsLike] = useState(false);

    // fetch post data
    useEffect(() => {
        // 帖子访问量计时器
        var postTimeout = null;
        (async () => {
            if (_id !== undefined) {
                const res = await http.post(GETDETAIL, {
                    _id,
                });
                // 成功获取帖子
                if (res.status === 200) {
                    // 帖子实例对象赋值
                    setPost(res.data.data);
                    // 更正帖子点赞信息
                    setReLike(res.data.data.like);
                    // 帖子访问量计时器赋值
                    postTimeout = setTimeout(() => {
                        http.post(POSTVISIT, { _id });
                    }, 5000);
                } else {
                    console.log("wrong in post");
                }
            }
        })();
        return () => {
            clearTimeout(postTimeout);
        };
    }, [_id]);

    // 获取用户点赞列表，判断列表是否存在该帖子
    useEffect(() => {
        (async () => {
            // 已登录
            if (loginUser.email !== undefined) {
                const res = await http.post(GETUSERLIKELIST);
                if (res.status === 200) {
                    const { likeList } = res.data.data;
                    const set = new Set(likeList);
                    if (set.has(_id)) {
                        setIsLike(true);
                    }
                }
            }
        })();
    }, [loginUser, _id]);

    // 解构赋值
    const {
        title,
        tag,
        description,
        background,
        value,
        visit,
        createTime,
        comment,
    } = _id === undefined ? props : post;

    // 处理用户点赞行为
    const handleUserLike = async () => {
        // 处理图标(未登录也适用)
        if (isLike) {
            setReLike((pre) => pre - 1);
        } else {
            setReLike((pre) => pre + 1);
        }
        setIsLike((pre) => !pre);

        // 判断登录
        if (loginUser.email !== undefined && _id !== undefined) {
            // 点赞请求
            const res = await http.post(USERLIKETHEPOST, {
                _id,
            });
            // 以下判断无处理意义
            if (res.status === 200) {
                // 成功
            } else {
                // 失败
            }
        }
    };

    return (
        <div className="h-full flex flex-col items-center">
            {title === undefined ? (
                <div className="flex grow justify-center items-center">
                    无内容，请检查链接是否错误
                </div>
            ) : (
                <Content
                    className="bg-white rounded shadow w-full h-full p-4"
                    isPost={true}
                >
                    {/* 非 value 属性渲染 => title, background, description, like, visit, createTime*/}
                    <div className="mb-3">
                        {/* 主标题 */}
                        <Title
                            tag="first"
                            // edit页面
                            value={[title]}
                        />
                        {/* 渲染背景及描述等 */}
                        <div className="p-2 mb-2 rounded bg-gray-50 hover:bg-gray-100 duration-300">
                            <div className="flex flex-row justify-between mb-1">
                                <span className="w-auto text-xs text-gray-500 cursor-default">
                                    {/* 标签 */}
                                    {tag?.map((item, index) => {
                                        return (
                                            <span
                                                className={`mr-2 px-1 border border-gray-500 ${
                                                    item === ""
                                                        ? "hidden"
                                                        : "inline-block"
                                                }`}
                                                key={item + index}
                                            >
                                                {item}
                                            </span>
                                        );
                                    })}
                                    {/* 创建时间 */}
                                    <span>
                                        {createTime === undefined
                                            ? "date will be created auto"
                                            : format(createTime)}
                                    </span>
                                </span>
                                {/* 访客量及点赞数 */}
                                <span className="flex flex-row font-mono select-none">
                                    {/* 访客 */}
                                    <span className="flex flex-row mr-3 cursor-default">
                                        <Visit />
                                        <span className="ml-1">
                                            {visit === undefined ? 0 : visit}
                                        </span>
                                    </span>
                                    {/* 点赞 */}
                                    <span className="flex flex-row cursor-pointer">
                                        <Like
                                            isLike={isLike}
                                            handleUserLike={handleUserLike}
                                        />
                                        <span className="ml-1">{reLike}</span>
                                    </span>
                                </span>
                            </div>
                            {/* description */}
                            <div>{description}</div>
                        </div>
                        {/* 背景 */}
                        <div className="w-full flex justify-center items-center select-none">
                            <img
                                src={background}
                                alt="fail to get background"
                                className={`w-full ${
                                    background === "" ? "hidden" : "flex"
                                }`}
                            />
                        </div>
                    </div>

                    {/* 内容渲染 */}
                    <div>
                        {value?.map((item, index) => {
                            switch (item.type) {
                                case "title":
                                    return (
                                        <Title
                                            key={JSON.stringify(item) + index}
                                            tag={item.tag}
                                            value={item.value}
                                        />
                                    );
                                case "parallel":
                                    return (
                                        <Paragraph
                                            key={JSON.stringify(item) + index}
                                            tag={item.tag}
                                            value={item.value}
                                        />
                                    );
                                case "code":
                                    return (
                                        <Code
                                            key={JSON.stringify(item) + index}
                                            value={item.value}
                                        />
                                    );
                                case "asset":
                                    return (
                                        <img
                                            key={JSON.stringify(item) + index}
                                            alt={item.alt}
                                            src={item.src}
                                            className="select-none border"
                                        />
                                    );
                                case "list":
                                    return (
                                        <List
                                            key={JSON.stringify(item) + index}
                                            tag={item.tag}
                                            value={item.value}
                                        />
                                    );
                                default:
                                    return void 0;
                            }
                        })}
                    </div>

                    {/* 评论 */}
                    <div
                        className={`mt-5 ${
                            _id === undefined ? "hidden" : "block"
                        }`}
                    >
                        <CommentFrame
                            email={loginUser?.email}
                            commentId={comment}
                        />
                    </div>
                </Content>
            )}
        </div>
    );
}
