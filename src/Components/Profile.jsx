import { useThemeContext } from "./ThemeContextProvider"

export default function Profile(props) {
    const { themeState, setTheme, updateTheme, theme } = useThemeContext()

    const textStyle = {
        color: themeState.TextColor
    }

    const colorSchemeFragments = [
        {
          label: "Top Gradient Color",
          name: "TopGradientColor"
        },
        {
          label: "Bottom Gradient Color",
          name: "BottomGradientColor"
        }, 
        {
          label: "Text Color", 
          name: "TextColor"
        }
      ]

    return (
        <div id="profile">
            <h3 style={ textStyle } className="title">Settings</h3>
            <h4 style={ textStyle } className="subtitle">Color Scheme</h4>
            <select value={ theme } onChange={ setTheme }>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="custom">Custom</option>
            </select>
            <ul id="colorSchemeOptions">
                {
                    colorSchemeFragments.map(({ label, name }) => {
                        return (
                            <li className="colorPicker" key={name}>
                                <p style={ textStyle } className="colorText">{ label }</p>
                                <input type="text" value={ themeState[name] } name={ name } onChange={ updateTheme } />
                            </li>
                        )
                    })
                }
            </ul>
            
        </div>
    )
} 