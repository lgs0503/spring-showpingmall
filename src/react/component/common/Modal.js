import React, {useEffect, useState} from 'react';
import '../../css/modal.css';
import '../../css/custom.css';

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    useEffect(() => {
        const escKeyModalClose = (e) => {
            if (e.keyCode === 27) {
                close();
            }
        };
        window.addEventListener("keydown", escKeyModalClose);
        return () => window.removeEventListener("keydown", escKeyModalClose);
    }, []);

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div id="modal" className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section className={props.modalSize ? props.modalSize : 'modalSize4'}>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            {' '}
                            &times;{' '}
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <button className="close" onClick={close}>
                            {' '}
                            닫기{' '}
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;