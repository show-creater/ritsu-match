import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SwipableCards = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const currentIndexShared = useSharedValue(0);

  const updateIndex = (newIndex) => {
    setCurrentIndex(newIndex % data.length);
    console.log('updateIndex');
    x.value = 0;
    y.value = 0;
  };

  useEffect(() => {
    console.log('hello');
    const timer = setTimeout(() => {
      x.value = 0.001;
      y.value = 0.001;
    }, 1);
    return () => clearTimeout(timer);
  },[currentIndex]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (event.translationX > SCREEN_WIDTH / 4) {
        console.log('end');
        // x.value = withSpring(SCREEN_WIDTH, {}, () => {
          runOnJS(updateIndex)(currentIndexShared.value + 1);
          currentIndexShared.value = currentIndexShared.value + 1;
        // });
      } else if (event.translationX < -SCREEN_WIDTH / 4) {
          runOnJS(updateIndex)(currentIndexShared.value + 1);
          currentIndexShared.value = currentIndexShared.value + 1;
      } else {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item, index) => {
        if (index < currentIndex) {
          return null;
        }

        const isLastCard = index === currentIndex;
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card,
              { zIndex: data.length - index,},
              isLastCard && animatedStyle,
            ]}
          >
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={styles.cardContent}>
                <Text style={styles.text}>{item.text}</Text>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        );
      }).reverse()}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default function App() {
  const data = [
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
    { id: 5, text: 'Card 5' },
    { id: 6, text: 'Card 6' },
    { id: 7, text: 'Card 7' },
    { id: 8, text: 'Card 8' },
    { id: 9, text: 'Card 9' },
  ];

  return <SwipableCards data={data} />;
}
