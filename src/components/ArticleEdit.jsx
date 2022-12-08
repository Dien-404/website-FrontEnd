import React, { useState } from "react";
import styled from "styled-components";
import { useDebounceEffect } from "ahooks";

import { renderBlockNode } from "../utils/renderFunction";
import ArticlePost from "./ArticlePost";

const BeautifyTextarea = styled.textarea`
    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.3125rem;
        :hover {
            background-color: gray;
        }
    }
    ::-webkit-scrollbar-button {
        display: none;
    }
`;

function LabelAndTextInput(props) {
    const { label, rows, value, setValue, maxLength, placeholder } = props;
    return (
        <div className="flex mb-2 items-center">
            <label className="select-none mr-2">{label}</label>
            <BeautifyTextarea
                type="text"
                className="ring-1 grow p-1 outline-none resize-none focus:ring-lime-500 duration-300"
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
}

export default function ArticleEdit() {
    // 以下变量可放入一个对象内，可读性更强，但此处解构出来使用
    // 文章标题
    const [title, setTitle] = useState("文章主标题");
    // 文章描述
    const [description, setDescription] = useState("关于文章的说明");
    // 文章标签
    const [tag, setTag] = useState("以英文字符,分开多个标签");
    // 背景图片
    const [background, setBackground] = useState("");
    // 文章内容
    const [inputText, setInputText] = useState(
        "这里是文章主体内容，采用markdown语法规则\n# 一级标题不匹配\n## 二级标题\n### 三级标题\n**加粗字体**"
    );
    // 模拟存放入数据库的文章信息
    const [value, setValue] = useState([]);

    // ahooks 防抖
    useDebounceEffect(
        () => {
            setValue(renderBlockNode(inputText.split("\n")));
        },
        [inputText],
        {
            wait: 1000,
        }
    );

    return (
        <div className="h-full flex flex-col">
            {/* 文章标题输入，文章描述输入，文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
            <div className="flex flex-row">
                {/* 文章标题输入，文章描述输入 */}
                <div className="w-1/2 m-2 flex flex-col">
                    <LabelAndTextInput
                        label="文章标题"
                        placeholder="此处填写文章标题"
                        value={title}
                        setValue={setTitle}
                        maxLength={25}
                        rows={1}
                    />
                    <LabelAndTextInput
                        label="文章描述"
                        placeholder="此处填写文章描述"
                        value={description}
                        setValue={setDescription}
                        rows={4}
                    />
                </div>
                {/* 文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
                <div className="w-1/2 m-2 flex flex-row justify-between">
                    {/* 左栏 */}
                    <div className="grow flex flex-col">
                        {/* 文章标签 */}
                        <LabelAndTextInput
                            label="文章标签"
                            placeholder="此处填写文章标签"
                            value={tag}
                            setValue={setTag}
                            maxLength={40}
                            rows={1}
                        />
                        {/* 背景图片 */}
                        <div className="flex mb-2 items-center">
                            <label className="select-none mr-2">背景图片</label>
                            {/* <input type="file" /> */}
                        </div>
                    </div>
                    {/* 右栏 */}
                    <div className="flex flex-col">
                        <div className="flex mb-2 items-center">上传文件</div>
                        <div className="flex mb-2 items-center">提交按钮</div>
                    </div>
                </div>
            </div>
            <div className="grow flex flex-row">
                {/* 输入 markdown文本 进行渲染 */}
                <div className="w-1/2 m-2 p-2 border flex flex-col">
                    <label className="select-none">文章内容:</label>
                    <textarea
                        className="w-full grow ring-1 p-1 resize-none outline-none focus:ring-lime-500 duration-300"
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                    />
                </div>
                {/* 屏蔽用户选择，展示渲染结果 */}
                <div className="w-1/2 border m-2 select-none overflow-hidden">
                    <ArticlePost
                        title={title}
                        description={description}
                        background={background}
                        value={value}
                    />
                </div>
            </div>
        </div>
    );
}
