import { Platform } from "react-native"

export const globalFontStyle = {
    fontFamily: (Platform.OS == "android" ? "Inter" : "Inter")
}

export const fonts = {
    largeTitle : {
        ...globalFontStyle,
        fontSize : 29,
        lineHeight:35
    },
    title1 : {
        ...globalFontStyle,
        fontSize : 27,
        lineHeight:30
    },
    title2 : {
        ...globalFontStyle,
        fontSize : 20,
        lineHeight:23
    },
    action : {
        ...globalFontStyle,
        fontSize : 17,
        lineHeight:20
    },
    content : {
        ...globalFontStyle,
        fontSize : 15,
        lineHeight:15,
    },
    contentEmph : {
        ...globalFontStyle,
        fontSize : 14,
        lineHeight:15,
        fontWeight:700
    },
    caption : {
        ...globalFontStyle,
        fontSize : 12,
        lineHeight:15,
    },
    mini: {
        ...globalFontStyle,
        fontSize : 10,
        lineHeight: 10,
        color: "#D5D5D5"

    }
}