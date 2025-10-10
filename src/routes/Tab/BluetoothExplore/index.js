import React, { useState, memo } from "react";
import { View, Image } from "react-native";
import StyledText from "../../../components/StyledText";
import { styleConstants } from "../../../config/styleConstants";
import RoundButton from "../../../components/RoundButton";
import LocationExploreSortIcon from "../../../assets/svg/location-explore-sort.svg";
import LocationExploreFilterIcon from "../../../assets/svg/location-explore-filter.svg";
import { useTheme } from "@react-navigation/native";
import RadarView from './RadarView';

// Mock data for devices with filler profiles
const MOCK_DEVICES = [
    {
        id: "device-1",
        rssi: -45,
        profile: {
            photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: "device-2", 
        rssi: -67,
        profile: {
            photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: "device-3",
        rssi: -82,
        profile: {
            photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: "device-4",
        rssi: -55,
        profile: {
            photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: "device-5",
        rssi: -73,
        profile: {
            photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
        }
    }
];

const Header = memo(({ scanning, deviceCount, theme, onStartScan, onFilter }) => (
    <View style={{ flexDirection: 'row' }}>
        <View>
            <StyledText largeTitle bold>{scanning ? 'Taranıyor...' : 'Tara'}</StyledText>
            <StyledText caption bold secondary>{deviceCount}</StyledText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }} />
        <RoundButton 
            Icon={LocationExploreSortIcon}  
            onPress={onStartScan} 
            style={{borderWidth:0, backgroundColor:theme.colors.background}} 
        />
        <RoundButton 
            Icon={LocationExploreFilterIcon} 
            onPress={onFilter} 
            style={{borderWidth:0, backgroundColor:theme.colors.background}} 
        />
    </View>
));

const BluetoothExplore = () => {
    const theme = useTheme();
    const [scanning, setScanning] = useState(false);
    const [devices, setDevices] = useState(MOCK_DEVICES);

    const handleStartScan = () => {
        setScanning(true);
        // Simulate scanning for 3 seconds
        setTimeout(() => {
            setScanning(false);
        }, 3000);
    };

    const handleFilter = () => {
        console.log('Filter pressed - mock data:', devices);
    };

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <Image 
                source={require("../../../assets/bluetooth-background/bg.jpg")} 
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <View style={{ 
                padding: styleConstants.padding * 1.5, 
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                zIndex: 99 
            }}>
                <View style={{ height: 115 }} />
                <Header 
                    scanning={scanning} 
                    deviceCount={devices.length} 
                    theme={theme}
                    onStartScan={handleStartScan}
                    onFilter={handleFilter}
                />
            </View>
            <RadarView devices={devices} />
        </View>
    );
};

export default memo(BluetoothExplore);