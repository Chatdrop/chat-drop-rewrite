import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { fonts, globalFontStyle } from '../../config/fontConfig';

const slice_text = (content = "", slice = 0) => {
    if (content.length > slice) { return content.slice(0, slice - 3) + "..." }
    return content;
};

export default function StyledText(props) {
    const { colors } = useTheme()
    const propsKeys = Object.keys(props)
    const definedFontStyles = new Set(Object.keys(fonts))
    const commonStrings = propsKeys.filter(str2 => definedFontStyles.has(str2));
    return (
        <Text
            {...props}
            style={
                [
                    {
                        fontWeight : props.bold == null  ? '' : '800',
                        textAlign: props.center ? 'center' : null,
                        paddingHorizontal: props.padded ? 15 : 0,
                        color: props.color != null ? props.color : colors.text,
                        opacity: props.secondary != null ? 0.6 : 1
                    },
                    globalFontStyle,
                    fonts[commonStrings[0]],
                    props.style
                ]
            }>
            {(typeof props.children == "string" && props["slice"]) ? slice_text(props.children, props["slice"]) : props.children}
        </Text>
    )
}