import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Onboarding } from './src/screens/Onboarding';
import { colors, fonts } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const lottieRef = useRef<LottieView>(null);
  const [splashDone, setSplashDone] = useState(false);
  // useRef instead of useState: mutating a ref does NOT trigger a re-render,
  // so the useEffect cleanup never cancels the timers prematurely.
  const nativeSplashHiddenRef = useRef(false);
  const splashFinishedRef = useRef(false);
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    [fonts.regular]: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    [fonts.medium]: require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    [fonts.semibold]: require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    [fonts.bold]: require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    [fonts.extrabold]: require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

  const finishSplash = useCallback(() => {
    // Guard: only run once even if called by both onAnimationFinish and safetyTimer
    if (splashFinishedRef.current) return;
    splashFinishedRef.current = true;
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setSplashDone(true));
  }, [overlayOpacity]);

  // Runs once when fonts are ready. Using refs for guards so no re-render is
  // triggered inside the effect — that would run the cleanup and cancel timers.
  useEffect(() => {
    if (!fontsLoaded || nativeSplashHiddenRef.current) return;
    nativeSplashHiddenRef.current = true;
    SplashScreen.hideAsync().catch(() => {});

    // setTimeout is more reliable than requestAnimationFrame on Android.
    const playTimer = setTimeout(() => {
      lottieRef.current?.play();
    }, 50);

    // Safety net: if onAnimationFinish never fires (Android quirk),
    // force the splash out after 6 s.
    const safetyTimer = setTimeout(finishSplash, 6000);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(safetyTimer);
    };
  }, [fontsLoaded, finishSplash]);

  const handleAnimationFinish = useCallback(() => {
    finishSplash();
  }, [finishSplash]);

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        {fontsLoaded && <Onboarding />}
        <StatusBar style="light" />

        {!splashDone && (
          <Animated.View
            pointerEvents="none"
            style={[styles.splashOverlay, { opacity: overlayOpacity }]}
          >
            <LottieView
              ref={lottieRef}
              source={require('./assets/lottie/splash.json')}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              autoPlay={false}
              loop={false}
              progress={0}
              onAnimationFinish={handleAnimationFinish}
            />
          </Animated.View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
