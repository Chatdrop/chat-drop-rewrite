import { StyleSheet } from "react-native";
import { styleConstants } from "../../config/styleConstants";

export default swipeCardStyles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden',
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    overlayContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 9999999,
        padding: styleConstants.padding * 1.2,
    },
    topSection: {
        flexDirection: 'row',
    },
    profileTouchArea: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 9999,
        opacity: 0,
    },
    nameText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    statusBadge: {
        padding: 5,
        backgroundColor: '#F21D5B',
        borderRadius: styleConstants.borderRadius * 1.5,
        marginLeft: 5,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    locationText: {
        fontSize: 16,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    distanceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    photoIndicators: {
        height: 5,
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    indicator: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    photoNavigation: {
        flex: 1,
        flexDirection: 'row',
    },
    navArea: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 0,
        width: '100%',
        marginTop: -50,
        justifyContent: 'space-around',
        alignItems: "center",
    },
});
