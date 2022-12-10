import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Like, Visit } from "../../assets/SVG";

import Content from "../basic/Content";
import Code from "../postRender/Code";
import List from "../postRender/List";
import Paragraph from "../postRender/Paragraph";
import Title from "../postRender/Title";

export default function Post(props) {
    const { _id } = useParams;

    // edit页面
    const {
        title: editTitle,
        description: editDescription,
        value: editValue,
        background: editBackground,
    } = props;

    // database来源
    const post = {
        _id: 1,
        title: "React 生命周期",
        tag: ["react", "进阶"],
        description: "这是一条关于文章的说明",
        background:
            "https://img2.baidu.com/it/u=2738198884,3183508795&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
        like: 0,
        visit: 0,
        createTime: "2022/11/13",
        value: [
            {
                type: "parallel",
                value: ["这里是文章主体内容，采用markdown语法规则"],
            },
            { type: "parallel", value: ["# 一级标题不匹配"] },
            { type: "title", tag: "second", value: ["二级标题"] },
            { type: "title", tag: "third", value: ["三级标题"] },
            {
                type: "parallel",
                value: [
                    {
                        italic: false,
                        bold: true,
                        code: false,
                        value: "加粗字体",
                    },
                ],
            },
        ],
    };

    // 解构赋值
    const {
        title,
        tag,
        description,
        background,
        value,
        like,
        visit,
        createTime,
        commet,
    } = post;

    // 当前用户是否喜欢
    const [isLike, setIsLike] = useState(false);
    // 交互like
    const [reLike, setReLike] = useState(like);

    return (
        <div className="h-full flex flex-col items-center">
            <Content
                className="bg-white rounded shadow w-full h-full p-4"
                isPost={true}
            >
                {/* 非 value 属性渲染 => title, background, description, like, visit, createTime*/}
                <div className="mb-4">
                    {/* 主标题 */}
                    <Title
                        tag="first"
                        // edit页面
                        value={editTitle === undefined ? [title] : [editTitle]}
                    />
                    {/* 渲染背景及描述等 */}
                    <div className="p-2 mb-3 rounded bg-gray-50 hover:bg-gray-100 duration-300">
                        <div className="flex flex-row justify-between mb-1">
                            <span className="w-auto text-xs text-gray-500 cursor-default">
                                {/* 标签 */}
                                {tag.map((item) => {
                                    return (
                                        <span className="mr-2 px-1 border border-gray-500">
                                            {item}
                                        </span>
                                    );
                                })}
                                {/* 创建时间 */}
                                <span>{createTime}</span>
                            </span>
                            {/* 访客量及点赞数 */}
                            <span className="flex flex-row font-mono select-none">
                                {/* 访客 */}
                                <span className="flex flex-row mr-3 cursor-default">
                                    <Visit />
                                    <span className="ml-1">{visit}</span>
                                </span>
                                {/* 点赞 */}
                                <span className="flex flex-row cursor-pointer">
                                    <Like
                                        isLike={isLike}
                                        setIsLike={setIsLike}
                                        setReLike={setReLike}
                                    />
                                    <span className="ml-1">{reLike}</span>
                                </span>
                            </span>
                        </div>
                        <div className="">
                            {/* edit页面 */}
                            {editDescription === undefined
                                ? description
                                : editDescription}
                        </div>
                    </div>
                    {/* 背景 */}
                    <div className="w-full flex justify-center items-center select-none">
                        <img
                            src={
                                editBackground === undefined
                                    ? background
                                    : editBackground
                            }
                            alt="background"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* 内容渲染 */}
                <div>
                    {(editValue === undefined ? value : editValue).map(
                        (item, index) => {
                            // 标题
                            if (item.type === "title") {
                                return (
                                    <Title tag={item.tag} value={item.value} />
                                );
                            }
                            // 段落
                            if (item.type === "parallel") {
                                return <Paragraph value={item.value} />;
                            }
                            // 代码块
                            if (item.type === "code") {
                                return <Code value={item.value} />;
                            }
                            // 图片资源
                            if (item.type === "asset") {
                                return (
                                    <img
                                        alt={item.alt}
                                        src={item.src}
                                        className="select-none border"
                                    />
                                );
                            }
                            // 列表
                            if (item.type === "list") {
                                return (
                                    <List
                                        listType={item.listType}
                                        value={item.value}
                                    />
                                );
                            }
                            return void 0;
                        }
                    )}
                </div>
            </Content>
        </div>
    );
}
