import { StyleSheet } from "react-native";
import { styleConstants } from "../../../../../../config/styleConstants";

export default cardListStyles = StyleSheet.create({
    card: {
        borderWidth: 2.5,
        borderColor: '#00000000',
        shadowColor: '#000',
        width: '45%', // Two cards fit side by side
        marginBottom: 10,
        height: 250,
        borderRadius: 30,
        overflow: 'hidden', // Prevent content overflow
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 27.5,
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: styleConstants.padding / 2,
        justifyContent: 'flex-end',
    },
    topButtons: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 1,  // Default visible
        height: 'auto',
    },
    hiddenButtons: {
        opacity: 0, // Hidden buttons
        height: 0, // Don't take up space
        pointerEvents: 'none', // Not clickable
    }
});
