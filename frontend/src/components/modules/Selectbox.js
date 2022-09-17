import React, { useEffect, useState, useLayoutEffect } from 'react';
import '../../css/style.css';


export default function Selectbox(props) {

    useLayoutEffect(() => {
        let select = document.querySelector('[name=' + props.name + ']');

        select.onchange = event => {
            console.log(select.value);
            props.selectItem(select.value);
        }
    }, [])

    return (
        <>
            <label for="select" id="word-gray">{props.label}</label>
            <select name={props.name}>
                <option value="">-</option>
                <option value="00:00">0:00</option>
                <option value="01:00">1:00</option>
                <option value="02:00">2:00</option>
                <option value="03:00">3:00</option>
                <option value="04:00">4:00</option>
                <option value="05:00">5:00</option>
                <option value="06:00">6:00</option>
                <option value="07:00">7:00</option>
                <option value="08:00">8:00</option>
                <option value="09:00">9:00</option>

            </select>
        </>
    );
};