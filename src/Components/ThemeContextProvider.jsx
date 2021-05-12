import { useContext, createContext, useState, useEffect } from "react"

export const getInitialThemes = () => {
    const existingThemes = localStorage.getItem("currentThemes")
    // If themes are already set, use those values, otherwise use default value
    return existingThemes ? JSON.parse(existingThemes) : {
        light: {
            TopGradientColor: "#888888",
            BottomGradientColor: "#eeeeee",
            TextColor: "#000000"
        },
        dark: {
            TopGradientColor: "#666666",
            BottomGradientColor: "#999999",
            TextColor: "#ffffff"
        },
        custom: {}
    }
}
  
export const ThemeContext = createContext({})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}
  
const ThemeContextProvider = ({ children }) => {
    const [ themeKey, setTheme ] = useState(localStorage.getItem("theme") ?? "dark")
    const [ themes, setThemes ] = useState(getInitialThemes())
    useEffect(() => {
        setThemes(getInitialThemes())
    }, [themeKey])

    const setBodyBackground = (color) => {
        // Using anti-pattern to set body's background color
        document.body.style.backgroundColor = color;
    }

    setBodyBackground(themes[themeKey].BottomGradientColor)

    return (
        <ThemeContext.Provider value={{
            themeState: themes[themeKey],
            theme: themeKey,
            setTheme: (event) => {
                const {target: {value} } = event
                console.log(value, event)
                if (themes[value]) {
                    localStorage.setItem("theme", value)
                    setTheme(value)
                    setBodyBackground(themes[value].BottomGradientColor)
                }
            },
            updateTheme: (event) => {
                const {name, value} = event.target
                const newThemes = { ...themes }
                newThemes[themeKey][name] = value
                
                localStorage.setItem("currentThemes", JSON.stringify(newThemes))
                setThemes(getInitialThemes())
                setBodyBackground(newThemes.BottomGradientColor)
            }
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider