import { ImageBackground, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { EditScreenInfo } from './EditScreenInfo';
const shipImage = require('../assets/ship.jpg');
type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

const date = new Date();

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <ImageBackground
      source={shipImage}
      style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}
      resizeMode="cover">
      <View className="h-full w-full justify-between px-3 py-5">
        <View className="w-full flex-row justify-between gap-5   ">
          <View className="flex flex-row ">
            <Text className="text-4xl font-bold"> {date.toLocaleDateString()}</Text>
            <Text className="text-4xl font-bold"> {date.toLocaleTimeString()}</Text>
          </View>
          <View className="flex flex-row  gap-2 ">
            <Feather name="user" size={40} color="black" />
            <Text className="text-4xl font-bold">Administrator</Text>
          </View>
        </View>

        {children}
      </View>
    </ImageBackground>
  );
};
