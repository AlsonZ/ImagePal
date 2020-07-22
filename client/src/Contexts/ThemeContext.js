import React,{useState, createContext, useEffect} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme ? storedTheme : 'lightmode';
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    localStorage.setItem('theme', theme)
  },[theme])
  return(
    <ThemeContext.Provider value={[theme, setTheme]}>
        {props.children}
    </ThemeContext.Provider>
  );
}