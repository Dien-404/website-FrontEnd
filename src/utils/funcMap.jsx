const reader = new FileReader();

// react 读取文件内容
const fileReader = (e) => {
    const file = e.target.files[0];
    let temp = [];
    reader.readAsText(file);
    reader.onload = () => {
        reader.result.split("\n").forEach((line) => {
            if (line !== "") {
                temp.push(line);
            }
        });
    };
    return temp;
};

// 行内样式对象
function InlineStyle({
    italic = false,
    bold = false,
    code = false,
    content = undefined,
}) {
    return {
        italic,
        bold,
        code,
        content,
    };
}

const reconcileInlineStyle = (nodeContent) => {
    const res = [];
    // 解决行内代码
    const handleCode = (str, italic = false, bold = false) => {
        const res = [];
        if (!italic && !bold) {
            while (str.match(/`.*?`/)) {
                let { 0: match, index } = str.match(/`.*?`/);
                res.push(
                    str.slice(0, index),
                    InlineStyle({
                        italic,
                        bold,
                        code: true,
                        content: match.slice(1, match.length - 1),
                    })
                );
                str = str.slice(index + match.length);
            }
            res.push(str);
        } else {
            while (str.match(/`.*?`/)) {
                let { 0: match, index } = str.match(/`.*?`/);
                res.push(
                    InlineStyle({
                        italic,
                        bold,
                        code: false,
                        content: str.slice(0, index),
                    }),
                    InlineStyle({
                        italic,
                        bold,
                        code: true,
                        content: match.slice(1, match.length - 1),
                    })
                );
                str = str.slice(index + match.length);
            }
            res.push(
                InlineStyle({
                    italic,
                    bold,
                    code: false,
                    content: str,
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
            content;
        if (
            str.slice(0, 3) === "***" &&
            str.slice(0, 3) === str.slice(str.length - 3, str.length)
        ) {
            italic = true;
            bold = true;
            content = str.slice(3, str.length - 3);
        } else if (
            str.slice(0, 2) === "**" &&
            str.slice(0, 2) === str.slice(str.length - 2, str.length)
        ) {
            bold = true;
            content = str.slice(2, str.length - 2);
        } else if (str[0] === "*" && str[0] === str[str.length - 1]) {
            italic = true;
            content = str.slice(1, str.length - 1);
        }

        if (str.match(/`.*?`/)) {
            // 粗斜体内存在代码块
            return handleCode(content, italic, bold);
        } else {
            // 粗斜体内不存在代码块
            // 粗斜体
            if (italic && bold) {
                return InlineStyle({
                    italic,
                    bold,
                    code,
                    content,
                });
            }
            // 粗体
            if (bold && !italic) {
                return InlineStyle({
                    italic,
                    bold,
                    code,
                    content,
                });
            }
            // 斜体
            if (italic && !bold) {
                return InlineStyle({
                    italic,
                    bold,
                    code,
                    content,
                });
            }
        }
    };

    while (
        nodeContent.match(/\*{1,3}.*?\*{1,3}/) ||
        nodeContent.match(/`.*?`/)
    ) {
        let str, // 处理行内代码
            matchItem, // 处理当前粗斜体匹配对象 -> 匹配的字符串
            matchIndex; // 处理当前粗斜体匹配对象 -> 匹配的下标
        if (nodeContent.match(/\*{1,3}.*?\*{1,3}/)) {
            // 存在 加粗、斜体情况
            let { 0: match, index } = nodeContent.match(/\*{1,3}.*?\*{1,3}/);
            matchItem = match;
            matchIndex = index;
            // 匹配字符串前的字符串出现的代码块
            str = nodeContent.slice(0, matchIndex);
        } else {
            // 不存在 加粗、斜体情况
            str = nodeContent; // 只需考虑代码块
            nodeContent = "";
        }
        // 优先处理代码块
        // 匹配不存在加粗、斜体样式中的代码块
        if (str.match(/`.*?`/)) {
            res.push(handleCode(str));
        } else {
            res.push(str);
        }
        // 解决粗斜体以及判断是否合规
        if (matchItem) {
            // 存在粗斜体
            res.push(handleItalicOrBold(matchItem));
            nodeContent = nodeContent.slice(matchIndex + matchItem.length);
        } else {
            break;
        }
    }
    res.push(nodeContent);
    return res.flat(Infinity);
};

const reconcileNode = (fileLineArray) => {
    const res = [];
    let allLength = fileLineArray.length;
    for (let i = 0; i < allLength; i++) {
        let str = fileLineArray[i];
        // 二级标题
        if (str.match(/^#{2}\s/)) {
            const secondLevelTitle = {
                type: "title",
                titleType: "second",
                content: reconcileInlineStyle(str.slice(3)),
            };
            res.push(secondLevelTitle);
            continue;
        }
        // 三级标题
        if (str.match(/^#{3}\s/)) {
            const thirdLevelTitle = {
                type: "title",
                titleType: "third",
                content: reconcileInlineStyle(str.slice(4)),
            };
            res.push(thirdLevelTitle);
            continue;
        }
        // 四级标题及以上
        if (str.match(/^#{4,6}\s/)) {
            let { 0: match } = str.match(/^#{4,6}\s/);
            const defaultLevelTitle = {
                type: "title",
                titleType: "default",
                content: reconcileInlineStyle(match.length),
            };
            res.push(defaultLevelTitle);
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
                const codeBlock = {
                    type: "codeBlock",
                    codeType: str.substring(3),
                    content: fileLineArray.slice(begin + 1, i),
                };
                res.push(codeBlock);
                continue;
            }
        }
        // 图片资源
        if (str.match(/^!\[.{0,}\]\(.{0,}\)$/)) {
            let img = str.match(/^!\[.{0,}\]\(.{0,}\)$/)[0];
            let alt = img.match(/\[.*?\]/)[0];
            alt = alt.substring(1, alt.length - 1);
            let src = img.match(/\(.*?\)$/)[0];
            src = src.substring(1, src.length - 1);
            const Asset = {
                type: "asset",
                assetType: "img",
                alt,
                src,
            };
            res.push(Asset);
            continue;
        }
        // 无序列表
        if (str.match(/-\s/)) {
            const listWithNoOrder = {
                type: "list",
                listType: false, // false 为无序列表, true 为有序列表
                content: [],
            };
            do {
                let str = fileLineArray[i];
                let { index } = str.match(/-\s/);
                listWithNoOrder.content.push(
                    reconcileInlineStyle(str.substring(index + 2, str.length))
                );
            } while (fileLineArray[++i]?.match(/-\s/));
            i--; // !important
            res.push(listWithNoOrder);
            continue;
        }
        // 有序列表
        if (str.match(/\d\.\s/)) {
            const listWithOrder = {
                type: "list",
                listType: true,
                content: [],
            };
            do {
                let str = fileLineArray[i];
                let { 0: match, index } = str.match(/\d\.\s/);
                listWithOrder.content.push(
                    reconcileInlineStyle(
                        str.substring(match.length + index, str.length)
                    )
                );
            } while (fileLineArray[++i]?.match(/\d\.\s/));
            i--;
            res.push(listWithOrder);
            continue;
        }
        // 默认情况
        {
            const parallel = {
                type: "parallel",
                content: reconcileInlineStyle(str),
            };
            res.push(parallel);
            continue;
        }
    }
    return res;
};

export { fileReader, reconcileNode };
