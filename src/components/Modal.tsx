import React from 'react';
import { IconType } from '../types/enums';
import IconButton from './IconButton';
import { getIconSVG } from '../types/icons';

interface ModalProps
{
    toggleModal: Function
}

function Modal(props: ModalProps)
{    
    return (
    <div className="modal">
        <div className="modal__content">
            <IconButton onClick={()=>{props.toggleModal()}} text={"Close"} iconType={IconType.RESET} className="button--modal-close"/>

            <div className="modal__header header">
                <h2 className="header__title">information</h2>
                <h3 className="header__subtitle">This application is based on challenge from freeCodeCamp</h3>
            </div>
            <div>
                <a href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock" target="_blank">Link</a>
            </div>

        </div>
    </div>
    )
}

export default Modal;




