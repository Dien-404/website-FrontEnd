import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Popconfirm, Button, Modal, Form, Input, message } from "antd";

import {
    http,
    GETUSERLISTADMIN,
    DELETEUSER,
    ADDUSER,
    BLOCKUSER,
} from "../../utils/request";
import { format } from "../../utils/timeTransfer";
import { MyContext } from "../../routers/index";

export default function UserControl() {
    const [messageApi, contextHolder] = message.useMessage();
    const formRef = useRef(null);
    const { showAlert } = useContext(MyContext);
    const navigate = useNavigate();
    // 数据源
    const [dataSource, setDataSource] = useState([]);
    // 页码
    const [currentPage, setCurrentPage] = useState(1);
    // 展示数量
    const [pageSize, setPageSize] = useState(10);
    // allNumber
    const [total, setTotal] = useState(0);
    // 处理页码变化
    const handlePageChange = (number, size) => {
        setCurrentPage(number);
        setPageSize(size);
    };

    // 删除用户
    async function handleDeleteUser({ _id }) {
        try {
            const res = await http.post(DELETEUSER, { _id });
            if (res.status === 200) {
                messageApi.info("删除该用户成功");
                fetchUserList();
            } else {
                messageApi.error("删除该用户失败");
            }
        } catch (err) {
            const errMessage = err?.response?.data?.err;
            if (errMessage !== undefined || errMessage !== "") {
                messageApi.error(errMessage);
            } else {
                messageApi.error("删除该用户失败");
            }
        }
    }
    // 拉黑用户
    async function handleBlockUser({ _id, block }) {
        try {
            const res = await http.post(BLOCKUSER, { _id, block });
            if (res.status === 200) {
                messageApi.info(
                    `成功${block === true ? "拉黑该用户" : "取消黑名单"}`
                );
                fetchUserList();
            } else {
                messageApi.error("操作失败");
            }
        } catch {
            messageApi.error("操作失败");
        }
    }

    // 获取用户列表
    async function fetchUserList() {
        try {
            const res = await http.post(GETUSERLISTADMIN);
            if (res.status === 200) {
                const { data, total } = res.data;
                setDataSource(data);
                setTotal(total);
            }
        } catch {}
    }

    const columns = [
        { title: "用户账号", dataIndex: "email" },
        { title: "用户昵称", dataIndex: "name" },
        {
            title: "权限",
            dataIndex: "auth",
            render: (auth) => <span className="text-rose-400">{auth}</span>,
        },
        {
            title: "账户状态",
            dataIndex: "status",
            render: (status) => (
                <span
                    className={`${
                        status === 1 ? "text-black" : "text-red-400"
                    }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "注册时间",
            dataIndex: "registTime",
            render: (time) => <>{format(time)}</>,
        },
        {
            title: "操作",
            dataIndex: "_id",
            render: (_id, record) => (
                <div className="flex flex-row">
                    <Popconfirm
                        title={
                            record.status === 1
                                ? "确定拉黑该用户嘛？"
                                : "确定取消黑名单嘛？"
                        }
                        cancelText="取消"
                        okText={record.status === 1 ? "确定拉黑" : "取消黑名单"}
                        onConfirm={() => {
                            handleBlockUser({
                                _id,
                                block: record.status === 1 ? true : false,
                            });
                        }}
                        className="mr-1"
                    >
                        <Button>
                            {record.status === 1 ? "拉入黑名单" : "取消黑名单"}
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="确定删除该用户嘛？"
                        cancelText="取消"
                        okText="确定删除"
                        onConfirm={() => {
                            handleDeleteUser({ _id });
                        }}
                        className="mr-1"
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    // 创建用户对话框
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 打开对话框
    const showModal = () => {
        setIsModalOpen(true);
    };
    // 关闭对话框
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // 创建用户
    const handleOk = async () => {
        formRef.current
            .validateFields()
            .then(async (values) => {
                const { email, pwd, correctPwd } = values;
                try {
                    const res = await http.post(ADDUSER, {
                        email,
                        pwd,
                        correctPwd,
                    });
                    if (res.status === 200) {
                        messageApi.info("添加账户成功");
                        closeModal();
                    } else {
                        messageApi.info("添加账户失败");
                    }
                } catch (err) {
                    const errMessage = err?.response?.data?.err;
                    if (errMessage !== undefined || errMessage !== "") {
                        messageApi.info(errMessage);
                    } else {
                        messageApi.info("添加账户失败");
                    }
                }
            })
            .catch(() => {
                console.log("表单元素错误");
            });
    };
    // 取消对话框
    const handleCancel = () => {
        closeModal();
    };

    useEffect(() => {
        fetchUserList();
    }, [currentPage, pageSize]);

    return (
        <div className="h-full flex flex-col">
            {contextHolder}
            <Modal
                title="创建用户"
                open={isModalOpen}
                destroyOnClose={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form ref={formRef}>
                    <Form.Item
                        label="邮箱地址"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "请输入邮箱地址",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="pwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="correctPwd"
                        rules={[
                            {
                                required: true,
                                message: "请重新输入密码",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            <div className="flex justify-end items-center mb-2">
                <Button onClick={showModal}>创建用户</Button>
            </div>
            <Table
                className="w-full h-full grow"
                dataSource={dataSource}
                columns={columns}
                rowKey={(item) => item._id}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    hideOnSinglePage: true,
                    onChange: { handlePageChange },
                }}
            />
        </div>
    );
}
