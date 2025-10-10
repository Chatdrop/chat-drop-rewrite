import { useTheme } from "@react-navigation/native";
import { styleConstants } from "../../config/styleConstants";
import Card from "./Card";
import StyledTextInput from "../StyledTextInput";
import StyledText from "../StyledText";

const StringCard = ({title, value, onChangeText=()=>{}, placeholder, editable=true})=>{
    const theme = useTheme();
    
  return <Card title={title}>
     {editable 
        ? <StyledTextInput 
            defaultValue={value}
            keyboardType={"default"}
            onChangeText={onChangeText}
            placeholder={placeholder||title} 
            underline 
            style={{ 
              backgroundColor: theme.colors.background,
              borderColor: 'transparent',
              color: 'white', 
              padding: styleConstants.padding 
            }} 
          />
        : <StyledText style={{
            color: theme.colors.lightGrey, 
            marginTop: 10,
            color:"white"
          }}>{value}</StyledText>}
    </Card>
}

export default StringCard;
