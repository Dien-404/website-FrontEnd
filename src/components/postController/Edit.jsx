import React, { useState } from "react";
import styled from "styled-components";
import { useDebounceEffect } from "ahooks";
// 依赖导入
// 渲染函数导入
import { renderBlockNode } from "../../utils/renderFunction";
// 组件导入
import Post from "./Post";

// 美化 markdown 文本textarea
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

// lable 及 输入框
function LabelAndTextInput(props) {
    const { label, rows, value, setValue, maxLength, placeholder } = props;
    return (
        <div className="flex mb-2 items-center">
            <label className="select-none mr-2">{label}</label>
            <BeautifyTextarea
                type="text"
                className="ring-1 grow p-1 outline-none font-mono resize-none focus:ring-lime-500 duration-300"
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
export default function Edit() {
    // 以下变量可放入一个对象内，可读性更强，但此处解构出来使用
    // 文章标题
    const [title, setTitle] = useState("文章主标题");
    // 文章描述
    const [description, setDescription] = useState("关于文章的说明");
    // 文章标签
    const [tag, setTag] = useState("以英文字符,分开多个标签");
    // 背景图片
    const [background, setBackground] = useState(
        "https://img2.baidu.com/it/u=2738198884,3183508795&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    );
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
        <div className="h-full flex flex-row">
            {/* 输入栏 */}
            <div className="flex flex-col w-full lg:w-1/2 m-2">
                {/* 文章标题输入，文章描述输入，文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
                <div className="w-full p-2 border mb-2">
                    {/* 文章标题输入 */}
                    <LabelAndTextInput
                        label="文章标题"
                        placeholder="此处填写文章标题"
                        value={title}
                        setValue={setTitle}
                        maxLength={25}
                        rows={1}
                    />
                    {/* 文章描述输入 */}
                    <LabelAndTextInput
                        label="文章描述"
                        placeholder="此处填写文章描述"
                        value={description}
                        setValue={setDescription}
                        maxLength={150}
                        rows={4}
                    />
                    {/* 文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
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
                    <LabelAndTextInput
                        label="文章图片"
                        placeholder="此处填写文章图片url"
                        value={background}
                        setValue={setBackground}
                        rows={1}
                    />
                    <div className="flex flex-row justify-between">
                        {/* 左栏 */}
                        <div className="w-5/6 h-28 flex justify-center items-center">
                            背景图片文件上传，上传会清空url，修改url会删除图片文件
                        </div>
                        {/* 右栏 */}
                        <div className="flex flex-col">
                            <div className="flex mb-2 items-center">
                                上传文件
                            </div>
                            <div className="flex mb-2 items-center">
                                提交按钮
                            </div>
                        </div>
                    </div>
                </div>
                {/* 输入 markdown文本 进行渲染 */}
                <div
                    className="w-full p-2 border flex flex-col grow"
                    style={{ minHeight: "20rem" }}
                >
                    <label className="select-none">文章内容:</label>
                    <textarea
                        className="w-full grow ring-1 p-1 resize-none outline-none focus:ring-lime-500 duration-300"
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* 屏蔽用户选择，展示渲染结果 */}
            <div className="hidden lg:flex w-1/2">
                <div className="w-full border m-2 select-none overflow-hidden">
                    <Post
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
