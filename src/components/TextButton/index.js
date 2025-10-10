import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function TextButton({
    children,
    flex,
    disabled = false,
    style = {},
    backgroundColor = "white",
    size = 70,
    height = null,
    Icon,
    padding = 22.5, // styleConstants.padding * 1.5
    onPress = () => { console.log('not assigned') },
    borderColor,
    borderWidth,
    ...props
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    flex: flex == null ? 0 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: borderWidth || 0,
                    borderColor: borderColor || 'transparent',
                    padding: padding,
                    borderRadius: 50, // styleConstants.borderRadius * 5
                    backgroundColor: disabled ? 'transparent' : backgroundColor,
                    opacity: disabled ? 0.5 : 1,
                    height: height
                },
                style
            ]}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
}
