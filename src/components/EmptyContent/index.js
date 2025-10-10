import { View } from "react-native";
import StyledText from "../StyledText";
import { useTheme } from "@react-navigation/native";
import { styleConstants } from "../../config/styleConstants";

// Simple broken heart icon using text since we don't have FontAwesome
const BrokenHeartIcon = ({ color, size = 50 }) => (
    <StyledText style={{ fontSize: size, color }}>💔</StyledText>
);

export default function EmptyContent({description}) {
    const theme = useTheme();
    return (
        <View style={{
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 15, 
            padding: styleConstants.padding * 2
        }}>
            <BrokenHeartIcon color={theme.colors.text} size={50} />
            <StyledText title2>
                {description}
            </StyledText>
        </View>
    );
}
