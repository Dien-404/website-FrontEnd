// 行内样式
function InlineStyle({
    italic = false,
    bold = false,
    code = false,
    cancel = false,
    link = false,
    value = undefined,
}) {
    return {
        italic,
        bold,
        code,
        cancel,
        link,
        value,
    };
}

// 块级样式
function BlockStyle({ type, tag, value, alt, src } = {}) {
    return {
        type,
        tag,
        value,
        alt,
        src,
    };
}

// 渲染行内块标签对象
const renderInlineNode = (nodeValue) => {
    const inlineNodes = [];
    // 解决行内代码
    const handleCode = (str, italic = false, bold = false, link = false) => {
        const res = [];
        if (!italic && !bold) {
            while (str.match(/`.*?`/)) {
                let { 0: match, index } = str.match(/`.*?`/);
                res.push(
                    str.slice(0, index),
                    new InlineStyle({
                        italic,
                        bold,
                        link,
                        code: true,
                        value: match.slice(1, match.length - 1),
                    })
                );
                str = str.slice(index + match.length);
            }
            res.push(str);
        } else {
            while (str.match(/`.*?`/)) {
                let { 0: match, index } = str.match(/`.*?`/);
                res.push(
                    new InlineStyle({
                        italic,
                        bold,
                        link,
                        code: false,
                        value: str.slice(0, index),
                    }),
                    new InlineStyle({
                        italic,
                        bold,
                        link,
                        code: true,
                        value: match.slice(1, match.length - 1),
                    })
                );
                str = str.slice(index + match.length);
            }
            res.push(
                new InlineStyle({
                    italic,
                    bold,
                    link,
                    code: false,
                    value: str,
                })
            );
        }
        return res;
    };

    const handleItalicOrBold = (str) => {
        // 优先判断粗斜体类型
        let italic = false,
            bold = false,
            code = false,
            cancel = false,
            link = false,
            value;
        if (
            (str.slice(0, 3) === "***" &&
                str.slice(str.length - 3, str.length) === "***") ||
            (str.slice(0, 3) === "___" &&
                str.slice(str.length - 3, str.length) === "___")
        ) {
            // 粗斜体
            italic = true;
            bold = true;
            value = str.slice(3, str.length - 3);
        } else if (
            (str.slice(0, 2) === "**" &&
                str.slice(str.length - 2, str.length) === "**") ||
            (str.slice(0, 2) === "__" &&
                str.slice(str.length - 2, str.length) === "__")
        ) {
            // 粗体
            bold = true;
            value = str.slice(2, str.length - 2);
        } else if (
            (str[0] === "*" && str[str.length - 1] === "*") ||
            (str[0] === "_" && str[str.length - 1]) === "_"
        ) {
            // 斜体
            italic = true;
            value = str.slice(1, str.length - 1);
        } else if (
            str.slice(0, 2) === "~~" &&
            str.slice(str.length - 2, str.length) === "~~"
        ) {
            // 删除线
            cancel = true;
            value = str.slice(2, str.length - 2);
        }

        if (str.match(/`.*?`/)) {
            // 粗斜体内存在代码块
            return handleCode(value, italic, bold, link);
        } else {
            // 粗斜体内不存在代码块
            if (italic || bold || code || cancel || link) {
                return new InlineStyle({
                    italic,
                    bold,
                    code,
                    cancel,
                    link,
                    value,
                });
            }
        }
    };

    while (
        // ***code*** **code** *code* ___code___ __code__ _code_ ~~code~~ `code` 情况
        nodeValue.match(/\*{1,3}.*?\*{1,3}/) ||
        nodeValue.match(/_{1,3}.*?_{1,3}/) ||
        nodeValue.match(/~~.*?~~/) ||
        nodeValue.match(/`.*?`/)
    ) {
        let str, // 处理行内代码
            matchItem, // 处理当前粗斜体匹配对象 -> 匹配的字符串
            matchIndex; // 处理当前粗斜体匹配对象 -> 匹配的下标
        if (
            nodeValue.match(/\*{1,3}.*?\*{1,3}/) ||
            nodeValue.match(/_{1,3}.*?_{1,3}/) ||
            nodeValue.match(/~~.*?~~/)
        ) {
            // 存在 加粗、斜体情况
            let { 0: match, index } =
                nodeValue.match(/\*{1,3}.*?\*{1,3}/) ||
                nodeValue.match(/_{1,3}.*?_{1,3}/) ||
                nodeValue.match(/~~.*?~~/);
            matchItem = match;
            matchIndex = index;
            // 匹配字符串前的字符串出现的代码块
            str = nodeValue.slice(0, matchIndex);
        } else {
            // 不存在 加粗、斜体情况
            str = nodeValue; // 只需考虑代码块
            nodeValue = "";
        }
        // 优先处理代码块
        // 匹配不存在加粗、斜体样式中的代码块
        if (str.match(/`.*?`/)) {
            inlineNodes.push(handleCode(str));
        } else if (str === "") {
            // 不处理空字符串
        } else {
            inlineNodes.push(str);
        }
        // 解决粗斜体以及判断是否合规
        if (matchItem) {
            // 存在粗斜体
            inlineNodes.push(handleItalicOrBold(matchItem));
            nodeValue = nodeValue.slice(matchIndex + matchItem.length);
        } else {
            break;
        }
    }
    if (nodeValue !== "") {
        inlineNodes.push(nodeValue);
    }
    return inlineNodes.flat(Infinity);
};

