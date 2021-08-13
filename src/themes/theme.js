import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF', //white
            glare: '#BBBBBB',
        },
        primary: {
            main: '#FFF06B',
            light: '#fefbe7',
            dark: '#d9be0d',
        },
        secondary: {
            main: '#00AAA4', //blue
            light: '#4dbeff',
        },
        ultimate: {
            main: '#848484', //gray
            dark: '#616466',
            light: '#cbcccd',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400,
        },
    },
})

export default theme
