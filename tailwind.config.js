const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    plugins: [require('@tailwindcss/typography')],
    content: ['./src/**/*.{ts,tsx}', './index.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                accent: 'var(--color-accent)',
                primary: 'var(--color-primary)',
                primaryAlt: 'var(--color-primary-alt)',
                secondary: 'var(--color-secondary)',
                neutral: 'var(--color-neutral)',
                neutralAlt: 'var(--color-neutral-alt)',
                primaryDark: 'var(--color-primarydark)',
                primarySofter: 'var(--color-primarysofter)',
                gray: colors.neutral,
                cyan: colors.cyan,
                green: colors.emerald,
                yellow: colors.amber,
                purple: colors.violet,
            },
        },
    },
}
