"use client"

import { createContext ,useEffect,useState} from "react";
import { getInitialTheme } from "@/util/theme";

interface ThemeContextProps{
    isDark:boolean;
    toggleTheme:()=>void;
}
export const ThemeContext= createContext<ThemeContextProps>({
    isDark:false,
    toggleTheme(){}
})


export default function ThemeProvider({children}:{children:React.ReactNode}){
    const [isDark, setIsDark] = useState(false);
useEffect(()=>{
 const savedTheme = localStorage.getItem('theme');
 console.log("Check >>>",savedTheme)
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      setIsDark(savedTheme === 'dark');
    }else{
        setIsDark(getInitialTheme()==='dark')
    }
},[isDark])
   
const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };
    return(
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}