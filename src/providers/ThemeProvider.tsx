import React, { createContext, useContext, useState, PropsWithChildren, useRef, useEffect } from "react";
import { ThemeType } from "../types/enums";

interface ThemeState 
{
    theme: ThemeType;
    setTheme: Function;
    toggle: Function;
}

const defaultThemeState: ThemeState = 
{
    theme: ThemeType.DARK,
    setTheme: () => {console.log("Placeholder for Setter")},
    toggle: () => {console.log("Placeholder for Toggle")},
};

const ThemeContext = createContext(defaultThemeState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren<unknown>> = ({children}) => 
{
    const [theme, setTheme] =
        useState<ThemeType>((window.matchMedia("(prefers-color-scheme: light)").matches) ? ThemeType.LIGHT : ThemeType.DARK);
        
    const toggle = () => {(theme === ThemeType.DARK) ? setTheme(ThemeType.LIGHT) : setTheme(ThemeType.DARK);}

    useEffect(()=>
    {
        document.documentElement.setAttribute("data-theme", (theme === ThemeType.DARK) ? "dark" : "light");
    },[theme])


    return <ThemeContext.Provider value={{theme, setTheme, toggle}}>
        {children}
    </ThemeContext.Provider>
};