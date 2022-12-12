import React from "react";
import styled from "styled-components";

const ScrollBeauty = styled.div`
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

export default function ScrollBarBeauty(props) {
    return (
        <ScrollBeauty className={props.className} style={props.style}>
            {props.children}
        </ScrollBeauty>
    );
}
