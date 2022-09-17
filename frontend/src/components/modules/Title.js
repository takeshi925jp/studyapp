import React from "react";
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const Title = (props) => {

    const [title, setTitle] = useState("");
    const [returnFlg, setReturnFlg] = useState(false);

    const logout = () => {
        fetch('/logout')
            .then((res) => res.json())
            .then((data) => {
                window.location = "/login"
            });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={4}>
                </Grid>
                <Grid xs={4}>
                    <p>{props.title}</p>
                </Grid>
                <Grid xs={1}>
                    <button
                        type="button"
                        onClick={logout}>ログアウト
                    </button>
                </Grid>
                <Grid xs={1}>
                    {props.returnFlg && (
                        <div>
                            <a href={props.return_link}>戻る</a>
                        </div>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Title;