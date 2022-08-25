import React from "react";
import { useState, useEffect } from 'react'

const Title = (props) => {

    const [title, setTitle] = useState("");

    return (
        <>
            <div className="title-area">
                
                <p>{props.title}</p>                
                <div>
                    <a href="/login">ログアウト</a>
                </div>
                <div>
                    <a href={props.return_link}>戻る</a>
                </div>
            </div>
        </>
    );
};

export default Title;