import React from 'react';
import { MapView } from '@draftbit/maps';
import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import Purchases from 'react-native-purchases';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      Purchases.logIn(String('4646465w6dfddf'));
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <MapView
        autoClusterMarkers={false}
        autoClusterMarkersDistanceMeters={10000}
        latitude={37.40241}
        loadingEnabled={true}
        longitude={-122.12125}
        moveOnMarkerPress={true}
        rotateEnabled={true}
        scrollEnabled={true}
        showsCompass={false}
        showsPointsOfInterest={true}
        showsUserLocation={false}
        zoom={8}
        zoomEnabled={true}
        {...GlobalStyles.MapViewStyles(theme)['Map View'].props}
        apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
        style={StyleSheet.applyWidth(
          GlobalStyles.MapViewStyles(theme)['Map View'].style,
          dimensions.width
        )}
      />
      <WebView
        allowFileAccessFromFileURLs={false}
        allowUniversalAccessFromFileURLs={false}
        cacheEnabled={true}
        incognito={false}
        javaScriptCanOpenWindowsAutomatically={false}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        source={imageSource('https://reactnative.dev')}
        startInLoadingState={false}
        {...GlobalStyles.WebViewStyles(theme)['Web View'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.WebViewStyles(theme)['Web View'].style,
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
