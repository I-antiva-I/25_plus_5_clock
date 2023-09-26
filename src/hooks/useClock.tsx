import { useEffect, useReducer, useRef, useState } from "react";
import { ClockStatus, PhaseType } from "../types/enums";

const startingTime = (phase: PhaseType, sessionTime: number = 25, breakTime: number = 5) =>
{
    return (phase===PhaseType.BREAK) ? breakTime*60 : sessionTime*60;
}

interface ClockState
{
    status: ClockStatus,
    phase: PhaseType,
    time: number,
}

interface ClockAction
{
    type: ClockActionType,
    times?: {sessionTime: number, breakTime: number},
    phase?: PhaseType,
}

enum ClockActionType
{
    START,
    STOP,
    SHIFT,
    REFRESH,
    COUNTDOWN,
    RESET,
}

const reducer = (state: ClockState, action: ClockAction) =>
{
    switch(action.type)
    {
        case ClockActionType.START:
            return {...state, status: ClockStatus.ACTIVE}

        case ClockActionType.STOP:
            return {...state, status: ClockStatus.PAUSED}

        case ClockActionType.SHIFT:
            const shiftedPhase = (state.phase === PhaseType.BREAK) ? PhaseType.SESSION : PhaseType.BREAK;
            return {...state, time: startingTime(shiftedPhase, action.times?.sessionTime, action.times?.breakTime), phase: shiftedPhase}
        
        case ClockActionType.REFRESH:
            if (action.phase !== undefined)
            {
                return {...state, time: startingTime(action.phase, action.times?.sessionTime, action.times?.breakTime), phase: action.phase}
            }
            else
            {
                return {...state, time: startingTime(state.phase, action.times?.sessionTime, action.times?.breakTime)}
            }
            
        case ClockActionType.COUNTDOWN:
            return {...state, time: state.time - 1}

        case ClockActionType.RESET:
            const newPhase = (action.phase) ? action.phase : PhaseType.BREAK;
            return {...state, time: startingTime(newPhase, action.times?.sessionTime, action.times?.breakTime), phase: newPhase}

        default:
            return state;
    }
}

export default function useClock(phase: PhaseType, sessionTime: number = 25, breakTime: number = 5, playSound: Function)
{
    const [state, dispatch] = useReducer(reducer, 
        {status: ClockStatus.PAUSED, phase: phase, time: (phase===PhaseType.BREAK) ? breakTime*60 : sessionTime*60});
    const intervalReference = useRef<number | undefined>(undefined);

    // Start countdown
    const startClock = () =>
    {
        if (intervalReference.current === undefined)
        {
            dispatch({type: ClockActionType.START});
            intervalReference.current = window.setInterval(()=>{dispatch({type: ClockActionType.COUNTDOWN})}, 1000);
        }
        else {console.log("Already started", intervalReference.current);}
    }

    // Stop countdown
    const stopClock = () =>
    {
        if (intervalReference.current !== undefined)
        {
            dispatch({type: ClockActionType.STOP});
            window.clearInterval(intervalReference.current);
            intervalReference.current = undefined;
        }
        else {console.log("Already stopped");}
    }

    // Proceed to the next phase
    const nextPhase = () =>
    {
        dispatch({type: ClockActionType.SHIFT, times: {sessionTime, breakTime}});
    }

    // 
    const resetClock = () =>
    {
        stopClock();
        dispatch({type: ClockActionType.REFRESH, times: {sessionTime, breakTime}, phase: phase});
    }

    // Stop countdown and clear interval on unmount
    useEffect(()=>
    {
        return () => {stopClock()}
    },[])

    // If zero is reached, shift to the next phase
    useEffect(()=>
    {
        if (state.time < 0)
        {
            // BUZZER
            playSound();
            nextPhase();
        }
    }, [state.time])

    // Change of break time
    useEffect(()=>
    {
        if (state.phase === PhaseType.BREAK)
        {
            if (state.status === ClockStatus.ACTIVE) {stopClock();}
            dispatch({type: ClockActionType.REFRESH, times: {sessionTime, breakTime}});
        }

    }, [breakTime])

    // Change of session time
    useEffect(()=>
    {
        if (state.phase === PhaseType.SESSION)
        {
            if (state.status === ClockStatus.ACTIVE) {stopClock();}
            dispatch({type: ClockActionType.REFRESH, times: {sessionTime, breakTime}});
        }

    }, [sessionTime])

    return {time: state.time, status: state.status, phase: state.phase,
         start: startClock, stop: stopClock, next: nextPhase, reset: resetClock};
}