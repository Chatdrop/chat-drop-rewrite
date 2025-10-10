import { useTheme } from "@react-navigation/native";
import { styleConstants } from "../../config/styleConstants";
import Card from "./Card";
import StyledTextInput from "../StyledTextInput";
import StyledText from "../StyledText";

const IntCard = ({title, value, onChange=()=>{}, editable=true})=>{
    const theme = useTheme();
    
  return <Card title={title}>
    {editable 
        ? <StyledTextInput 
            defaultValue={value}
            keyboardType={"number-pad"}
            onChangeText={x => {onChange(+x)}}
            placeholder={`${value}`} 
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
            marginTop: 10
          }}>{value}</StyledText>}
    </Card>
}

export default IntCard;
