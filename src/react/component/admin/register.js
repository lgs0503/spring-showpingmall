
import React, {useEffect, useState} from 'react';
import "../../css/styles.css";
import AdminLoginRegiFooter from "./footer";
import * as common from "../../comm/common";
import DaumPostcode from 'react-daum-postcode';
import Modal from "../common/Modal";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../action/aciton";
import "../../css/custom.css"

const  AdminRegister = () => {
    const dispatch = useDispatch();

    let idCheckStatus = "";

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [isOpenPost, setIsOpenPost] = useState(false);

    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }
        document.getElementById("location").value = fullAddr;
        closeModal();
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect( () => {

    },[]);

    const userIdCheck = () => {
        let data = {
            userId : document.getElementById("userId").value
        };

        common.fetchLoad("/userIdCheck", "POST", data, function (result) {
            idCheckStatus = result.idCheckStatus;
            if(idCheckStatus == "1"){
                document.getElementById("idCheck").innerText = "중복된 계정이 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
            } else {
                document.getElementById("idCheck").innerText = "아이디";
                document.getElementById("idCheck").style.color = "black";
            }
        });
    };

    const fileChange = () => {
        common.uploadImgChange("imageFile", "thumbnailImg");
    }

    const register = () => {

        /* 아이디 중복 체크 */
        if(idCheckStatus == "1"){
            dispatch(showAlertModal('중복된 아이디가 존재합니다.'));
            return;
        }

        /* 비밀번호 체크 */
        if(document.getElementById("password").value != document.getElementById("passwordchk").value){
            dispatch(showAlertModal('비밀번호 와 비밀번호 확인이 일치하지 않습니다.'));
            document.getElementById("passwordchk").focus();
            return;
        }

        let data = {
            userId : document.getElementById("userId").value,
            password : document.getElementById("password").value,
            userName : document.getElementById("userName").value,
            birthday : document.getElementById("birthday").value,
            gender : document.getElementById("gender").value,
            email : document.getElementById("email").value,
            location : document.getElementById("location").value,
            locationDetail : document.getElementById("locationDtl").value,
            imageFileNo : "1",
            phoneNum : document.getElementById("phoneNum").value,
            userRule : "0",
            deleted : "0"
        };

        /* 필수값 체크 */
        let validationChkName = ["아이디", "비밀번호"
            , "성명", "생년월일"
            , "성별", "이메일"
            , "주소", "상세주소"
            , "연락처"];

        let validationChkId = ["userId", "password"
            , "userName", "birthday"
            , "gender" , "email"
            , "location", "locationDtl"
            , "phoneNum"];

        for(let i = 0 ; i < validationChkName.length ; i++){
            if (!common.nullCheck(document.getElementById(validationChkId[i]).value)){
                dispatch(showAlertModal("["+ validationChkName[i] + "]를 입력해주세요."));
                document.getElementById(validationChkId[i]).focus();
                return;
            }
        }

        /* 파일이 존재하면 */
        if(document.getElementById("imageFile").value){

            /*파일업로드 */
            new Promise(function(resolve, reject){
                let form = new FormData();
                form.append( "file", document.getElementById("imageFile").files[0]);

                common.fetchLoad("/file/upload", "POST", form, function (result) {
                    resolve(result.uploadList[0].fileNo);
                }, true);

            }).then(function (resolve) {
                /* 이미지 번호가 있으면 회원가입에 같이 저장한다.*/
                if (resolve){
                    data.imageFileNo = resolve;
                }
                common.fetchLoad("/registerProcessing", "POST", data, function (result) {
                    if (result.registerStatus == "1"){
                        dispatch(showAlertModal("회원가입이 성공되었습니다."));
                        window.location.href = "/spring-showpingmall/#/admin/login";
                    }
                });
            });

        } else {  /* 파일이 없으면 파일업로드 제외 */

            common.fetchLoad("/registerProcessing", "POST", data, function (result) {
                if (result.registerStatus == "1"){
                    dispatch(showAlertModal("회원가입이 성공되었습니다."));
                    window.location.href = "/spring-showpingmall/#/admin/login";
                }
            });
        }
    }

    const imageStyle = {
        "width" : "100%",
        "border" : "1px solid #ced4da"
    };

   return (
      <div className="bg-primary">
          <div id="layoutAuthentication">
              <div id="layoutAuthentication_content">
                  <main>
                      <div className="container">
                          <div className="row justify-content-center">
                              <div className="col-lg-7">
                                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Admin 회원가입</h3></div>
                                      <div className="card-body">
                                          <form>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="userId" type="text" placeholder="아이디를 입력해주세요" maxLength="20" onChange={userIdCheck}/>
                                                  <label htmlFor="userId" id="idCheck">아이디</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="password" type="password" placeholder="비밀번호를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="password">비밀번호</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="passwordchk" type="password" placeholder="비밀번호를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="passwordchk">비밀번호 확인</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="userName" type="text" placeholder="성명을 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="userName">성명</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="birthday" type="date" placeholder="생년월일를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="birthday">생년월일</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <select id="gender" className="form-select">
                                                      <option value="">선택</option>
                                                      <option value="1">남자</option>
                                                      <option value="2">여자</option>
                                                  </select>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="email" type="email" placeholder="name@example.com"/>
                                                  <label htmlFor="email">이메일</label>
                                              </div>
                                              <div className="row mb-3">
                                                  <div className="col-md-8">
                                                      <div className="form-floating mb-3 mb-md-0">
                                                          <input className="form-control" id="location" type="text" placeholder="주소를 입력해주세요"/>
                                                          <label htmlFor="location">주소</label>
                                                      </div>
                                                  </div>
                                                  <div className="col-md-4">
                                                      <div className="form-floating mb-3 mb-md-0">
                                                          <div className="d-grid">
                                                              <a className="btn btn-primary btn-block locationBtnPadding" id="btnLocation" onClick={openModal}>주소찾기</a>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="locationDtl" type="text"
                                                         placeholder="상세주소를 입력해주세요"/>
                                                  <label htmlFor="locationDtl">상세주소</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="phoneNum" type="text"
                                                         placeholder="010-1234-5678" maxLength="30"/>
                                                  <label htmlFor="phoneNum">연락처(-)없이 숫자만 입력</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control fileInput" id="imageFile" type="file" accept=".gif, .jpg, .png" onChange={fileChange}/>
                                                  <label>프로필 사진</label>
                                              </div>
                                              <img id="thumbnailImg" src="" style={imageStyle}/>
                                              <div className="mt-4 mb-0">
                                                  <div className="d-grid">
                                                      <a className="btn btn-primary btn-block" id="btnRegister" onClick={register}>회원가입</a>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                      <div className="card-footer text-center py-3">
                                          <div className="small"><Link to="/admin/login">뒤로가기</Link></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </main>
              </div>
              <AdminLoginRegiFooter/>
          </div>
          <Modal open={modalOpen} close={closeModal} header="주소찾기">
              <DaumPostcode autoClose onComplete={onCompletePost } />
          </Modal>
      </div>
  );
}
export default AdminRegister;
