import { useTheme } from "@react-navigation/native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import { styleConstants } from "../../config/styleConstants";

export default function RoundButton({
    loading,
    disabled = false,
    style = {},
    iconSize = 30,
    borderWidth = 1,
    backgroundColor = "#EF1A88",
    size = 70,
    Icon,
    onPress = () => { console.log('not assigned') },
    borderColor,
    color,
    children,
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: borderWidth,
                    borderColor: borderColor || theme.colors.text,
                    height: size,
                    width: size,
                    borderRadius: Icon == null ? styleConstants.borderRadius * 3 : size / 2,
                    backgroundColor: backgroundColor ? backgroundColor : disabled ? `${theme.colors.text}00` : theme.colors.text,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            <View
                style={{
                    width: iconSize,
                    height: iconSize,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {loading ? (
                    <ActivityIndicator size={"small"} />
                ) : Icon != null ? (
                    <Icon color={color || 'white'} width={iconSize * 0.8} height={iconSize * 0.8} />
                ) : (
                    children || <StyledText style={{ color: "red" }}>dsadsa</StyledText>
                )}
            </View>
        </TouchableOpacity>
    );
}
