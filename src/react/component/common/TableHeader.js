import React from "react";

const TableHeader = (props) => {

    let checkBox = null;

    const itemAllCheck = (e) => {
        if(e.target.checked){
            document.getElementsByName("chk").forEach((value, index) => {
                value.checked = true;
            })
        } else {
            document.getElementsByName("chk").forEach((value, index) => {
                value.checked = false;
            })
        }
    }

    if(props.tableInit.deleted){
        checkBox = <th><input className="form-check-input" type="checkbox" id="allCheck" onClick={itemAllCheck}/></th>;
    } else {
        checkBox = null;
    }

    return(
        <thead>
            <tr>
                {checkBox}
                {
                    props.tableInit.headerColData.map((value, index) =>
                        value.hidden == false
                        ?
                        (
                            <th key={index}>{value.title}</th>
                        )
                        :
                        null
                    )
                }
            </tr>
        </thead>
    )
};
export default TableHeader;