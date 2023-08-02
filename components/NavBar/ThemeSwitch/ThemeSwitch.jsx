import React, { useEffect, useState } from 'react';
import { CgDarkMode } from 'react-icons/cg';

//INTERNAL IMPORT
import Style from './ThemeSwitch.module.css';

const ThemeSwitch = () => {
    const [theme, setTheme] = useState('light'); // default to light

    useEffect(() => {
        const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set the initial theme based on the user's preference
        const initialTheme = prefersDark ? 'dark' : 'light';

        // If a theme was previously saved, use that instead
        const savedTheme = typeof window !== 'undefined' && window.localStorage.getItem('theme');
        const themeToApply = savedTheme || initialTheme;

        if (themeToApply === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        setTheme(themeToApply);

        // Save the theme to localStorage
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('theme', themeToApply);
        }
    }, []);

    const switchTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.body.classList.toggle('dark-mode', newTheme === 'dark');
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('theme', newTheme);
            }
            return newTheme;
        });
    };

    return <CgDarkMode onClick={switchTheme} />;
};

export default ThemeSwitch;
