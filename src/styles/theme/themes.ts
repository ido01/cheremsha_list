import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material'
import { colors, createTheme, Palette } from '@mui/material'

const defaultTheme = createTheme()

const palette: Palette = {
    ...defaultTheme.palette,
    primary: {
        ...defaultTheme.palette.primary,
        contrastText: '#FFFFFF',
        main: '#6261a3',
        dark: '',
        light: '',
    },
    secondary: {
        ...defaultTheme.palette.secondary,
        main: '#FF9500',
    },
    success: {
        ...defaultTheme.palette.success,
        main: '#00B612',
        light: '#E6F8E7',
    },
    background: {
        ...defaultTheme.palette.background,
        default: '#ffffff',
    },
    text: {
        primary: '#000000',
        secondary: '',
        disabled: '',
    },
    error: {
        ...defaultTheme.palette.error,
        main: '#FF3131',
        light: '#FFEAEA',
    },
    warning: {
        ...defaultTheme.palette.warning,
        main: '#FF9500',
        light: '#FFF4E6',
    },
    grey: {
        ...defaultTheme.palette.grey,
        // 100: '#F4F6FB',
        // 200: '#E7EAED',
        // 300: '#c5c5c7',
        // 400: '#BDC3D1',
        // 500: '#B8C1CC',
        // 600: '#8C94A8',
        // 900: '#282D3C',
    },
    divider: '#f2f2f7',
}

export const customTheme = createTheme({
    palette,
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    width: '42px',
                    height: '32px',
                    borderColor: '#E5E5EA',
                    '&.Mui-selected': {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                    },
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    marginLeft: '-4px',
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FAF9F7',
                    margin: '0 4px',
                    '&.Mui-selected': {
                        backgroundColor: 'black',
                        color: 'white',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                    },
                },
                ellipsis: {
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ArrowDropDownIcon,
            },
        },
        MuiFormControl: {
            variants: [
                {
                    props: { variant: 'standard' },
                    style: {
                        '& .MuiInput-root': {
                            '&:before': {
                                borderBottomColor: palette.divider,
                            },
                            '&:before, &:after': {
                                borderWidth: '1px !important',
                            },
                        },
                        '& .MuiInput-input': {
                            fontSize: '14px',
                            paddingTop: '12px',
                            paddingRight: 0,
                            paddingBottom: '12px',
                            paddingLeft: '12px',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: 14,
                            transform: 'translate(0, 29px) scale(1)',
                        },
                        '& .MuiInputLabel-shrink': {
                            transform: 'translate(0, 1.5px) scale(0.75)',
                        },
                    },
                },
                {
                    props: { variant: 'filled' },
                    style: {
                        '& .MuiInputBase-root': {
                            borderRadius: '8px',
                            backgroundColor: '#FAF9F7',
                        },
                        '& .MuiFilledInput-input': {
                            fontSize: '14px',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            paddingLeft: '10px',
                        },
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: '8px',
                    boxShadow: 'none',
                    textTransform: 'initial',
                    fontSize: '15px',

                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderRadius: 0,
                    boxShadow: 'none',

                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                textSecondary: {
                    color: '#757575',
                },
            },
            variants: [
                {
                    props: { color: 'grey' },
                    style: {
                        backgroundColor: '#F5F3F3',

                        '&:hover': {
                            backgroundColor: '#E0E0E0',
                        },
                    },
                },
                {
                    props: { variant: 'checkout' },
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 14,
                        paddingRight: 20,
                        paddingBottom: 14,
                        paddingLeft: 20,
                        color: palette.primary.contrastText,
                        backgroundColor: palette.primary.main,

                        '&:hover': {
                            backgroundColor: palette.primary.dark,
                        },
                    },
                },
                {
                    props: { color: 'light' },
                    style: {
                        color: colors.common.white,
                        border: `1px solid ${colors.common.white}`,
                    },
                },
                {
                    props: { size: 'large' },
                    style: {
                        paddingTop: 18,
                        paddingBottom: 18,
                        paddingLeft: 42,
                        paddingRight: 42,
                    },
                },
                {
                    props: { variant: 'banner' },
                    style: {
                        paddingTop: 18,
                        paddingBottom: 18,
                        paddingLeft: 42,
                        paddingRight: 42,
                    },
                },
                {
                    props: { variant: 'banner', color: 'light' },
                    style: {
                        color: colors.common.white,
                        border: `1px solid ${colors.common.white}`,
                    },
                },
                {
                    props: { variant: 'banner', color: 'dark' },
                    style: {
                        color: colors.common.black,
                        border: `1px solid ${colors.common.black}`,
                    },
                },
            ],
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: false,
            },
        },
        MuiTypography: {
            variants: [
                {
                    props: {},
                    style: {
                        textDecoration: 'none',
                    },
                },
                {
                    props: { variant: 'body1' },
                    style: {
                        fontSize: '1.05rem',
                        lineHeight: 1.35,
                        textDecoration: 'none',
                    },
                },
                {
                    props: { variant: 'body2' },
                    style: {
                        fontSize: '0.975rem',
                        lineHeight: 1.75,
                    },
                },
                {
                    props: { variant: 'body3' },
                    style: { fontSize: '0.95rem', lineHeight: 1.35 },
                },
                {
                    props: { variant: 'h3' },
                    style: { fontSize: '2.5rem', lineHeight: 1.04 },
                },
                {
                    props: { variant: 'h6' },
                    style: { fontSize: '1.35rem', lineHeight: 1.3 },
                },
            ],
        },
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background-color: #fff;
                }
                
                a {
                    color: inherit;
                    text-decoration: none;
                }
            `,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: ['Helvetica'].join(','),
    },
})
