// 依赖导入
import React, { lazy, useState, useEffect } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { http, VERIFYTOKEN } from "../utils/request";

// 框架
const App = lazy(() => {
    return import("../pages/App");
});

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

// 编辑页面
const Edit = lazy(() => {
    return import("../components/postController/Edit");
});

// 文章列表 cate/:cateType
const PostList = lazy(() => {
    return import("../components/postController/PostList");
});

const User = lazy(() => {
    return import("../pages/User");
});

// 注册及登录界面
const Welcome = lazy(() => {
    return import("../pages/Welcome");
});

const Admin = lazy(() => {
    return import("../pages/Admin");
});

const UserControl = lazy(() => {
    return import("../components/adminController/UserControl");
});
const PostControl = lazy(() => {
    return import("../components/adminController/PostControl");
});
const WebControl = lazy(() => {
    return import("../components/adminController/WebControl");
});
const WebData = lazy(() => {
    return import("../components/adminController/WebData");
});

// 管理
// const WebsiteManager = lazy(() => {
//     return import("../components/managerController/WebsiteManager");
// });
// const UserManager = lazy(() => {
//     return import("../components/managerController/UserManager");
// });
// const PostManager = lazy(() => {
//     return import("../components/managerController/PostManager");
// });
// const ConsumeManager = lazy(() => {
//     return import("../components/managerController/ConsumeManager");
// });

export const MyContext = React.createContext(undefined);

export default function Router() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginUser, setLoginUser] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    const [alertContext, setAlertContext] = useState("");
    const { email, auth } = loginUser;

    // 全局提示信息
    const showAlert = (keeptime = 2000, message) => {
        setAlertContext(message);
        setIsAlert(true);
        setTimeout(() => {
            setIsAlert(false);
        }, keeptime);
    };

    // 监听路由地址，导航守卫
    useEffect(() => {
        if (location.pathname.startsWith("/user")) {
            // 用户路径监听
            if (email === undefined || email === "") {
                navigate("/welcome");
                showAlert(2000, "您还未登录");
            }
        } else if (location.pathname.startsWith("/admin")) {
            // 管理路径监听
            if (email === undefined || email === "" || auth < 5) {
                navigate("/");
                showAlert(2000, "您不具有相关权限");
            }
        } else if (location.pathname.startsWith("/welcome")) {
            if (email !== undefined) {
                navigate("/user");
                showAlert(2000, "您已登录账号");
            }
        }
    }, [location.pathname]);

    // 监听 TOKEN 及 loginUser
    useEffect(() => {
        (async () => {
            if (
                localStorage.getItem("token") &&
                Object.keys(loginUser).length === 0
            ) {
                const res = await http.post(VERIFYTOKEN);
                if (res.status === 200) {
                    setLoginUser(res.data.data);
                    console.log(res.data.data);
                }
            }
        })();
    }, [email]);

    return (
        <MyContext.Provider value={{ loginUser, setLoginUser, showAlert }}>
            {/* 提示信息 */}
            <CSSTransition
                in={isAlert}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div className="fixed z-50 top-1/4 left-1/2 -translate-x-1/2 select-none bg-gray-300 p-4 rounded">
                    {alertContext}
                </div>
            </CSSTransition>
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
                    {/* 文章 */}
                    <Route path="post">
                        <Route index element={<Navigate to="/cate/all" />} />
                        {/* edit 页面后续移入 admin 路由 */}
                        <Route path="edit" element={<Edit />} />
                        <Route path=":_id" element={<Post />} />
                    </Route>
                    {/* 关于 */}
                    <Route path="about" element={<About />} />
                    {/* 反馈 */}
                    <Route path="/feedback" element={<Feedback />} />
                    {/* 登录注册 */}
                    <Route path="/welcome" element={<Welcome />} />
                    {/* 用户页面 */}
                    <Route path="/user" element={<User />} />
                </Route>

                {/* 管理页 */}
                <Route path="/admin" element={<Admin />}>
                    <Route
                        index
                        element={
                            <div className="flex grow justify-center items-center">
                                暂未选择功能项
                            </div>
                        }
                    />
                    <Route path="web" element={<WebControl />} />
                    <Route path="webdata" element={<WebData />} />
                    <Route path="user" element={<UserControl />} />
                    <Route path="post" element={<PostControl />} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Route>

                {/* <Route path="/admin">
                        <Route path="" element={<Navigate to="website" />} />
                        <Route path="website" element={<WebsiteManager />} />
                        <Route path="user" element={<UserManager />} />
                        <Route path="post" element={<PostManager />} />
                        <Route path="consume" element={<ConsumeManager />} />
                    </Route> */}

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
        </MyContext.Provider>
    );
}
