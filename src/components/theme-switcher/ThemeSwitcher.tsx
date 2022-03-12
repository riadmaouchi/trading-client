import Switcher from '@/components/switcher/Switcher'
import { ThemeName, useTheme } from '@/components/theme-provider'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

const ThemeSwitcher: React.FC = () => {
    const { toggleTheme, themeName } = useTheme()
    return (
        <Switcher
            onClick={toggleTheme}
            checked={themeName === ThemeName.Dark}
            checkedIcon={<SunIcon className="w-4 h-4" />}
            unCheckedIcon={<MoonIcon className="w-4 h-4" />}
        />
    )
}

export default ThemeSwitcher
