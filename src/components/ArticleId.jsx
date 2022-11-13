import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticlePost from "./ArticlePost";

export default function ArticleId() {
    const { id } = useParams();
    // 此处需要根据 id 获取文章信息
    // 文章信息模板
    const articlePost = {
        title: "React 生命周期",
        tag: ["react", "进阶"],
        description: "这是一条关于文章的说明",
        likes: 121,
        visited: 121,
        create_time: "2022/11/13",
        value: [
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
        ],
    };
    useEffect(() => {
        console.log(id);
    });

    return (
        <div className="h-full bg-gray-50 flex justify-center">
            <div className="w-full max-w-xl sm:max-w-4xl lg:max-w-5xl duration-300 flex flex-row justify-between py-2">
                {/* 内容展示部分 */}
                <ArticlePost articlePost={articlePost} />
                <div className="w-44 shrink-0 ml-4 hidden md:block">
                    <div className="sticky top-16 bg-white rounded shadow w-full">
                        目录
                    </div>
                </div>
            </div>
        </div>
    );
}
