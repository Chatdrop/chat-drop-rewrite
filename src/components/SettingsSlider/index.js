import React from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import StyledText from '../StyledText';

const SettingsSlider = ({ 
  title, 
  value, 
  minimumValue = 0, 
  maximumValue = 100, 
  step = 1,
  unit = '',
  onValueChange 
}) => {
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [containerX, setContainerX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(value);
  const position = React.useRef(new Animated.Value(0)).current;
  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    if (sliderWidth > 0 && !isDragging) {
      const range = maximumValue - minimumValue;
      const pos = ((value - minimumValue) / range) * sliderWidth;
      position.setValue(pos);
      setTempValue(value);
    }
  }, [sliderWidth, value, minimumValue, maximumValue, position, isDragging]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          setIsDragging(true);
          // Measure container position when touch starts
          if (sliderRef.current) {
            sliderRef.current.measure((x, y, width, height, pageX, pageY) => {
              setContainerX(pageX);
            });
          }
        },
        onPanResponderMove: (event, gestureState) => {
          if (sliderWidth === 0) return;

          // Calculate position relative to container
          const touchX = event.nativeEvent.pageX;
          let newPos = touchX - containerX;
          newPos = Math.max(0, Math.min(sliderWidth, newPos));
          
          // Calculate new value
          const range = maximumValue - minimumValue;
          const rawValue = (newPos / sliderWidth) * range + minimumValue;
          const steppedValue = Math.round(rawValue / step) * step;
          const clampedValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue));
          
          // Update value immediately during drag
          if (clampedValue !== tempValue) {
            setTempValue(clampedValue);
            onValueChange?.(clampedValue);
          }
          
          // Snap position to the stepped value
          const snappedPos = ((clampedValue - minimumValue) / range) * sliderWidth;
          position.setValue(snappedPos);
        },
        onPanResponderRelease: () => {
          setIsDragging(false);
          // Value already updated in onPanResponderMove, just finish animation
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
          // Value already updated in onPanResponderMove
        },
      }),
    [sliderWidth, containerX, tempValue, minimumValue, maximumValue, step, onValueChange, position]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText style={styles.title}>{title}</StyledText>
        <StyledText style={styles.value}>{isDragging ? tempValue : value}{unit}</StyledText>
      </View>
      
      <View 
        ref={sliderRef}
        style={styles.sliderContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setSliderWidth(width);
          // Get absolute position
          if (sliderRef.current) {
            sliderRef.current.measure((fx, fy, w, h, pageX, pageY) => {
              setContainerX(pageX);
            });
          }
        }}
      >
        <View style={styles.track} />
        
        <Animated.View
          style={[
            styles.activeTrack,
            {
              width: position,
            },
          ]}
        />

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              left: Animated.add(position, -10),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    color: '#FFFFFF',
  },
  value: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '600',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 4,
    backgroundColor: '#8E8E93',
    borderRadius: 2,
  },
  activeTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#F21D5B',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SettingsSlider;
