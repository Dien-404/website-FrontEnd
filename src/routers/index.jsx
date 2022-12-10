// 依赖导入
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = lazy(() => {
    return import("../pages/App");
});

// Routes 页面懒加载
// 主页
const Home = lazy(() => {
    return import("../pages/Home");
});
// 分类
const About = lazy(() => {
    return import("../pages/About");
});
// 关于
const Cate = lazy(() => {
    return import("../pages/Cate");
});
// 反馈
const Feedback = lazy(() => {
    return import("../pages/Feedback");
});

// 文章(单个展示)
const Post = lazy(() => {
    return import("../components/postController/Post");
});

const ArticleEdit = lazy(() => {
    return import("../components/ArticleEdit");
});

// 文章列表 cate/:cateType
const PostList = lazy(() => {
    return import("../components/postController/PostList");
});

// 注册及登录界面
const Welcome = lazy(() => {
    return import("../pages/Welcome");
});
// 管理
const WebsiteManager = lazy(() => {
    return import("../components/managerController/WebsiteManager");
});
const UserManager = lazy(() => {
    return import("../components/managerController/UserManager");
});
const PostManager = lazy(() => {
    return import("../components/managerController/PostManager");
});
const ConsumeManager = lazy(() => {
    return import("../components/managerController/ConsumeManager");
});

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="w-screen h-screen flex justify-center items-center">
                        loading...
                    </div>
                }
            >
                <Routes>
                    {/* 默认页 */}
                    <Route path="/" element={<App />}>
                        {/* 主页 */}
                        <Route index element={<Home />} />
                        {/* 分类 */}
                        <Route path="cate">
                            <Route index element={<Cate />} />
                            {/* 类别分类导航 */}
                            <Route path=":cateType" element={<PostList />} />
                        </Route>

                        {/* 文章编辑 测试用 */}
                        {/* 后续将删除 unsafe */}
                        <Route path="article/edit" element={<ArticleEdit />} />

                        {/* 文章 */}
                        <Route path="post">
                            <Route
                                index
                                element={<Navigate to="/cate/all" />}
                            />
                            <Route path=":_id" element={<Post />} />
                        </Route>
                        {/* 关于 */}
                        <Route path="about" element={<About />} />
                        {/* 反馈 */}
                        <Route path="/feedback" element={<Feedback />} />
                        {/* 登录注册 */}
                        <Route path="/welcome" element={<Welcome />} />
                    </Route>
                    {/* 管理页 */}
                    <Route path="/admin">
                        <Route path="" element={<Navigate to="website" />} />
                        <Route path="website" element={<WebsiteManager />} />
                        <Route path="user" element={<UserManager />} />
                        <Route path="post" element={<PostManager />} />
                        <Route path="consume" element={<ConsumeManager />} />
                    </Route>
                    {/* 404匹配 */}
                    <Route
                        path="*"
                        element={
                            <div className="w-screen h-screen flex justify-center items-center">
                                404
                            </div>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
