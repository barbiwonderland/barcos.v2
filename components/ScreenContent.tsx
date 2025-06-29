import { ImageBackground, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { EditScreenInfo } from './EditScreenInfo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

const shipImage = require('../assets/ship.jpg');
type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

const date = new Date();


export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {

useEffect(() => {
  const unlockScreenOerientation = async () => {
    await ScreenOrientation.unlockAsync();
  };
  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    console.log('orientation', orientation);
  };
  checkOrientation();
  unlockScreenOerientation();
}, []);

  return (
    <ImageBackground
      source={shipImage}
      style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}
      resizeMode="cover">
      <View className="h-full w-full justify-between px-3 py-5 ">
        <View className="w-full flex-row justify-between gap-5   ">
          <View className="flex flex-row ">
            <Text className="sm:text-xl  font-bold"> {date.toLocaleDateString()}</Text>
            <Text className=" sm:text-xl  font-bold"> {date.toLocaleTimeString()}</Text>
          </View>
          <View className="flex flex-row  gap-2 ">
            <Feather name="user" size={20} color="black" />
            <Text className="sm:text-xl  font-bold">Administrator</Text>
          </View>
        </View>

        {children}
      </View>
    </ImageBackground>
  );
};
