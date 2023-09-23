import React, { useState } from 'react';

import MyHeader from './components/MyHeader';
import PhaseControl from './components/PhaseControl';
import DisplayPanel from './components/DisplayPanel';

import { PhaseType, ThemeType } from './types/enums';

import { useTheme } from './providers/ThemeProvider';


interface PhaseTime
{
    breakTime: number,
    sessionTime: number,
}

function App() 
{
  const [phaseTime, setDefaultTime] = useState<PhaseTime>({breakTime: 5, sessionTime: 25})
  const changeTime = (key: PhaseType, value: number) =>
  {
    switch (key)
    {
      case PhaseType.BREAK:
        setDefaultTime({...phaseTime, breakTime: Math.max(Math.min(phaseTime.breakTime + value, 60), 1)});
        break;

      case PhaseType.SESSION:
        setDefaultTime({...phaseTime, sessionTime: Math.max(Math.min(phaseTime.sessionTime + value, 60), 1)});
        break;
        
      case PhaseType.BOTH:
        setDefaultTime({breakTime: 5, sessionTime: 25});
        break;

      default:
        console.log("No such key...");
    }
  };

  const theme = useTheme();

  return (
      <div className="application">
        <main className="application__content">
          <MyHeader phaseTime={phaseTime} />

          <div className="phases">
            <PhaseControl phaseType={PhaseType.BREAK} timeSetter={changeTime} timeValue={phaseTime.breakTime} />
            <PhaseControl phaseType={PhaseType.SESSION} timeSetter={changeTime} timeValue={phaseTime.sessionTime} />
          </div>

          <DisplayPanel phaseTime={phaseTime} timeSetter={changeTime} />
        </main>
      </div>
  );
}

export default App;