// 渲染块级标签对象
const renderBlockNode = (fileLineArray) => {
    const blockNodes = [];
    let allLength = fileLineArray.length;
    for (let i = 0; i < allLength; i++) {
        // 获取第 i 行字符串
        let str = fileLineArray[i];

        // 生成新的块级样式节点
        const blockNode = new BlockStyle();

        // 一级标题不渲染
        // if (str.match(/^#{1}\s/)) {
        //     blockNode.type = "title";
        //     blockNode.tag = "first";
        //     blockNode.value = str.slice(2);
        //     blockNodes.push(blockNode);
        //     continue;
        // }

        // 二级标题
        if (str.match(/^#{2}\s/)) {
            blockNode.type = "title";
            blockNode.tag = "second";
            blockNode.value = renderInlineNode(str.slice(3));
            blockNodes.push(blockNode);
            continue;
        }

        // 三级标题
        if (str.match(/^#{3}\s/)) {
            blockNode.type = "title";
            blockNode.tag = "third";
            blockNode.value = renderInlineNode(str.slice(4));
            blockNodes.push(blockNode);
            continue;
        }

        // 四级标题及以上
        if (str.match(/^#{4,6}\s/)) {
            let { 0: match } = str.match(/^#{4,6}\s/);
            blockNode.type = "title";
            blockNode.tag = "default";
            blockNode.value = renderInlineNode(str.slice(match.length));
            blockNodes.push(blockNode);
            continue;
        }

        // 代码块
        if (
            str.match(/^```/) &&
            i !== fileLineArray.length - 1 &&
            str[3] !== "`"
        ) {
            let begin = i;
            // 核实是否为代码块
            let flag = false;
            while (!fileLineArray[++i].match(/^```/)) {
                // 如果只存在 单边```情况时，该```不属于代码块，属于段落
                if (i >= fileLineArray.length - 1) {
                    flag = true;
                    break;
                }
            }
            // 不是代码块，取消代码块对象的生成，还原处理段落
            if (flag) {
                i = begin;
            } else {
                blockNode.type = "code";
                blockNode.value = fileLineArray.slice(begin + 1, i);
                blockNodes.push(blockNode);
                continue;
            }
        }

        // 资源
        // 图片，后续可能更新音频
        if (str.match(/^!\[.{0,}\]\(.{0,}\)$/)) {
            let img = str.match(/^!\[.{0,}\]\(.{0,}\)$/)[0];
            // 获取图片资源注释
            let alt = img.match(/\[.*?\]/)[0];
            // 获取图片资源链接
            let src = img.match(/\(.*?\)$/)[0];

            blockNode.type = "asset";
            blockNode.tag = "img";
            blockNode.alt = alt.substring(1, alt.length - 1);
            blockNode.src = src.substring(1, src.length - 1);
            blockNodes.push(blockNode);
            continue;
        }
        // 无序列表
        if (str.match(/-\s/)) {
            let value = [];

            do {
                let str = fileLineArray[i];
                let { index } = str.match(/-\s/);
                value.push(
                    renderInlineNode(str.substring(index + 2, str.length))
                );
            } while (fileLineArray[++i]?.match(/-\s/));

            i--; // !important

            blockNode.type = "list";
            blockNode.tag = false;
            blockNode.value = value;
            blockNodes.push(blockNode);
            continue;
        }
        // 有序列表
        if (str.match(/\d\.\s/)) {
            let value = [];

            do {
                let str = fileLineArray[i];
                let { 0: match, index } = str.match(/\d\.\s/);
                value.push(
                    renderInlineNode(
                        str.substring(match.length + index, str.length)
                    )
                );
            } while (fileLineArray[++i]?.match(/\d\.\s/));

            i--; // !important

            blockNode.type = "list";
            blockNode.tag = true;
            blockNode.value = value;
            blockNodes.push(blockNode);
            continue;
        }

        // 默认情况，以上所有情况不触发，则触发此情况
        blockNode.type = "parallel";
        if (str === "") {
            blockNode.tag = "br";
        } else if (str === "---") {
            blockNode.tag = "dv";
        } else {
            blockNode.tag = "default";
            blockNode.value = renderInlineNode(str);
        }
        blockNodes.push(blockNode);
        // 默认情况，以上所有情况不触发，则触发此情况
    }
    // console.log(blockNodes);
    // console.log(JSON.stringify(blockNodes));
    return blockNodes;
};

export { renderBlockNode };
