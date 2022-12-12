import React from "react";

export default function FreezeScroll(props) {
    // children 如需可滚动需添加 overflow-auto 属性
    // 实现子组件可滚动效果的前提，父组件需 flex 布局 且满足宽高谷底不可变
    const { className, style, children } = props;
    return (
        <div className={`grow overflow-hidden ${className}`} style={style}>
            {children}
        </div>
    );
}
