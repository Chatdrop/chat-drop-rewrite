import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoSVG from '../../assets/svg/logo.svg';
import { styleConstants } from "../../config/styleConstants.js";
import HeaderGradientSVG from "../../assets/svg/header-gradient.svg";
import { useTheme } from "@react-navigation/native";
import { appStore } from "../../stores/app_store.js";
import { useSnapshot } from "valtio";
import StyledText from "../../components/StyledText/index.js";
import { navigationRef } from "../../utils/navigationRef.js";
import ArrowRightSVG from "../../assets/svg/arrow-right.svg";

export default function TabHeader({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const appSnap = useSnapshot(appStore);

    const color = () => (appSnap.isVisible ? theme.colors.onlineGreen : theme.colors.offlineRed);

    // Get current route name for back button logic
    const getCurrentRouteName = () => {
        const state = navigationRef.getCurrentRoute();
        return state?.name || '';
    };

    const isBackBtn = (() => {
        const routeName = getCurrentRouteName();
        switch (routeName) {
            case "ChatUiActual":
            case "ChatUiDisplayProfile":
                return true;
            default:
                return false;
        }
    })();

    const [isFlashActive, setIsFlashActive] = useState(false);
    const { width, height } = useWindowDimensions();
    const [opacity, setOpacity] = useState(1);

    // Flash animation effect (simplified without torch functionality)
    useEffect(() => {
        if (isFlashActive) {
            setOpacity(.5);
            setTimeout(() => {
                setOpacity(1);
                setTimeout(() => {
                    setOpacity(.3);
                    setTimeout(() => {
                        setOpacity(1);
                        setTimeout(() => {
                            setOpacity(.6);
                            setTimeout(() => {
                                setIsFlashActive(false);
                                setOpacity(1);
                            }, 250);
                        }, 100);
                    }, 500);
                }, 300);
            }, 1000);
        } else {
            setOpacity(1);
        }
    }, [isFlashActive]);

    const currentRoute = getCurrentRouteName();
    const isBluetoothView = currentRoute === 'BluetoothView';

    return (
        <View
            style={{
                position: 'absolute',
                top: Platform.OS == "android" ? -6 : 0,
                width: '100%',
                height: 115
            }}>
            <View style={{ flex: 1 }} >
                <HeaderGradientSVG 
                    width="100%" 
                    height="100%" 
                    style={{ position: 'absolute' }}
                />
            </View>
            <View style={[{
                paddingTop: insets.top,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: styleConstants.padding,
                width: '100%',
                height: 115,
                position: 'absolute',
                zIndex: 99
            }, Platform.OS == "android" && { marginTop: 20 }]} >
                
                {/* Touchable Button for toggling "On/Off" or Back Button */}
                <TouchableOpacity
                    style={{
                        width: 44, 
                        height: 44, 
                        borderRadius: 22, 
                        borderColor: isBackBtn ? "#00000000" : color(),
                        justifyContent: "center", 
                        alignItems: "center", 
                        borderWidth: 2.5,
                    }}
                    onPress={() => {
                        if (!isBackBtn) {
                            appStore.isVisible = !appSnap.isVisible;
                        } else {
                            navigationRef.goBack();
                        }
                    }}
                >
                    {isBackBtn ? (
                        <ArrowRightSVG 
                            width={24} 
                            height={24} 
                            style={{ transform: [{ rotate: "180deg" }] }} 
                            stroke="white" 
                        />
                    ) : (
                        <StyledText style={{ color: color() }} contentEmph>
                            {appSnap.isVisible ? "On" : "Off"}
                        </StyledText>
                    )}
                </TouchableOpacity>

                {/* Logo or Flashlight */}
                {isBluetoothView ? (
                    <TouchableOpacity
                        onPress={() => {
                            setIsFlashActive(!isFlashActive);
                        }}
                        style={{
                            opacity: opacity,
                            position: 'absolute',
                            left: width / 2 - (isFlashActive ? 78 : 30),
                            right: width / 2 - (isFlashActive ? 78 : 30),
                            top: isFlashActive ? 12 : 52,
                            zIndex: 99
                        }}
                    >
                        {isFlashActive ? (
                            <Image 
                                source={require('../../assets/png/fenerIconOpened.png')} 
                                style={{ width: 158, height: 158 }} 
                            />
                        ) : (
                            <Image 
                                source={require('../../assets/png/fenerIconClosed.png')} 
                                style={{ width: 60, height: 60 }} 
                            />
                        )}
                    </TouchableOpacity>
                ) : (
                    <LogoSVG width={46} height={41} />
                )}

                {/* User Profile Picture */}
                <TouchableOpacity
                    style={{
                        width: 44, 
                        height: 44, 
                        borderRadius: 22, 
                        borderColor: color(),
                        justifyContent: "center", 
                        alignItems: "center", 
                        borderWidth: 2.5
                    }}
                    onPress={() => { 
                        navigation.navigate('ProfileStack') 
                    }}
                >
                    <View style={{ 
                        width: 33, 
                        height: 33, 
                        borderRadius: 16.5, 
                        backgroundColor: "red"
                    }} />
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}