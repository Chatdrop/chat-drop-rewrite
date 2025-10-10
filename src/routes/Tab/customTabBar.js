import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import StyledText from '../../components/StyledText';

// Import SVG icons
import ChatIcon from '../../assets/svg/chat.svg';
import ExploreIcon from '../../assets/svg/explore.svg';
import LikeIcon from '../../assets/svg/like.svg';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import LocationIcon from '../../assets/svg/location.svg';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const getIconComponent = (routeName, color) => {
    const iconProps = { 
      width: '90%', 
      height: '90%', 
      color: color 
    };

    switch (routeName) {
      case 'ExploreStack':
        return <ExploreIcon {...iconProps} />;
      case 'LikesStack':
        return <LikeIcon {...iconProps} />;
      case 'BluetoothView':
        return <LogoIcon {...iconProps} />;
      case 'LocationExploreStack2':
        return <LocationIcon {...iconProps} />;
      case 'ChatStack':
        return <ChatIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={[
      {
        flexDirection: 'row',
        backgroundColor: '#2D2D2A',
        position: 'absolute',
        bottom: insets.bottom,
        left: 15,
        right: 15,
        borderRadius: 35,
        borderColor: 'white',
        paddingBottom: 0,
        paddingHorizontal: 10,
        borderTopWidth: 0,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      Platform.OS === 'android' && { marginBottom: 10 }
    ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const currentState = navigation.getState();
        const activeRoute = currentState.routes[currentState.index];
        const isRouteActive = activeRoute.name === route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconColor = isRouteActive ? theme.colors.background : theme.colors.lightGrey;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
              backgroundColor: isRouteActive ? '#fff' : 'transparent',
              borderRadius: 50
            }}
          >
            {/* Notification badge - commented out as in original */}
            {/* <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 4,
              position: 'absolute',
              backgroundColor: 'red',
              top: 10,
              right: 5,
              borderRadius: 10,
              zIndex: 99
            }}>
              <StyledText mini bold style={{ color: 'white' }}>20</StyledText>
            </View> */}
            
            <View style={{ width: '90%', height: '90%' }}>
              {getIconComponent(route.name, iconColor)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
