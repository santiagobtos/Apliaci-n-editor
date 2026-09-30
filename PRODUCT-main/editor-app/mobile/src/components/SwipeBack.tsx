import { useRef, useLayoutEffect } from 'react';
import { colors } from '../theme';
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';

const SCREEN_W = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_W * 0.3;
const EDGE_ZONE = 35;

interface Props {
  onBack: () => void;
  enabled?: boolean;
  screenKey: string;
  isForward: boolean;
  children: React.ReactNode;
}

export function SwipeBack({ onBack, enabled = true, screenKey, isForward, children }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const cbRef = useRef(onBack);
  cbRef.current = onBack;
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useLayoutEffect(() => {
    if (isForward) {
      translateX.setValue(SCREEN_W);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      translateX.setValue(0);
    }
  }, [screenKey, isForward, translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _e: GestureResponderEvent,
        g: PanResponderGestureState
      ) => {
        if (!enabledRef.current) return false;
        const startX = g.moveX - g.dx;
        return startX < EDGE_ZONE && g.dx > 12 && Math.abs(g.dy) < 25;
      },
      onPanResponderMove: (_e, g) => {
        if (g.dx > 0) translateX.setValue(g.dx);
      },
      onPanResponderRelease: (_e, g) => {
        if (g.dx > SWIPE_THRESHOLD || g.vx > 0.5) {
          Animated.timing(translateX, {
            toValue: SCREEN_W,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            cbRef.current();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            overshootClamping: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          overshootClamping: true,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[S.root, { transform: [{ translateX }] }]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
}

const S = StyleSheet.create({
  root: { 
    flex: 1,
    backgroundColor: colors.bg,
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});
