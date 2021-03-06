import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as common from "../../../comm/common";
import {hideLoading, showAlertModal, showLoading} from "../../../action/aciton";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import Select from "../../common/Select";

const  AdminMenu = () => {
    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const pageTitle = "메뉴";

    const [modalStatus, setModalStatus] = useState({
        title : pageTitle + " 등록"
        ,   open : false
        ,   overLab : false
    });

    const closeModal = () => {
        setModalStatus((prevState => {
            return{
                ...prevState
                ,   open : false
            }
        }))
    };

    useEffect(() => {
        menuSearch();
    },[]);

    const addBtnClickEvent = (e) => {

        new Promise((resolve, reject)=>{

            setModalStatus((prevState => {
                return{
                    ...prevState
                    , title : pageTitle + "등록"
                    , open : true
                }
            }));

            resolve();
        }).then(()=>{

            const target = e.target;

            if(target.nodeName == "BUTTON"){
                document.getElementById("upperMenuIdPopup").value = target.parentNode.parentNode.id;
            } else if(target.nodeName == "I") {
                //console.log(e.target.parentNode.parentNode.parentNode.id);
                document.getElementById("upperMenuIdPopup").value = target.parentNode.parentNode.parentNode.id;
            }
        });
    }

    let tableInit = {
        headerColData : [{title: "ID",         name : "menuId",       width:"40%",  hidden: false,  useData : true}
                        ,{title: "메뉴명",      name : "menuName",    width:"30%",   hidden: false,  useData : true}
                        ,{title: "사용여부",    name : "useYnName",   width:"20%",   hidden: false}
                        ,{title: "추가",       name : "button",       width:"10%",  hidden: false,  btnValue:<i className="fa-solid fa-plus"></i>,  clickEvent: addBtnClickEvent}
                        ,{title: "부모메뉴명",  name : "upperMenuId",  width:"0",    hidden: true,  useData : true}
                        ,{title: "메뉴설명",    name : "menuDescription",  width:"0",    hidden: true,  useData : true}
                        ,{title: "메뉴 URL",     name : "menuUrl",  width:"0",    hidden: true,  useData : true}
                        ,{title: "사용여부",    name : "useYn",       width:"20%",   hidden: true,  useData : true}]
        ,   title : "Menu List"
        ,   selectCol : 'menuId'
        ,   deleted : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {
            dispatch(showLoading());
            new Promise((resolve, reject)=> {

                setModalStatus((prevState => {
                    return {
                        ...prevState
                        ,   title : pageTitle + "상세"
                        ,   open : true
                    }
                }));

                let data = {
                    menuId : e.target.parentNode.id
                };

                common.fetchLoad("/searchMenu","POST", data,(result) => {
                    resolve(result);
                });
            }).then((result) => {
                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true){
                        document.getElementById(value.name + "Popup").value = result.data.menu[value.name];
                    }
                });
                document.getElementById("menuIdPopup").disabled = "disabled";
                dispatch(hideLoading());
            });
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {menuIds : []};
                    let delChk = true;

                    data.menuIds = common.tableChkIds("chk");

                    bodyData.forEach((value, index)=>{

                        data.menuIds.forEach((delVal, delIndex)=> {

                            //console.log("delVal:"+delVal +"|menuId"+ value.menuId+"|leaf" +value.leaf);
                            if(delVal == value.menuId && value.leaf == "0"){
                                delChk = false;
                                dispatch(showAlertModal('하위항목을 삭제 해주시기 바랍니다.'));
                                return;
                            }
                        });
                    })

                    if(delChk){
                        common.fetchLoad("/deleteMenu","POST", data, () => {
                            dispatch(showAlertModal('삭제 되었습니다.'));
                            menuSearch();
                        });
                    }
                }
            }
        }
    }

    const menuSearch = () => {
        dispatch(showLoading());

        let data = {
                menuId     : document.getElementById("menuId").value
            ,   menuName   : document.getElementById("menuName").value
            ,   useYn       : document.getElementById("useYn").value
        };

        common.fetchLoad("/menuList","POST", data,(result) => {
            //console.log(result.data.menuList);
            //console.log(result.data.menuCnt);
            setBodyData(result.data.menuList);
            setBodyCnt(result.data.menuCnt);
            dispatch(hideLoading());
        });
    }

    const menuSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            if(modalStatus.overLab){
                dispatch(showAlertModal('중복된 메뉴가 존재합니다.'));
                return;
            }

            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                if(value.useData)
                    data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveMenu","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));

                setModalStatus((prevState => {
                    return {
                        ...prevState
                        ,   open : false
                    }
                }));

                menuSearch();
            });
        }
    }

    const menuOverlapChk = (e) => {

        let data = {
            menuId : e.target.value
        };

        common.fetchLoad("/searchMenu","POST", data,(result) => {

            let overLabResult = false;

            if(result.data.menu){
                document.getElementById("idCheck").innerText = "중복된 메뉴가 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
                overLabResult = true;
            } else {
                document.getElementById("idCheck").innerText = "메뉴";
                document.getElementById("idCheck").style.color = "black";
                overLabResult = false;
            }

            setModalStatus((prevState => {
                return {
                    ...prevState
                    ,   overLab : overLabResult
                }
            }))
        });
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">MENU</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{pageTitle} 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="메뉴 ID" id="menuId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="메뉴 명" id="menuName"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperMenuId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select search-slt"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={menuSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Table tableInit={tableInit}
                   bodyData={bodyData}
                   bodyCnt={bodyCnt}/>

            <Modal open={modalStatus.open} close={closeModal} header={modalStatus.title}>
                <form id="formTest">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuIdPopup" onChange={menuOverlapChk}/>
                        <label id="idCheck">메뉴</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuNamePopup"/>
                        <label>메뉴 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="upperMenuIdPopup" disabled={"disabled"}/>
                        <label>부모 메뉴</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuDescriptionPopup"/>
                        <label>메뉴 설명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuUrlPopup"/>
                        <label>메뉴 URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperMenuId={"U001"}
                                codeId={"useYnPopup"}
                                codeClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>사용여부</label>
                    </div>
                    <div className="mt-4 mb-0">
                        <div className="d-grid">
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={menuSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminMenu;
