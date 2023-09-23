import React, { useEffect, useRef, useState } from 'react';
import { IconType } from '../types/enums';
import { getIconSVG } from '../types/icons';

interface IconButtonProps
{
    onClick: Function,
    text: string,
    iconType: IconType,
    className?: string,
    id?: string,
}

function IconButton(props: IconButtonProps)
{
    const [svgColor, setSvgColor] = useState("var(--button-color-icon)");

    return (
        <button className=  {"button button--icon "+props.className} id={props.id}
            onClick=        {()=>{props.onClick()}} 
            onMouseEnter=   {()=>{setSvgColor("var(--button-color-icon-hovered)");}}
            onMouseLeave=   {()=>{setSvgColor("var(--button-color-icon)");}}
            onMouseDown=    {()=>{setSvgColor("var(--button-color-icon-pressed)");}}
            onMouseUp=      {()=>{setSvgColor("var(--button-color-icon-hovered)");}}>
            <div className="button__icon">
                {getIconSVG(props.iconType, svgColor)}
            </div>
            <div className="button__text">{props.text}</div>
        </button>
    )
}

export default IconButton;