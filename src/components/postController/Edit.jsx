import React, { useState } from "react";
import styled from "styled-components";
import { useDebounceEffect } from "ahooks";
// 依赖导入
// 渲染函数导入
import { renderBlockNode } from "../../utils/renderFunction";
import { FileUpload, PictureUpload } from "../../assets/SVG";
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
    const { label, rows, value, setValue, maxLength, placeholder, onFocus } =
        props;
    return (
        <div className="flex mb-2 items-center">
            <label className="select-none mr-2">{label}</label>
            <BeautifyTextarea
                type="text"
                className={`ring-1 grow p-1 outline-none overflow-x-hidden font-mono resize-none rounded-sm ring-blue-300 focus:ring-lime-500 duration-300 ${
                    onFocus === true ? "overflow-y-hidden" : "overflow-y-auto"
                }`}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onClick={(e) => {
                    if (onFocus) {
                        e.target.select();
                    }
                }}
            />
        </div>
    );
}

export default function Edit() {
    // 以下变量可放入一个对象内，可读性更强，但此处解构出来使用
    // 文章标题
    const [inputTitle, setInputTitle] = useState("文章主标题");
    // 文章标签
    const [inputTag, setInputTag] = useState("标签,标签");
    // 文章描述
    const [inputDes, setInputDes] = useState("关于文章的说明");
    // 背景图片
    const [inputBG, setInputBG] = useState(
        "https://img2.baidu.com/it/u=2738198884,3183508795&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    );
    // 文章内容
    const [inputText, setInputText] = useState(
        "## **注意：**该编辑器适配大部分markdown语法\n# 一级标题不识别\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题，样式与四级标题相等\n###### 六级标题，样式与五级标题相等\n####### 七级标题不存在\n\n#### 加粗\n1. **文字**\n2. __文字__\n\n#### 斜体\n1. *文字*\n2. _文字_\n\n#### 粗斜体\n1. ***文字***\n2. ___文字___\n\n#### 行内代码\n`code` and `code...`\n\n#### 代码块\n```js\nconst val = true; //and so on\n```\n"
    );

    // 存入数据库信息
    // 文章标题
    const [title, setTitle] = useState("");
    // 标签
    const [tag, setTag] = useState([]);
    // 文章描述
    const [description, setDescription] = useState("");
    // 图片
    const [background, setBackground] = useState("");
    // 文章信息
    const [value, setValue] = useState([]);
    // 类别
    const [cate, setCate] = useState("其他");
    // 小类
    const [subclass, setSubclass] = useState("未分类");

    // 处理 markdown 文本文件输入
    function handleFileUpload(e) {
        if (e.target.files.length !== 0) {
            let file = e.target.files[0];
            // 检测文件类型
            if (file.name.match(/\.(md)|(txt)|(doc)$/)) {
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = () => {
                    setInputText(reader.result);
                };
            } else {
                setInputText("输入错误的文件格式");
            }
        }
    }

    // 处理 图片 文件输入获取背景url
    function handleBackgroundUpload(e) {
        if (e.target.files.length !== 0) {
            let file = e.target.files[0];
            // 检测文件类型
            if (file.type.match(/image/)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setInputBG(reader.result);
                };
            } else {
                alert("wrong");
            }
        }
    }

    // 处理表单提交
    function handleSubmit() {
        const submit = {
            title,
            tag,
            description,
            background,
            value,
            cate,
            subclass,
        };
        console.log(JSON.stringify(submit));
    }

    // ahooks 防抖
    useDebounceEffect(
        () => {
            // 预处理表单提交信息
            setTitle(inputTitle);
            setTag(inputTag.split(","));
            setDescription(inputDes);
            setBackground(inputBG);
            setValue(renderBlockNode(inputText.split("\n")));
        },
        [inputTitle, inputTag, inputDes, inputBG, inputText],
        {
            wait: 500,
        }
    );

    return (
        <div className="h-full flex flex-row">
            {/* 输入栏 */}
            <div className="flex flex-col w-full md:w-1/2 m-2">
                {/* 文章标题输入，文章描述输入，文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
                <div className="w-full p-2 border mb-2">
                    {/* 文章标题输入 */}
                    <LabelAndTextInput
                        label="文章标题"
                        placeholder="此处填写文章标题"
                        value={inputTitle}
                        setValue={setInputTitle}
                        maxLength={25}
                        rows={1}
                    />
                    {/* 文章描述输入 */}
                    <LabelAndTextInput
                        label="文章描述"
                        placeholder="此处填写文章描述"
                        value={inputDes}
                        setValue={setInputDes}
                        maxLength={150}
                        rows={4}
                    />
                    {/* 文章标签输入，文章背景图片输入，文件上传，上传按钮 */}
                    {/* 文章标签 */}
                    <LabelAndTextInput
                        label="文章标签"
                        placeholder="此处填写文章标签"
                        value={inputTag}
                        setValue={setInputTag}
                        maxLength={40}
                        rows={1}
                    />
                    {/* 文章图片url */}
                    <div className="flex flex-row justify-center items-center">
                        <div className="grow">
                            <LabelAndTextInput
                                label="文章图片"
                                placeholder="此处填写文章图片url"
                                value={inputBG}
                                setValue={setInputBG}
                                onFocus={true}
                                rows={1}
                            />
                        </div>
                        {/* 上传 */}
                        <div className="relative ml-2 mb-2 p-1 ring-1 ring-blue-300 hover:bg-blue-300 duration-300 select-none rounded">
                            <PictureUpload />
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0"
                                onChange={(e) => {
                                    handleBackgroundUpload(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* 输入 markdown文本 进行渲染 */}
                <div
                    className="w-full p-2 border flex flex-col grow max-h-max"
                    // style={{ minHeight: "20rem" }}
                >
                    {/* label 及功能项 */}
                    <div className="flex flex-row justify-between mb-1">
                        <label className="select-none flex flex-row items-center">
                            {/* label */}
                            <span className="mr-2">文章内容:</span>
                            {/* 文件读取 */}
                            <span className="relative hidden md:flex p-1 ring-1 ring-blue-300 hover:bg-blue-300 duration-300 select-none rounded overflow-hidden">
                                <FileUpload />
                                <input
                                    type="file"
                                    accept=".doc,.txt,.md"
                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                    onChange={(e) => {
                                        handleFileUpload(e);
                                    }}
                                />
                            </span>
                        </label>
                        {/* 提交表单 */}
                        <div
                            className="px-1 flex justify-center items-center ring-1 ring-blue-300 hover:bg-blue-300 duration-300 select-none cursor-pointer rounded"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Submit
                        </div>
                    </div>
                    {/* 输入框 */}
                    <BeautifyTextarea
                        className="w-full grow ring-1 p-1 resize-none outline-none ring-blue-300 focus:ring-lime-500 duration-300"
                        value={inputText}
                        placeholder="文章内容"
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* 屏蔽用户选择，展示渲染结果 */}
            <div className="hidden md:flex w-1/2">
                {/* 此处不可合成两个div 会导致Post 阴影错位 原因：Post根据width进行响应布局 */}
                <div className="w-full border m-2 select-none overflow-hidden">
                    <Post
                        title={title}
                        description={description}
                        tag={tag}
                        background={background}
                        value={value}
                    />
                </div>
            </div>
        </div>
    );
}
