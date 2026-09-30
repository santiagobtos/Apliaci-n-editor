import React, { useRef } from 'react';
import { Animated, TextInput, TextInputProps } from 'react-native';
import { colors } from '../theme';

const AnimatedTextInp = Animated.createAnimatedComponent(TextInput);

export function AnimatedTextInput({ style, onFocus, onBlur, ...props }: TextInputProps) {
  const animValue = useRef(new Animated.Value(0)).current;

  const handleFocus = (e: any) => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (onBlur) onBlur(e);
  };

  const borderColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.stroke, colors.primary],
  });

  return (
    <AnimatedTextInp
      {...props}
      style={[style, { borderColor }]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
