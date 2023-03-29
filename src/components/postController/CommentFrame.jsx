import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { http, GETCOMMENTLIST, COMMENT } from "../../utils/request";
import { format } from "../../utils/timeTransfer";
import { MyContext } from "../../routers/index";
import { Pagination } from "antd";

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

export default function CommentFrame(props) {
    const { showAlert } = useContext(MyContext);
    const { email, commentId } = props;
    // 评论列表
    const [commentList, setCommentList] = useState([]);
    // 页码
    const [currentPage, setCurrentPage] = useState(1);
    // 每页展示数量
    const pageSize = 5;
    // 评论列表总数
    const [total, setTotal] = useState(0);

    // 从后端获取评论
    const handleGetCommnetList = async (number, size) => {
        const res = await http.post(GETCOMMENTLIST, {
            commentId,
            pageNumber: currentPage,
            pageSize,
        });
        if (res.status === 200) {
            // 更改评论列表
            setCommentList(res.data.commentList);
            // 更改评论总数
            setTotal(res.data.total);
        } else {
            // 获取失败
        }
    };

    // 用户评论内容
    const [commentContext, setCommentContext] = useState("");
    // 用户评论对象(邮箱)
    const [commentToEmail, setCommentToEmail] = useState(null);
    // 用户评论对象(名字)
    const [commentToName, setCommentToName] = useState("");

    // 用户评论
    const handleComment = async () => {
        if (email === commentToEmail) {
            // alert
            showAlert(2000, "不可评论自己噢");
        } else {
            const res = await http.post(COMMENT, {
                commentId,
                to: commentToEmail,
                context: commentContext,
            });
            if (res.status === 200) {
                // 重新拉去评论
                handleGetCommnetList();
            } else {
            }
        }
    };

    // 处理分页组件页码变化
    const handlePageChange = (number) => {
        setCurrentPage(number);
    };

    // 变化则获取数据
    useEffect(() => {
        handleGetCommnetList();
    }, [commentId, currentPage]);

    return (
        <div className="flex flex-col">
            {/* 评论框 */}
            <div className="relative flex flex-col border border-black rounded p-2 md:p-3 mb-3">
                {/* 遮罩层 */}
                <div
                    className={`absolute top-0 left-0 z-10 select-none rounded cursor-not-allowed w-full h-full backdrop-blur flex justify-center items-center ${
                        email === undefined || email === null
                            ? "flex"
                            : "hidden"
                    }`}
                >
                    您暂未登录
                </div>
                {/* 上层功能块 */}
                <div className="flex flex-row justify-between items-center mb-2 md:mb-3">
                    <div className="flex flex-row items-center">
                        <div
                            className="px-1 mr-2 cursor-pointer text-sm text-gray-500 ring-1 ring-indigo-400 duration-300 hover:bg-indigo-400 hover:text-rose-700 rounded"
                            onClick={() => {
                                // 重置回复
                                setCommentToEmail(null);
                                setCommentToName(null);
                            }}
                        >
                            reset
                        </div>
                        <span>
                            回复: {commentToEmail !== null && commentToName}
                        </span>
                    </div>
                    {/* API comment onclick事件 */}
                    <div
                        className="px-1 rounded ring-1 ring-indigo-400 hover:bg-indigo-400 hover:cursor-pointer duration-300"
                        onClick={handleComment}
                    >
                        评论
                    </div>
                </div>
                {/* textArea 评论模块 */}
                <BeautifyTextarea
                    className="h-44 md:h-24 p-1 resize-none outline-none ring-1 ring-indigo-400 focus:ring-green-400 focus:rounded duration-300"
                    placeholder="最多只能回复200字符噢"
                    maxLength={300}
                    onChange={(e) => {
                        setCommentContext(e.target.value);
                    }}
                />
            </div>
            {/* 帖子评论内容 */}
            <div className="flex flex-col">
                {/* 渲染 */}
                <div>
                    {commentList.length === 0 ? (
                        <div className=" flex justify-center items-center font-mono font-medium p-4">
                            **该贴期待你的留言**
                        </div>
                    ) : (
                        commentList.map((item) => (
                            <div
                                className="font-mono flex flex-row justify-between rounded shadow p-2 mb-2"
                                key={item.time}
                                onClick={() => {
                                    // 设置回复邮箱
                                    setCommentToEmail(item.reply);
                                    // 设置回复名称
                                    setCommentToName(item.replyName);
                                }}
                            >
                                <div className="flex flex-row grow items-center">
                                    {/* 头像 */}
                                    <div
                                        className="rounded-full border w-16 h-16 md:w-24 md:h-24 shrink-0 mr-2 flex justify-center items-center bg-cover bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: `url(${item.replyPhoto})`,
                                        }}
                                    />

                                    {/* 具体内容 */}
                                    <div className="flex flex-col border-l px-2 grow">
                                        {/* 评论用户 */}
                                        <div className="text-lg font-medium">
                                            {item.replyName}
                                        </div>
                                        {/* 回复人 or 帖子 帖子不显示 */}
                                        <div className="text-xs text-gray-400 flex flex-row justify-between items-center">
                                            <span>
                                                {item.to === null
                                                    ? "留言"
                                                    : "回复: " + item.toName}
                                            </span>
                                            <span>{format(item.time)}</span>
                                        </div>
                                        {/* 评论内容 */}
                                        <div className="">{item.context}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* 分页 */}
                <div className="flex flex-row-reverse">
                    <Pagination
                        hideOnSinglePage={true}
                        current={currentPage}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}
