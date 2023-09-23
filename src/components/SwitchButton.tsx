import React, { useEffect, useState } from 'react';
import { IconType } from '../types/enums';
import { getIconSVG } from '../types/icons';

interface SwitchButtonProps
{
    onClick: Function,
    isActive: boolean,
}

function SwitchButton(props: SwitchButtonProps)
{   
    const [isActive, setIsActive] = useState(props.isActive);

    return (
    <button className=  {"button button--switch"+((isActive) ? " button--active" : "")} 
            onClick=    {()=>{props.onClick(); setIsActive(prev => !prev)}}>
        <div className= {"runner"+((isActive) ? " runner--active" : "")}>
            {(isActive) ? getIconSVG(IconType.MOON, "var(--button-switch-color-icon)") : getIconSVG(IconType.SUN, "var(--button-switch-color-icon")}
        </div>
    </button>
    )
}

export default SwitchButton;




