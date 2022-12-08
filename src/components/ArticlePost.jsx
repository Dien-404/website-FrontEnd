import React from "react";

// 渲染行内样式span
function InlieStyleRenderer(props) {
    return props.content.map((item) => {
        if (typeof item === "string") {
            return item;
        } else if (typeof item === "object") {
            return (
                <InlineStyle
                    key={item.content}
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
        <div
            className={`hover:text-teal-500 duration-300 font-bold cursor-default truncate ${props.className}`}
        >
            <InlieStyleRenderer content={props.content} />
        </div>
    );
}

// 标题分类
function TitleClassification(props) {
    const { titleType, content } = props;
    switch (titleType) {
        // 一级标题
        case "first":
            return (
                <Title
                    className="text-3xl pl-4 mb-4 border-l-4 border-teal-500"
                    content={props.content}
                />
            );
        // 二级标题
        case "second":
            return <Title className="text-2xl" content={content} />;
        // 三级标题
        case "third":
            return <Title className="text-xl" content={content} />;
        // 四级及以上标题
        default:
            return <Title className="text-lg" content={content} />;
    }
}

// 行内样式
function InlineStyle(props) {
    const { italic, bold, code, content } = props;
    /*
        italic：斜体
        bold：粗体
        code：行内代码
        content：文本内容
    */
    return (
        <span
            className={`${
                code === true && "bg-red-100/75 rounded-md font-sans"
            } ${bold === true && "font-bold"} ${italic === true && "italic"} ${
                (bold === true || italic === true) && "text-lime-500"
            } whitespace-pre`}
        >
            {content !== "" && " "}
            {content}
            {content !== "" && " "}
        </span>
    );
}

// 普通段落
function Parrallel(props) {
    let key =
        typeof props.content[0] === "object"
            ? props.index + props.content[0].content
            : props.index + props.content;
    return (
        <p key={key} className="mb-1 break-words">
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
                <div className="whitespace-pre">{item}</div>
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
                    <div>
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

// 为了能复用此组件，在 edit 页面可用，点赞、评论等功能放入 ArticleId 组件
export default function ArticlePost(props) {
    /*
        !important 
        1.id：从 useparams 获取

        props值传入参数
        2.title：主标题
        3.tag：标签
        4.description：文章描述
        5.background：文章背景
        6.value：文章渲染内容
        7.likes：点赞数
        8.visited：访问数
        9.create_time：创建日期
        10+...评论对象等 
    */
    const {
        _id: id,
        title,
        tag,
        description,
        background,
        value,
        likes,
        visited,
        create_time,
        commet,
    } = props;

    // 渲染数据对象
    function handleValue() {
        return value.map((item, index) => {
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
                return <Parrallel content={item.content} index={index} />;
            }
            // 代码块
            if (item.type === "code") {
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
                return <List listType={item.listType} content={item.content} />;
            }
            return void 0;
        });
    }

    return (
        <div className="bg-white rounded shadow w-full h-full p-4 font-mono">
            <TitleClassification titleType="first" content={[title]} />
            {handleValue()}
        </div>
    );
}
