import { View } from "react-native"
import StyledText from "../StyledText"
import { styleConstants } from "../../config/styleConstants"
import { useTheme } from "@react-navigation/native"

function Card(props) {
    const theme = useTheme()
    return (
      <View style={{ 
        width: '100%', 
        gap: 0, 
        padding: styleConstants.padding * 1, 
        borderRadius: 20, 
        backgroundColor: props.primary != null ? theme.colors.primary : theme.colors.card 
      }}>
        <StyledText bold action>{props.title}</StyledText>
        {props.children}
      </View>
    )
}

export default Card;
