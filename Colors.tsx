import AsyncStorage from "@react-native-async-storage/async-storage"

class ColorsClass {
    // constructor() {
    //     this.bgColor = "#1C1C1E"
    //     this.gray800 = "#2C2C2E"
    //     this.titleColor = "#FFFFFF"
    //     this.borderColor = "#38384C"
    //     this.chipText = "#8E8E93"
    // }


    getBgColor() {
        return this.bgColor
    }

    constructor() {
        this.mode = 1

        this.primary = '#FF2882'
        this.primary2 = '#FF2882'
        this.bgColor = "#f7f7f7"
        this.gray800 = "#ffffff"
        this.titleColor = "#1C1C1E"
        this.borderColor = "#EAEDF1"
        this.chipText = "#8E8E93"
        this.statusBar = "dark-content"
        this.bottomNavBarColor = "#ffffff"
        this.selectColor = "#ffffff"
        this.selectBGColor = "#F0F0F0"
        this.statLine = "#EAEDF1"
        this.lineupName = '#3A3A3C'
        this.success = '#00C566'
        this.fail = '#FF4747'
        this.predictBGColor = "#F7F7F7"
        this.purple = '#37003c'
        this.gradientBorderColor = "#00FFFF"
    }

    setLightTheme() {
        this.mode = 1
        this.primary = '#FF2882'
        this.primary2 = '#FF2882'
        this.bgColor = "#f7f7f7"
        this.gray800 = "#ffffff"
        this.titleColor = "#1C1C1E"
        this.borderColor = "#EAEDF1"
        this.chipText = "#8E8E93"
        this.statusBar = "dark-content"
        this.bottomNavBarColor = "#ffffff"
        this.selectColor = "#ffffff"
        this.selectBGColor = "#F0F0F0"
        this.statLine = "#EAEDF1"
        this.lineupName = '#3A3A3C'
        this.predictBGColor = "#F7F7F7"
        this.gradientBorderColor = "#00FFFF"
        AsyncStorage.setItem('mode', this.mode.toString())
    }

    setDarkTheme() {
        this.mode = 2
        this.primary = '#FF2882'
        this.primary2 = '#FF2882'
        this.bgColor = "#111111"//"#1C1C1E"
        this.gray800 = "#181818"//"#2C2C2E"
        this.titleColor = "#FFFFFF"
        this.borderColor = "#38384C"
        this.chipText = "#8E8E93"
        this.statusBar = "light-content"
        this.bottomNavBarColor = "#181818"
        this.selectColor = "#ffffff11"
        this.selectBGColor = "#181818"
        this.statLine = "#181818"
        this.lineupName = '#D1D1D6'
        this.predictBGColor = "#ffffff11"
        this.gradientBorderColor = "#00FFFF"
        AsyncStorage.setItem('mode', this.mode.toString())
    }

    setThemeFC26() {
        this.mode = 3
        this.primary = '#3CC265'
        this.primary2 = '#3CC265'
        this.bgColor = "#111111"//"#1C1C1E"
        this.gray800 = "#181818"//"#2C2C2E"
        this.titleColor = "#FFFFFF"
        this.borderColor = "#38384C"
        this.chipText = "#8E8E93"
        this.statusBar = "light-content"
        this.bottomNavBarColor = "#181818"
        this.selectColor = "#ffffff11"
        this.selectBGColor = "#181818"
        this.statLine = "#181818"
        this.lineupName = '#D1D1D6'
        this.predictBGColor = "#ffffff11"
        this.gradientBorderColor = "#00FFFF"
        AsyncStorage.setItem('mode', this.mode.toString())
    }

    setThemeFC27() {
        this.mode = 4
        this.primary = '#ffffff'
        this.primary2 = '#9DFFC6'
        this.bgColor = "#111111"//"#1C1C1E"
        this.gray800 = "#181818"//"#2C2C2E"
        this.titleColor = "#FFFFFF"
        this.borderColor = "#43526C"
        this.chipText = "#8E8E93"
        this.statusBar = "light-content"
        this.bottomNavBarColor = "#181818"
        this.selectColor = "#ffffff11"
        this.selectBGColor = "#181818"
        this.statLine = "#181818"
        this.lineupName = '#D1D1D6'
        this.predictBGColor = "#ffffff11"
        this.gradientBorderColor = "#4B4D4E"
        AsyncStorage.setItem('mode', this.mode.toString())
    }
}

const Colors = new ColorsClass()
export default Colors