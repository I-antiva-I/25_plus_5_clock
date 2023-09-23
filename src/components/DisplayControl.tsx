import React from 'react';
import IconButton from './IconButton';
import { IconType } from '../types/enums';

interface ClockControlProps
{
    start: Function,
    stop: Function,
    next: Function,
    reset: Function,
}

function DisplayControl(props: ClockControlProps)
{
    return (
        <div className="display__control">
            <IconButton onClick={()=>{props.start()}} text={"start"} iconType={IconType.PLAY} className="button--display-setter"/>
            <IconButton onClick={()=>{props.stop()}} text={"stop"} iconType={IconType.PAUSE} className="button--display-setter"/>
            <IconButton onClick={()=>{props.reset()}} text={"reset"} iconType={IconType.RESET} className="button--display-setter"/>
            <IconButton onClick={()=>{props.next()}} text={"next"} iconType={IconType.SKIP} className="button--display-setter"/>
        </div>
    )
}

export default DisplayControl;