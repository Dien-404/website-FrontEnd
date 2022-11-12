import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reconcileNode } from "../utils/funcMap";

function InlieStyleRenderer(props) {
    return props.content.map((item) => {
        if (typeof item === "string") {
            return item;
        } else if (typeof item === "object") {
            return (
                <InlineStyle
                    italic={item.italic}
                    bold={item.bold}
                    code={item.code}
                    content={item.content}
                />
            );
        }
        return void 0;
    });
}

// 标题默认样式
function Title(props) {
    return (
        <div key={props.content}>
            <span
                className={`hover:text-teal-500 duration-300 font-bold cursor-default ${props.className}`}
            >
                <InlieStyleRenderer content={props.content} />
            </span>
        </div>
    );
}

// 标题分类
function TitleClassification(props) {
    switch (props.titleType) {
        // 一级标题
        case "first":
            return (
                <Title
                    className="border-l-4 border-teal-500 truncate text-3xl font-mono pl-4 mb-4"
                    content={props.content}
                />
            );
        // 二级标题
        case "second":
            return <Title className="text-2xl" content={props.content} />;
        // 三级标题
        case "third":
            return <Title className="text-xl" content={props.content} />;
        // 四级及以上标题
        default:
            return <Title className="text-lg" content={props.content} />;
    }
}

// 行内样式
function InlineStyle(props) {
    // console.log(props);
    return (
        <span
            className={`${
                props.code === true && "bg-red-100/75 rounded-md font-sans"
            } ${props.bold === true && "font-bold"} ${
                props.italic === true && "italic"
            } ${
                (props.bold === true || props.italic === true) &&
                "text-lime-500"
            }`}
            key={props.content}
        >
            &nbsp;{props.content}&nbsp;
        </span>
    );
}

function Parrallel(props) {
    return (
        <p>
            <InlieStyleRenderer content={props.content} />
        </p>
    );
}

// 代码块
function CodeInBlock(props) {
    // let arr = props.content.split("\n");
    return (
        <div className="bg-slate-800 text-orange-400 p-5 rounded-md">
            {props.content.map((item) => (
                <div className="whitespace-pre font-mono" key={item}>
                    {item}
                </div>
            ))}
        </div>
    );
}

// 列表
function List(props) {
    return (
        <div className="font-mono">
            {props.content.map((item, index) => {
                return (
                    <div key={item}>
                        <span className="whitespace-pre text-indigo-500">
                            {props.listType === true ? index + 1 + ". " : "-  "}
                        </span>
                        {/* {item} */}
                        <InlieStyleRenderer content={item} />
                    </div>
                );
            })}
        </div>
    );
}

export default function ArticleId() {
    const { id } = useParams();
    const fileContent = [
        "## 生命周期",
        "React 16以后的内容分别由一些什么东西,巴拉巴拉,重点是这里有**粗体**文字",
        "## conponentWillMount",
        "这里是关于上一个二级标题的描述,其中包含了行内代码`return null`,不仅如此,还包含了*斜体*字体",
        "## 二级标题,React 事件机制",
        "### 三级标题,测试使用,介绍代码属性",
        "这是一个自然段，存在`code`一节**加粗**，同时，还存在*斜体*字体",
        "这也是个自然段，存在***粗斜体***",
        "```js",
        "// 这里是代码块的内容,这里是注释",
        "const number1 = 11;    // 注释",
        "const number2 = 12;  // 注释",
        "const number3 = 13;        // 注释",
        "// 这里是代码块的内容,这里是注释,后面是代码块结束",
        "```",
        "## 二级标题,这里存在**加粗**字体",
        "这里是二级标题的内容,后面是一张图片",
        "![图片alt属性内容](https://img-blog.csdnimg.cn/9034519e1d5643ceb2d488cdc7ae4c32.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5pip5pme,size_20,color_FFFFFF,t_70,g_se,x_16)",
        "### 三级标题,测试使用",
        "## 二级标题 测试无序列表",
        "- 无序列表1`code`",
        " - 无序列表2",
        "- 无序列表3",
        "## 二级标题 测试有序列表",
        "1. 有序列表1`code`",
        "2. `code`有序**列表**2",
        "3. 有序列表3",
        "## 二级标题里面的`code`",
    ];
    const nodeList = reconcileNode(fileContent);
    useEffect(() => {
        console.log(id);
    });

    return (
        <div className="h-full bg-gray-50 flex justify-center">
            <div className="w-full max-w-xl sm:max-w-4xl lg:max-w-5xl duration-300 flex flex-row justify-between py-2">
                {/* 内容展示部分 */}
                <div className="bg-white rounded shadow w-full p-4">
                    <TitleClassification
                        titleType="first"
                        content={["React 生命周期"]}
                        key="React 生命周期"
                    />
                    {nodeList.map((item) => {
                        // 标题
                        if (item.type === "title") {
                            return (
                                <TitleClassification
                                    titleType={item.titleType}
                                    content={item.content}
                                />
                            );
                        }
                        // 段落
                        if (item.type === "parallel") {
                            return <Parrallel content={item.content} />;
                        }
                        // 代码块
                        if (item.type === "codeBlock") {
                            return <CodeInBlock content={item.content} />;
                        }
                        // 图片资源
                        if (item.type === "asset") {
                            return (
                                <img
                                    alt={item.alt}
                                    src={item.src}
                                    className="select-none"
                                />
                            );
                        }
                        // 列表
                        if (item.type === "list") {
                            return (
                                <List
                                    listType={item.listType}
                                    content={item.content}
                                />
                            );
                        }
                        return void 0;
                    })}
                </div>
                <div className="w-44 shrink-0 ml-4 hidden sm:block">
                    <div className="sticky top-16 bg-white rounded shadow w-full">
                        目录
                    </div>
                </div>
            </div>
        </div>
    );
}
