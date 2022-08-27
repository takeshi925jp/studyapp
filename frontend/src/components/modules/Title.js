import React from "react";
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const Title = (props) => {

    const [title, setTitle] = useState("");
    const [returnFlg, setReturnFlg] = useState(false);

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <p>{props.title}</p>
                </Grid>
                <Grid xs={1}>
                    <a href="/login">ログアウト</a>
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