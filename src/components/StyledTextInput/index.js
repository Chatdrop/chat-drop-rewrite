import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fonts, globalFontStyle } from '../../config/fontConfig';
import { styleConstants } from '../../config/styleConstants';

const slice_text = (content = "", slice = 0) => {
    if (content.length > slice) {
        return content.slice(0, slice - 3) + "...";
    }
    return content;
};

export default function StyledTextInput(props) {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const propsKeys = Object.keys(props);
    const definedFontStyles = new Set(Object.keys(fonts));
    const commonStrings = propsKeys.filter(str2 => definedFontStyles.has(str2));

    const handleFocus = () => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur();
    };

    return (
        <TextInput
            {...props}
            ref={props.childRef}
            placeholderTextColor={props.placeholderTextColor || `${colors.text}aa`}
            maxLength={props.maxLength}
            style={[
                globalFontStyle,
                {
                    borderRadius: 20,
                    borderColor: colors.text,
                    // backgroundColor: colors.background,
                    marginVertical: 10,
                    borderWidth: isFocused ? 2 : 1,
                    borderBottomWidth: isFocused ? 2 : 1,
                    padding: props.padded ? styleConstants.padding * 1.2 : 0,
                    color: colors.text,
                    opacity: props.secondary != null ? 0.6 : 1,
                },
                fonts[commonStrings[0]],
                props.style
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline={props.multiline !== false ? true : false}
            textAlignVertical={props.multiline !== false ? 'top' : 'center'}
        >
            {(typeof props.children == "string" && props["slice"]) ? slice_text(props.children, props["slice"]) : props.children}
        </TextInput>
    );
}
