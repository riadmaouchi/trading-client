import { useContext, useEffect, useState, createContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import * as tailwind from './theme'

const theme = tailwind.theme.extend

export enum ThemeName {
    Light = 'light',
    Dark = 'dark',
}

interface ThemeStorageProviderProps {
    storage?: typeof localStorage | typeof sessionStorage
}

interface Theme {
    themeName: ThemeName
}

interface ContextValue {
    themeName?: string
    setTheme: (selector: { themeName: ThemeName }) => void
}

const ThemeContext = createContext<ContextValue>({
    setTheme: () => console.warn('No storage theme provider'),
})

const STORAGE_KEY = 'themeName'

const ThemeStorageProvider: React.FC<ThemeStorageProviderProps> = ({
    storage = localStorage,
    children,
}) => {
    const [themeState, setThemeState] = useState(ThemeName.Dark)

    useEffect(() => {
        setThemeFromStorage()
        window.addEventListener('storage', setThemeFromStorage)
        return window.removeEventListener('storage', setThemeFromStorage)
    }, [])

    const setThemeFromStorage = (event?: StorageEvent) => {
        if (event == null || event.key === STORAGE_KEY) {
            const themeName = storage.getItem(STORAGE_KEY) as ThemeName

            if (themeName) {
                setTheme({ themeName })
            }
        }
    }

    const setTheme = ({ themeName }: Theme) => {
        if (themeName !== themeState) {
            setThemeState(themeName)
            storage.setItem(STORAGE_KEY, themeName)
        }
    }

    return (
        <ThemeContext.Provider
            value={{ themeName: themeState, setTheme: setTheme }}
        >
            <StyledThemeProvider theme={theme}>
                <>{children}</>
            </StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

ThemeStorageProvider.defaultProps = {
    storage: localStorage,
}

export const useTheme = () => {
    const { themeName, setTheme } = useContext(ThemeContext)
    const toggleTheme = () =>
        setTheme({
            themeName:
                themeName === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark,
        })
    return { themeName, setTheme, toggleTheme }
}

export const ThemeProvider = ThemeStorageProvider
export const ThemeConsumer = ThemeContext.Consumer
