import React, { memo, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const DeviceCircle = memo(({ device, position }) => {
    if (!device.profile) return null;
    
    return (
        <View
            style={[
                styles.deviceCircle,
                {
                    bottom: `${position.vertical * 100}%`,
                    left: `${position.horizontal}%`,
                    transform: [{ translateX: -30 }],
                    overflow: 'hidden',
                }
            ]}
        >
            <Image 
                source={{ uri: device.profile.photo_url }} 
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    );
});

const RadarView = memo(({ devices }) => {
    const getPositionFromRSSI = (rssi) => {
        const minRSSI = -100;
        const maxRSSI = -30;
        const normalized = (rssi - minRSSI) / (maxRSSI - minRSSI);
        return 0.35 + (normalized * 0.35);
    };

    const devicePositions = useMemo(() => {
        const SCREEN_PADDING = 20;
        const SEGMENTS = 5;
        const usedPositions = [];
        
        return devices.map((device, index) => {
            const verticalPosition = getPositionFromRSSI(device.rssi);
            const segmentWidth = (100 - (2 * SCREEN_PADDING)) / SEGMENTS;
            const segment = index % SEGMENTS;
            const basePosition = SCREEN_PADDING + (segment * segmentWidth);
            
            let horizontalPosition = basePosition;
            let bestPosition = basePosition;
            let maxDistance = 0;

            // Try 5 different positions and pick the one with maximum distance from others
            for (let i = 0; i < 5; i++) {
                const testPosition = basePosition + (Math.random() - 0.5) * (segmentWidth * 0.7);
                let minDistance = Infinity;

                for (const pos of usedPositions) {
                    const horizontalDiff = Math.abs(testPosition - pos.x);
                    const verticalDiff = Math.abs(verticalPosition - pos.y);
                    const distance = Math.sqrt(horizontalDiff * horizontalDiff + verticalDiff * verticalDiff);
                    minDistance = Math.min(minDistance, distance);
                }

                if (minDistance > maxDistance) {
                    maxDistance = minDistance;
                    bestPosition = testPosition;
                }
            }

            usedPositions.push({ x: bestPosition, y: verticalPosition });
            
            return {
                id: device.id,
                vertical: verticalPosition,
                horizontal: bestPosition
            };
        });
    }, [devices]);

    return (
        <View style={styles.radarContainer}>
            {devicePositions.map((position) => (
                <DeviceCircle
                    key={position.id}
                    device={devices.find(d => d.id === position.id)}
                    position={position}
                />
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    deviceCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    radarContainer: {
        flex: 1,
        position: 'relative',
    },
});

export default RadarView;
