import React, { useState, useEffect, useRef } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import LogoSVG from '../../assets/svg/logo.svg';
import StyledText from '../../components/StyledText';
import { skipOnboarding } from '../../stores/onboarding_store';
import Video from 'react-native-video';

const stories = [
  {
    stories: [
      {
        video: require('../../assets/video/love.mov'),
        duration: 5,
      },
      {
        video: require('../../assets/video/bus.mov'),
        duration: 5,
      },
      {
        video: require('../../assets/video/friendship.mov'),
        duration: 5,
      }
    ]
  }
];

const Onboarding = () => {
  const [isStoryViewVisible, setIsStoryViewShow] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyData] = useState(stories[0].stories);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [storyDuration, setStoryDuration] = useState(storyData[0]?.duration);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (currentStoryIndex === storyData.length) {
      setCurrentStoryIndex(0);
      setStoryDuration(storyData[0]?.duration);
    }

    if (currentStoryIndex < storyData.length) {
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[currentStoryIndex] = 0;
        return newProgress;
      });
      animateProgressBar(0);
    }
  }, [currentStoryIndex, storyData.length, storyDuration]);

  const handleStoryComplete = () => {
    if (currentStoryIndex < storyData.length - 1) {
      setCurrentStoryIndex(prevIndex => prevIndex + 1);
      setStoryDuration(storyData[currentStoryIndex + 1]?.duration);
    } else {
      setTimeout(() => {
        setProgress([0, 0, 0]);
        setStoryDuration(storyData[0]?.duration);
        setCurrentStoryIndex(0);
      }, 1000);
    }
  };

  const animateProgressBar = (elapsedTime) => {
    if (elapsedTime < storyDuration * 1000) {
      const progressIncrement = (elapsedTime / (storyDuration * 1000)) * 100;
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[currentStoryIndex] = progressIncrement;
        return newProgress;
      });
      requestAnimationFrame(() => animateProgressBar(elapsedTime + 20));
    } else {
      handleStoryComplete();
    }
  };

  const handleRedirect = () => {
    setIsStoryViewShow(false);
    skipOnboarding();
  };

  return (
    <Modal
      visible={isStoryViewVisible}
      statusBarTranslucent={true}
      onRequestClose={() => setIsStoryViewShow(false)}
    >
      <View style={styles.container}>

        <Video
          source={storyData[currentStoryIndex]?.video}
          ref={videoRef}
          onError={console.log}
          poster={storyData[currentStoryIndex].url}
          onLoad={() => {
            videoRef.current.seek(0); // this will set first frame of video as thumbnail
          }}
          style={styles.video}
        />
        <View style={styles.storyContainer}>
          <View style={styles.backgroundImage}>
            <View style={styles.overlay} />
            <View style={styles.progressBarContainer}>
              {progress.map((item, index) => (
                <View key={index} style={styles.singleProgressBarContainer}>
                  <View style={[styles.progressBar, { width: `${item}%` }]} />
                </View>
              ))}
            </View>
            <View style={styles.headerContainer}>
              <LogoSVG width={35} />
              <StyledText title1 bold> Chat Drop</StyledText>
            </View>
            <View style={styles.overlayTextContainer}>
              <View style={styles.additionalTextContainer}>
                {["Love", "Networking", "Friendship", "And more!"].map((e, i) => (
                  <StyledText key={i} style={[styles.textLine, i === currentStoryIndex ? styles.line2 : styles.line1]}>
                    {e}
                  </StyledText>
                ))}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleRedirect}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  storyContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 15,
    zIndex: 2,
    gap: 5,
  },
  overlayTextContainer: {
    flex: 1,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    zIndex: 2,
  },
  additionalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  textLine: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  line1: {
    color: '#9A9A9A',
  },
  line2: {
    color: '#fff',
  },
  progressBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    height: 6,
    zIndex: 3,
    top: '8%',
    alignSelf: 'center',
  },
  singleProgressBarContainer: {
    width: '30%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginHorizontal: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Onboarding;
