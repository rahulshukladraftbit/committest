import React from 'react';
import {
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import Purchases from 'react-native-purchases';
import { Fetch } from 'react-request';
import * as DraftbitExampleApi from '../apis/DraftbitExampleApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const DoctorsListScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [selectedTag, setSelectedTag] = React.useState('All');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={false}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row', paddingLeft: 20 },
          dimensions.width
        )}
      >
        {/* Back btn */}
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 44,
                justifyContent: 'center',
                width: 44,
              },
              dimensions.width
            )}
          >
            <Icon size={24} name={'AntDesign/arrowleft'} />
          </View>
        </Touchable>
        {/* Screen Heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.text.strong,
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              marginLeft: 10,
            },
            dimensions.width
          )}
        >
          {'Doctor'}
        </Text>
      </View>

      <ScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={StyleSheet.applyWidth(
          {
            marginTop: 10,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
          },
          dimensions.width
        )}
      >
        {/* Heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.text.strong,
              fontFamily: 'Inter_500Medium',
              fontSize: 21,
            },
            dimensions.width
          )}
        >
          {'Available Doctor'}
        </Text>
        {/* Search Bar */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: palettes.App['Custom Color'],
              borderBottomWidth: 1,
              borderColor: theme.colors.border.brand,
              borderLeftWidth: 1,
              borderRadius: 12,
              borderRightWidth: 1,
              borderTopWidth: 1,
              flexDirection: 'row',
              height: 48,
              marginTop: 15,
              paddingLeft: 20,
              paddingRight: 20,
            },
            dimensions.width
          )}
        >
          <Icon
            size={24}
            name={'EvilIcons/search'}
            style={StyleSheet.applyWidth({ opacity: 0.5 }, dimensions.width)}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setTextInputValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            placeholder={'Search doctor '}
            placeholderTextColor={theme.colors.text.light}
            style={StyleSheet.applyWidth(
              {
                borderRadius: 8,
                fontFamily: 'Inter_400Regular',
                fontSize: 15,
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
                width: '80%',
              },
              dimensions.width
            )}
            value={textInputValue}
          />
        </View>

        <View
          style={StyleSheet.applyWidth({ marginTop: 12 }, dimensions.width)}
        >
          <FlashList
            data={Constants['speciaities']}
            estimatedItemSize={50}
            inverted={false}
            keyExtractor={(flashListData, index) =>
              flashListData?.id ??
              flashListData?.uuid ??
              index?.toString() ??
              JSON.stringify(flashListData)
            }
            listKey={'Scroll View->View->FlashList'}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const flashListData = item;
              return (
                <>
                  {/* Unselected */}
                  <>
                    {!(flashListData !== selectedTag) ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setSelectedTag(flashListData);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        activeOpacity={0.8}
                        disabledOpacity={0.8}
                        style={StyleSheet.applyWidth(
                          { marginRight: 12 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: palettes.App['Custom #ffffff'],
                              borderRadius: 8,
                              justifyContent: 'center',
                              paddingBottom: 8,
                              paddingLeft: 12,
                              paddingRight: 12,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_400Regular',
                              },
                              dimensions.width
                            )}
                          >
                            {flashListData}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                  {/* Selected */}
                  <>
                    {!(flashListData === selectedTag) ? null : (
                      <Touchable
                        activeOpacity={0.8}
                        disabledOpacity={0.8}
                        style={StyleSheet.applyWidth(
                          { marginRight: 12 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: theme.colors.branding.primary,
                              borderRadius: 8,
                              justifyContent: 'center',
                              paddingBottom: 8,
                              paddingLeft: 12,
                              paddingRight: 12,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                              },
                              dimensions.width
                            )}
                          >
                            {flashListData}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                </>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'column' },
              dimensions.width
            )}
            horizontal={true}
          />
        </View>
        {/* Doctors List */}
        <DraftbitExampleApi.FetchDoctorsListGET count={6}>
          {({ loading, error, data, refetchDoctorsList }) => {
            const doctorsListData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <FlashList
                data={doctorsListData}
                estimatedItemSize={50}
                horizontal={false}
                inverted={false}
                keyExtractor={(flashListData, index) =>
                  flashListData?.id ??
                  flashListData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(flashListData)
                }
                listKey={'Scroll View->Doctors List->FlashList'}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const flashListData = item;
                  return (
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { marginTop: 20 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color'],
                            borderRadius: 12,
                            flexDirection: 'row',
                            height: 104,
                            paddingLeft: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Image
                          resizeMode={'cover'}
                          source={imageSource(`${flashListData?.avatar}`)}
                          style={StyleSheet.applyWidth(
                            { borderRadius: 4, height: 80, width: 80 },
                            dimensions.width
                          )}
                        />
                        <View
                          style={StyleSheet.applyWidth(
                            { marginLeft: 15 },
                            dimensions.width
                          )}
                        >
                          {/* Name */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_500Medium',
                                fontSize: 16,
                              },
                              dimensions.width
                            )}
                          >
                            {'Dr. '}
                            {flashListData?.full_name}
                          </Text>
                          {/* Speciality */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_300Light',
                                marginTop: 5,
                                opacity: 0.7,
                              },
                              dimensions.width
                            )}
                          >
                            {'Cardiologi Specialist'}
                          </Text>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 12,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon
                              color={palettes.App['Custom Color_5']}
                              name={'FontAwesome/star'}
                              size={20}
                            />
                            {/* Rating */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Inter_300Light',
                                  fontSize: 12,
                                  marginLeft: 5,
                                  opacity: 0.7,
                                },
                                dimensions.width
                              )}
                            >
                              {'4.9'}
                            </Text>
                            {/* Review Count */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 12,
                                  opacity: 0.7,
                                },
                                dimensions.width
                              )}
                            >
                              {'  •  150 Reviews'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={StyleSheet.applyWidth(
                  { flex: 1 },
                  dimensions.width
                )}
              />
            );
          }}
        </DraftbitExampleApi.FetchDoctorsListGET>
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(DoctorsListScreen);
