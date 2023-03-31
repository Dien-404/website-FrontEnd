import React, { useState, useEffect, useContext } from "react";
import { http, GETPOSTLISTADMIN, DELETEPOST } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { format } from "../../utils/timeTransfer";

import { MyContext } from "../../routers/index";
import ScrollBarBeauty from "../ScrollBarBeauty";
import FreezeScroll from "../basic/FreezeScroll";
import { Input, Table, Button, Popconfirm } from "antd";
import { Navigate } from "react-router-dom";
const { Search } = Input;

export default function PostControl() {
    const { showAlert } = useContext(MyContext);
    const navigate = useNavigate();
    // 搜索框
    const [searchContext, setSearchContext] = useState("");
    // 处理搜索框
    const onSearch = (text) => {
        setSearchContext(text);
    };

    // 数据源
    const [dataSource, setDataSource] = useState([]);

    // 处理删除帖子
    const handleDeletePost = async (_id) => {
        try {
            const res = await http.post(DELETEPOST, { _id });
            if (res.status === 200) {
                fetchData();
            } else {
                showAlert(2000, "删除失败");
            }
        } catch {
            showAlert(2000, "删除失败");
        }
    };

    // 展示列
    const columns = [
        { title: "标题(title)", dataIndex: "title" },
        { title: "类属(cate)", dataIndex: "cate" },
        { title: "分类(subclass)", dataIndex: "subclass" },
        {
            title: "标签(tag)",
            dataIndex: "tag",
            render: (tag) => (
                <>
                    {tag.map((item, index) => (
                        <span
                            key={item + index}
                            className="ring-1 ring-gray-300 text-gray-300 text-sm px-1 mr-2"
                        >
                            {item}
                        </span>
                    ))}
                </>
            ),
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            render: (time) => format(time),
        },
        {
            title: "操作",
            dataIndex: "_id",
            render: (id) => (
                <Popconfirm
                    title="确定删除嘛"
                    cancelText="取消"
                    okText="确定删除"
                    onConfirm={() => {
                        handleDeletePost(id);
                    }}
                >
                    <Button>删除</Button>
                </Popconfirm>
            ),
        },
    ];

    // 页码
    const [currentPage, setCurrentPage] = useState(1);
    // 展示数量
    const [pageSize, setPageSize] = useState(4);
    // allNumber
    const [total, setTotal] = useState(0);
    // 处理页码变化
    const handlePageChange = (number, size) => {
        setCurrentPage(number);
        setPageSize(size);
    };

    // 请求获取数据
    const fetchData = async () => {
        try {
            const res = await http.post(GETPOSTLISTADMIN, {
                title: searchContext,
                pageNumber: currentPage,
                pageSize,
            });
            if (res.status === 200) {
                const { data, total } = res.data;
                setDataSource(data);
                setTotal(total);
            }
        } catch {}
    };

    // 处理搜索和页码变化
    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, searchContext]);

    return (
        <div className="h-full flex flex-col">
            {/* 功能块 */}
            <div className="flex flex-row justify-between items-center mb-2">
                <Search
                    placeholder="输入搜索内容"
                    onSearch={onSearch}
                    className="w-56 sm:w-72 md:w-96 duration-300"
                />
                <Button
                    onClick={() => {
                        navigate("/post/edit");
                    }}
                >
                    添加
                </Button>
            </div>
            {/* Form */}
            <Table
                className="w-full h-full grow"
                dataSource={dataSource}
                columns={columns}
                rowKey={(item) => item._id}
                pagination={{
                    pageSize,
                    current: currentPage,
                    hideOnSinglePage: true,
                    total: total,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
}
