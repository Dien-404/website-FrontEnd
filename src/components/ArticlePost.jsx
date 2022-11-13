import React from "react";
import { reconcileNode } from "../utils/funcMap";

// 渲染行内样式span
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
                className={`hover:text-teal-500 duration-300 font-bold cursor-default truncate ${props.className}`}
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
    return (
        <span
            className={`${
                props.code === true && "bg-red-100/75 rounded-md font-sans"
            } ${props.bold === true && "font-bold"} ${
                props.italic === true && "italic"
            } ${
                (props.bold === true || props.italic === true) &&
                "text-lime-500"
            } whitespace-pre`}
            key={props.content}
        >
            {props.content !== "" && " "}
            {props.content}
            {props.content !== "" && " "}
        </span>
    );
}

// 普通段落
function Parrallel(props) {
    return (
        <p className="mb-1">
            <InlieStyleRenderer content={props.content} />
        </p>
    );
}

// 代码块
function CodeInBlock(props) {
    return (
        <div
            className={`bg-slate-800 text-orange-400 ${
                props.content.length !== 0 && "p-5"
            } rounded-md`}
        >
            {props.content.map((item, index) => (
                <div className="whitespace-pre font-mono" key={index + item}>
                    {item}
                </div>
            ))}
        </div>
    );
}

// 列表
function List(props) {
    return (
        <div>
            {props.content.map((item, index) => {
                return (
                    <div key={index + item}>
                        <span className="whitespace-pre text-indigo-500 font-mono">
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

export default function ArticlePost(props) {
    return (
        <div className="bg-white rounded shadow w-full h-full p-4">
            <TitleClassification
                titleType="first"
                content={[props.articlePost.title]}
                key={props.articlePost.title}
            />
            {reconcileNode(props.articlePost.value).map((item) => {
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
                            className="select-none border"
                        />
                    );
                }
                // 列表
                if (item.type === "list") {
                    return (
                        <List listType={item.listType} content={item.content} />
                    );
                }
                return void 0;
            })}
        </div>
    );
}
