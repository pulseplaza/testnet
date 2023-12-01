
import React from 'react';
import { CgDarkMode } from 'react-icons/cg';
import Style from './ThemeSwitch.module.css';

const ThemeSwitch = ({ theme, setTheme }) => {
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
    };

    return <CgDarkMode onClick={switchTheme} />;
};

export default ThemeSwitch;


