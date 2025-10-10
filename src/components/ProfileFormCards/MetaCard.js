import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import StyledText from "../StyledText";
import Card from "./Card";

const RenderMeta = ({ 
  onSelectionChange = (val)=>{}, 
  editable = true,
  is_multi = false,
  value = [],
  choices = []
}) => {
  const [currentVal, set_currentVal] = useState(value || []);
  
  const optionClick = (opt_uid = 0)=>{
    let v = [];

    if (!is_multi){
      v = [opt_uid]
    } else {
      v = currentVal.includes(opt_uid) 
        ? currentVal.filter(x => x!=opt_uid)
        : [...currentVal, opt_uid];
    }

    set_currentVal(v);
    onSelectionChange(v);
  }

  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {choices.map((option) => {
        const isSelected = currentVal.includes(option.uid);
        const Wrapper = editable ? TouchableOpacity : View;

        return (
          <Wrapper
            key={option.uid}
            onPress={() => optionClick(option.uid)}
            style={{
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 16,
              borderColor: isSelected ? "#F21D5B" : "black",
              backgroundColor: isSelected ? "#F21D5B" : "black",
              alignSelf: "flex-start",
            }}
          >
            <StyledText bold style={{ color: isSelected ? "white" : "#FFFFFF80" }}>
              {option.name}
            </StyledText>
          </Wrapper>
        );
      })}
    </View>
  );
};

const MetaCard = ({title, value, onChange=()=>{}, choices = [{uid: 0, name: ""}], is_multi=false, editable=true})=>{
  return <Card title={title}>
    <RenderMeta
        choices={choices}
        is_multi={is_multi}
        editable={editable}
        onSelectionChange={onChange}
        value={value}
    />
    </Card>
}

export default MetaCard;
