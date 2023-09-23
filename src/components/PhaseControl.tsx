import React from 'react';
import { IconType, PhaseType } from '../types/enums';
import IconButton from './IconButton';

interface PhaseControlProps
{
    phaseType: PhaseType,
    timeValue: number,
    timeSetter: Function,
}

function PhaseControl(props: PhaseControlProps)
{
    const name = (props.phaseType === PhaseType.BREAK) ? "break" : "session";

    return (
        <div className={"phase phase--"+name}>

            <div className="phase__header header">
                <h2 id={name+"-label"} className="header__title">{name} length</h2>
            </div>

            <div className={"phase__time phase__time--"+name} >
                <h3 id={name+"-length"}>{props.timeValue}</h3>
            </div>

            <div className="phase__control">
                <div className="setter-group setter-group--one">
                    <IconButton onClick={()=>{props.timeSetter(props.phaseType, -1)}} text={"1"} iconType={IconType.MINUS} className="button--phase-setter" id={name+"-decrement"}/>
                    <IconButton onClick={()=>{props.timeSetter(props.phaseType, +1)}} text={"1"} iconType={IconType.PLUS} className="button--phase-setter" id={name+"-increment"}/>
                </div>
                <div className="setter-group setter-group--five">
                    <IconButton onClick={()=>{props.timeSetter(props.phaseType, -5)}} text={"5"} iconType={IconType.MINUS} className="button--phase-setter"/>
                    <IconButton onClick={()=>{props.timeSetter(props.phaseType, +5)}} text={"5"} iconType={IconType.PLUS} className="button--phase-setter"/>
                </div>
            </div>

        </div>
    )
}

export default PhaseControl;