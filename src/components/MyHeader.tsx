import React, { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import SwitchButton from './SwitchButton';
import Modal from './Modal';
import IconButton from './IconButton';
import { IconType, ThemeType } from '../types/enums';

interface MyHeaderProps
{
    phaseTime:
    {
        breakTime: number,
        sessionTime: number,
    }
}

function MyHeader(props: MyHeaderProps)
{
    const theme = useTheme();
    const [isModalOpened, SetIsModalOpened] = useState<boolean>(false);

    return (
        <header className="application__header header">
            <div className="header__control">
                <IconButton onClick={() => {SetIsModalOpened(prev => !prev)}} 
                        text="Info" iconType={IconType.INFO} className="button--modal-open"/>
                <SwitchButton onClick={()=>{theme.toggle()}} isActive={(theme.theme === ThemeType.DARK)}/>
            </div>

            {(isModalOpened) && <Modal toggleModal={()=>{SetIsModalOpened(prev => !prev)}}/>}

            <div className="header__title">
                <h1>{props.phaseTime.sessionTime} + {props.phaseTime.breakTime} Clock</h1>
            </div>
            
        </header>
    )
}

export default MyHeader;
