import React from "react";

const InputArea = (props) => {

    return (
        <>
          <input id="input-area-mini"
            placeholder={props.holder}
            value={props.item}
            onChange={props.onChangeItem}
            type={props.type}
          />
        </>
    );
};

export default InputArea;