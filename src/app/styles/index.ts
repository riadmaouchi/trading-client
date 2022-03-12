import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

   :root {
    --color-primary: #ffffff;
    --color-primary-alt: #26c6da;
    --color-secondary: #12263f;
    --color-neutral: #edf2f9;
    --color-neutral-alt: #152e4d;
    --color-accent: #61dafb;
    --color-primarydark: #b2ebf2;
    --color-primarysofter: #00838f;
  }

  [data-color-theme="light"] {
    --color-primary: #282c34;
    --color-primary-alt: #b2ebf2;
    --color-secondary: #ffffff;
    --color-neutral: #111827;
    --color-neutral-alt: #F3F4F6;
    --color-accent: #61dafb;
    --color-primarydark: #00838f;
    --color-primarysofter:  #ffffff;
`

export default GlobalStyle
