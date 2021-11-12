const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: false, // or 'media' or 'class',
    plugins: [],

    purge: {
        content: ['./src/**/*.{ts,tsx}', './index.html'],
        enabled: process.env.NODE_ENV === 'production',
    },
    theme: {
        extend: {
            colors: {
                accent: 'var(--color-accent)',
                primary: 'var(--color-primary)',
                primaryAlt: 'var(--color-primary-alt)',
                secondary: 'var(--color-secondary)',
                neutral: 'var(--color-neutral)',
                neutralAlt: 'var(--color-neutral-alt)',
                primaryDark: 'var(--color-primarydark)',
                primarySofter: 'var(--color-primarysofter)',

                cyan: colors.cyan,
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked', 'disabled'],
            opacity: ['dark'],
            overflow: ['hover'],
        },
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
}
