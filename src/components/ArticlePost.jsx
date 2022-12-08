import React from "react";
import Code from "./postRender/Code";
import List from "./postRender/List";
import Paragraph from "./postRender/Paragraph";
import Title from "./postRender/Title";

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

    return (
        <div className="bg-white rounded shadow w-full h-full p-4 font-mono">
            {/* 主标题 */}
            <Title tag="first" value={[title]} />
            {/* 此处渲染背景及描述等 */}

            {/* 内容渲染 */}
            {value.map((item, index) => {
                // 标题
                if (item.type === "title") {
                    return <Title tag={item.tag} value={item.value} />;
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
                    return <List listType={item.listType} value={item.value} />;
                }
                return void 0;
            })}
        </div>
    );
}
