import { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";
import SwipeCard from "../SwipeCard";
import EmptyContent from "../EmptyContent";

const fillerUser = {
    uid: 1,
    name: 'Emma',
    birthdate: '1998-05-15T00:00:00.000Z',
    photos: [
      'https://picsum.photos/300/400?random=1',
      'https://picsum.photos/300/400?random=2',
      'https://picsum.photos/300/400?random=3',
      'https://picsum.photos/300/400?random=4',
    ],
    location: 'Istanbul, Turkey'
  };

  const onActionFunc = (userUid)=>{};

  const makeFillerData = ()=>{
    return new Array(5).fill(1)
    .map((_, index)=>{
        return {
            ...fillerUser,
            uid: index,
            name: `Emma${index}`
        }
    })
  }


const Swiper = ({
    data = makeFillerData(),
    onLike = onActionFunc,
    onPass = onActionFunc,
    onSuperLike = onActionFunc,
    onChat = onActionFunc,
    onStar = onActionFunc,
    onExamine = onActionFunc,
    onRefresh = ()=>{},
})=>{
    const dims = Dimensions.get('window');
    const cardWidth = dims.width*(382/430);
    const cardHeight = cardWidth*(560/382);
    const [activeIdx, setActiveIdx2] = useState(0);

    const setActiveIdx = (idx)=>{
        setActiveIdx2(idx);
        panEvents.activeIdx = idx;
    }

    const pan = useRef(new Animated.ValueXY()).current;
    const pan2 = useRef(new Animated.ValueXY()).current;

    const abortSwipe = (duration = 100, animVal = panEvents.activeIdx%2 ? pan2 : pan)=>{
        Animated.timing(animVal, {
            toValue: {x: 0, y: 0},
            duration: duration,
            useNativeDriver: true
        }).start();
    };

    const doSwipe = (isLeft = false, simulated = false)=>{
        const animVal = panEvents.activeIdx%2 ? pan2 : pan;
        if (!simulated){
            (isLeft ? onPass : onLike)(data[panEvents.activeIdx].uid);
        }

        Animated.timing(animVal, {
            toValue: {x: isLeft ? -dims.width*1.5 : dims.width*1.5, y: 0},
            duration: 1500,  // Like animasyonunu görmek için süreyi uzattık
            useNativeDriver: true
        }).start(()=>{
            setActiveIdx(panEvents.activeIdx+1);
            setTimeout(() => {
                abortSwipe(0, animVal);
            }, 10);
        });
    }

    const panEvents = useRef({
        pan_actual: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        pan2_actual: Animated.event([null, {dx: pan2.x, dy: pan2.y}]),
        pan: (...args)=>{
            panEvents.pan_actual(...args);
            //console.log("dispatched pan");

        },
        pan2: (...args)=>{
            panEvents.pan2_actual(...args);
            //console.log("dispatched pan2");
        },
        activeIdx: activeIdx
    }).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (...args)=>{
            panEvents.activeIdx%2 ? panEvents.pan2(...args) : panEvents.pan(...args);
          },
          onPanResponderRelease: (e, gesture) => {
            if (panEvents.activeIdx == data.length){
                return
            }

            if (Math.abs(gesture.vx) < 0.7){
                abortSwipe(100, panEvents.activeIdx%2 ? pan2 : pan);
                return;
            }
            doSwipe(gesture.vx < 0);
          },
        }),
      ).current;

    const cardStyle = {
        width: cardWidth, 
        height: cardHeight, 
        // backgroundColor: 'red',
        position: 'absolute',
        top: dims.height/2 - cardHeight/2 - 20,
        left: dims.width/2 - cardWidth/2,
    }

    const animatedCardStyle = animatedXY => ({
        transform: [
            {translateX: animatedXY.x}, 
            {translateY: animatedXY.y},
            {rotate: animatedXY.x.interpolate({inputRange: [-100, 0, 100], outputRange: ['-2deg', '0deg', '2deg']})}
        ], 
    });

    const cardHandlers = uid => ({
        onSuperLike: ()=>{
            doSwipe(false, true);
            onSuperLike(uid);
        },
        onChat: ()=>{
            doSwipe(false, true);
            onChat(uid);
        },
        onStar: ()=>{
            doSwipe(false, true);
            onStar(uid);
        },
        onLike: ()=>{
            doSwipe(false, true);
            onLike(uid);
        },
        onPass: ()=>{
            doSwipe(true, true);
            onPass(uid);
        },
        onExamine: ()=>{
            onExamine(uid);
        }
    });

    return (
        <Animated.View  {...panResponder.panHandlers} style={{position: 'relative', width: "100%", height: "100%", }}>
            {(()=>{
                const idx = activeIdx%2 ? activeIdx+1 : activeIdx;
                if(!data[idx]){return null}

                return (<Animated.View
                    style={[
                        cardStyle,
                        animatedCardStyle(pan),
                        { zIndex: activeIdx % 2 === 0 ? 100 : 10 },
    
                    ]}
                >
                    <SwipeCard {...cardHandlers(data[idx].uid)} user={data[idx]} />
                </Animated.View>)
            })()}

            {(()=>{
                const idx = activeIdx%2 ? activeIdx : activeIdx+1;
                if(!data[idx]){return null}

                return (<Animated.View
                    style={[
                        cardStyle,
                        animatedCardStyle(pan2),
                        { zIndex: activeIdx % 2 === 1 ? 100 : 10 },
                    ]}
                >
                    <SwipeCard {...cardHandlers(data[idx].uid)} user={data[idx]} />
                </Animated.View>)
            })()}

            {!data[activeIdx+1] && <View style={[
                cardStyle,
                {
                    zIndex: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            ]}>
                <EmptyContent description="No more users" />
            </View>}

        </Animated.View>
    )
}

export default Swiper;