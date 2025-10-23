import React from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import StyledText from '../StyledText';

const SettingsRangeSlider = ({ 
  title, 
  minValue, 
  maxValue, 
  minimumValue = 18, 
  maximumValue = 100,
  onValuesChange 
}) => {
  const [values, setValues] = React.useState({ min: minValue, max: maxValue });
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [containerX, setContainerX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const minPosition = React.useRef(new Animated.Value(0)).current;
  const maxPosition = React.useRef(new Animated.Value(0)).current;
  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    if (sliderWidth > 0 && !isDragging) {
      const range = maximumValue - minimumValue;
      const minPos = ((values.min - minimumValue) / range) * sliderWidth;
      const maxPos = ((values.max - minimumValue) / range) * sliderWidth;
      minPosition.setValue(minPos);
      maxPosition.setValue(maxPos);
    }
  }, [sliderWidth, values, minimumValue, maximumValue, isDragging, minPosition, maxPosition]);

  const createPanResponder = React.useCallback((isMin) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
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

        const range = maximumValue - minimumValue;
        
        // Calculate position relative to container
        const touchX = event.nativeEvent.pageX;
        let newPos = touchX - containerX;
        newPos = Math.max(0, Math.min(sliderWidth, newPos));
        
        const rawValue = (newPos / sliderWidth) * range + minimumValue;
        const newValue = Math.round(rawValue);

        if (isMin) {
          // Min değer max değeri geçemez (en az 4 fark olmalı)
          const clampedValue = Math.min(newValue, values.max - 4);
          const finalValue = Math.max(minimumValue, clampedValue);
          
          if (finalValue !== values.min) {
            setValues(prev => ({ ...prev, min: finalValue }));
            onValuesChange?.(finalValue, values.max);
          }
          
          const finalPos = ((finalValue - minimumValue) / range) * sliderWidth;
          minPosition.setValue(finalPos);
        } else {
          // Max değer min değerin altına inemez (en az 4 fark olmalı)
          const clampedValue = Math.max(newValue, values.min + 4);
          const finalValue = Math.min(maximumValue, clampedValue);
          
          if (finalValue !== values.max) {
            setValues(prev => ({ ...prev, max: finalValue }));
            onValuesChange?.(values.min, finalValue);
          }
          
          const finalPos = ((finalValue - minimumValue) / range) * sliderWidth;
          maxPosition.setValue(finalPos);
        }
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        // Snap to final position
        const range = maximumValue - minimumValue;
        if (isMin) {
          const finalPos = ((values.min - minimumValue) / range) * sliderWidth;
          Animated.spring(minPosition, {
            toValue: finalPos,
            useNativeDriver: false,
            tension: 100,
            friction: 7,
          }).start();
        } else {
          const finalPos = ((values.max - minimumValue) / range) * sliderWidth;
          Animated.spring(maxPosition, {
            toValue: finalPos,
            useNativeDriver: false,
            tension: 100,
            friction: 7,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        // Terminate edildiğinde de mevcut değeri koru (slider alanından çıkınca)
        // Değerler zaten onPanResponderMove'da güncellendi
        const range = maximumValue - minimumValue;
        if (isMin) {
          const finalPos = ((values.min - minimumValue) / range) * sliderWidth;
          Animated.spring(minPosition, {
            toValue: finalPos,
            useNativeDriver: false,
            tension: 100,
            friction: 7,
          }).start();
        } else {
          const finalPos = ((values.max - minimumValue) / range) * sliderWidth;
          Animated.spring(maxPosition, {
            toValue: finalPos,
            useNativeDriver: false,
            tension: 100,
            friction: 7,
          }).start();
        }
      },
    });
  }, [sliderWidth, containerX, values, minimumValue, maximumValue, onValuesChange, minPosition, maxPosition]);

  const minPanResponder = React.useMemo(() => createPanResponder(true), [createPanResponder]);
  const maxPanResponder = React.useMemo(() => createPanResponder(false), [createPanResponder]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText style={styles.title}>{title}</StyledText>
        <StyledText style={styles.value}>{values.min}-{values.max}</StyledText>
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
              left: minPosition,
              width: Animated.subtract(maxPosition, minPosition),
            },
          ]}
        />

        <Animated.View
          {...minPanResponder.panHandlers}
          style={[
            styles.thumb,
            {
              left: Animated.add(minPosition, -10),
            },
          ]}
        />

        <Animated.View
          {...maxPanResponder.panHandlers}
          style={[
            styles.thumb,
            {
              left: Animated.add(maxPosition, -10),
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

export default SettingsRangeSlider;
