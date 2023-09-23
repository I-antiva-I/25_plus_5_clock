import React, { useMemo } from 'react';
import useClock from '../hooks/useClock';
import DisplayControl from './DisplayControl';
import { PhaseType } from '../types/enums';
import { formattedTime, percentage } from '../types/utility';
import alarm from "../assets/audio/alarm_default.wav";

interface DisplayPanelProps
{
    phaseTime:
    {
        breakTime: number,
        sessionTime: number,
    }
    timeSetter: Function,
}

const playSound = () =>
{
    console.log("BEEP!");
    const alarm = document.getElementById("alarm") as HTMLAudioElement;

    if (alarm) {alarm.play();}
}

function DisplayPanel(props: DisplayPanelProps)
{
    const clock = useClock(PhaseType.SESSION, props.phaseTime.sessionTime, props.phaseTime.breakTime, playSound);
    const time = useMemo(() => {return formattedTime(clock.time)}, [clock.time]);
    const progress = useMemo(() =>
    {
        return percentage((clock.phase === PhaseType.SESSION) ? props.phaseTime.sessionTime*60 : props.phaseTime.breakTime*60, clock.time)
    },[clock.time])
    
    return (
        <div className={"display display"+((clock.phase === PhaseType.BREAK) ? "--break" : "--session")}>        
            <div id="timer-label" className="display__phase">{PhaseType[clock.phase]}</div>

            <div className="progress-bar">
                <div className="progress-bar__indicator" style={{width: progress}}/>
            </div>

            <div id="time-left" className="display__time">{time}</div>

            <DisplayControl start={clock.start} stop={clock.stop} next={clock.next} 
                reset={() => {props.timeSetter(PhaseType.BOTH, -1); clock.reset()}}/>

            <audio id="alarm">
                <source src={alarm} type="audio/wav"/>
                Your browser does not support the audio tag.
            </audio>
        </div>
    )
}

export default DisplayPanel;