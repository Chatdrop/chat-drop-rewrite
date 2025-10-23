import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, useWindowDimensions, View, Vibration, NativeModules } from "react-native";
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

const TorchModule = NativeModules.TorchModule;

// Helper function to safely toggle torch
const toggleTorch = async (state) => {
    try {
        console.log('🔦 Attempting to toggle torch:', state);
        console.log('🔦 TorchModule:', TorchModule);
        
        if (TorchModule && TorchModule.switchState) {
            console.log('🔦 Calling TorchModule.switchState with:', state);
            TorchModule.switchState(state);
            console.log('🔦 Torch toggle called successfully');
        } else {
            console.log('❌ TorchModule or switchState not available');
        }
    } catch (error) {
        console.error('❌ Torch error:', error);
    }
};

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
    const { width } = useWindowDimensions();
    const [opacity, setOpacity] = useState(1);

    // Flash effect with real torch functionality - flickering pattern
    useEffect(() => {
        if (isFlashActive) {
            // Haptic feedback on activation
            Vibration.vibrate(50);
            
            // Turn on the torch
            toggleTorch(true);
            
            // Animation and torch flicker sequence
            setOpacity(.5);
            setTimeout(() => {
                setOpacity(1);
                toggleTorch(true); // Flash ON
                setTimeout(() => {
                    setOpacity(.3);
                    toggleTorch(false); // Flash OFF
                    setTimeout(() => {
                        setOpacity(1);
                        toggleTorch(true); // Flash ON
                        setTimeout(() => {
                            setOpacity(.6);
                            toggleTorch(false); // Flash OFF
                            setTimeout(() => {
                                toggleTorch(true); // Flash ON briefly
                                setTimeout(() => {
                                    toggleTorch(false); // Final OFF
                                    setIsFlashActive(false);
                                    setOpacity(1);
                                    Vibration.vibrate(30); // Short vibration on close
                                }, 150);
                            }, 100);
                        }, 100);
                    }, 500);
                }, 300);
            }, 1000);
        } else {
            setOpacity(1);
            toggleTorch(false); // Make sure torch is off
        }
    }, [isFlashActive]);

    const currentRoute = getCurrentRouteName();
    const isBluetoothView = currentRoute === 'BluetoothView';

    // Gradient height'i responsive hesapla
    const gradientHeight = Platform.OS === 'ios' 
        ? insets.top + 60 
        : insets.top + 74;

    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: gradientHeight
            }}>
            <HeaderGradientSVG 
                width="100%" 
                height={gradientHeight} 
                style={{ position: 'absolute', top: 0, left: 0 }}
                preserveAspectRatio="none"
            />
            <View 
                pointerEvents="box-none"
                style={{
                    paddingTop: insets.top,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: styleConstants.padding,
                    width: '100%',
                    height: gradientHeight,
                    position: 'absolute',
                    zIndex: 99
                }} 
            >
                
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
                        activeOpacity={0.7}
                        onPress={() => {
                            if (!isFlashActive) {
                                setIsFlashActive(true);
                            } else {
                                // Manual turn off - immediately turn off the torch and animation
                                toggleTorch(false);
                                setIsFlashActive(false);
                                setOpacity(1);
                                Vibration.vibrate(30);
                            }
                        }}
                        style={{
                            opacity: opacity,
                            position: 'absolute',
                            left: width / 2 - (isFlashActive ? 78 : 30),
                            right: width / 2 - (isFlashActive ? 78 : 30),
                            top: isFlashActive ? insets.top + 12 : insets.top + 8,
                            zIndex: 999
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