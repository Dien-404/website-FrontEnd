import React from "react";
import styled from "styled-components";

const Scroll = styled.div`
    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.3125rem;
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

export default function ScrollBeauty(props) {
    return <Scroll>{props.children}</Scroll>;
}
