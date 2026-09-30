import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle, Easing } from 'react-native';

interface AnimatedPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  children?: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
  scaleTo?: number;
  opacityTo?: number;
  animationDuration?: number;
}

export function AnimatedPressable({
  style,
  onPressIn,
  onPressOut,
  children,
  scaleTo = 0.95,
  opacityTo = 0.8,
  animationDuration = 120,
  ...props
}: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: any) => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: scaleTo,
        duration: animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: opacityTo,
        duration: animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    if (onPressOut) onPressOut(e);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      {({ pressed }) => {
        const styleProp = typeof style === 'function' ? style({ pressed }) : style;
        return (
          <Animated.View style={[styleProp, { transform: [{ scale }], opacity }]}>
            {typeof children === 'function' ? children({ pressed }) : children}
          </Animated.View>
        );
      }}
    </Pressable>
  );
}
