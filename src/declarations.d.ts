import '@mui/material'

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        banner: true
        checkout: true
    }

    interface ButtonPropsColorOverrides {
        dark: true
        light: true
        grey: true
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body3: true
    }
}
