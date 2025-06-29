import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
  const mockData = [
    { id: '1', name: 'Elemento A', priority: 'high' },
    { id: '2', name: 'Elemento B', priority: 'high' },
    { id: '3', name: 'Elemento C', priority: 'medium' },
    { id: '4', name: 'Elemento D', priority: 'medium' },
    { id: '5', name: 'Elemento E', priority: 'medium' },
    { id: '6', name: 'Elemento F', priority: 'medium' },
    { id: '7', name: 'Elemento G', priority: 'medium' },
    { id: '8', name: 'Elemento H', priority: 'medium' },
    { id: '9', name: 'Elemento I', priority: 'medium' },
    { id: '10', name: 'Elemento J', priority: 'medium' },
    { id: '11', name: 'Elemento K', priority: 'medium' },
  ];

  type Item = {
    id: string;
    name: string;
    priority: string;
  };

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  // Simular fetch de API descomentar cuand agregues api
  useEffect(() => {
    // fetch('https://example.com/api/items') // Reemplazá por tu API real
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData(json);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error cargando datos:', error);
    //     setLoading(false);
    //   });

    // const unlockScreenOerientation = async () => {
    //   await ScreenOrientation.unlockAsync();
    // };
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      console.log('orientation desde index', orientation);
    };
    checkOrientation();
    // unlockScreenOerientation();
    changeScreenOrientation();
    checkOrientation();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Barcos v2' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="20-4-2024">
          <Text className="text-center font-bold uppercase sm:text-3xl">BUQUE RUISEÑOR</Text>
          <View className="h-full mx-auto w-11/12  flex-col flex-wrap content-center  py-10">
            {mockData.map((item) => (
              <View key={item.id} className=" m-2 flex w-5/12 flex-row  gap-2 items-center  p-4">
                {item.priority === 'medium' ? (
                  <AntDesign name="warning" size={24} color="orange" />
                ) : (
                  <AntDesign name="closecircleo" size={24} color="red" />
                )}
                <Text className="font-bold capitalize text-black">{item.name}</Text>
              </View>
            ))}
          </View>

          <View className="mt-4 flex-row justify-between gap-4 px-4 ">
            <View className="w-1/2 ">
              <Link href={{ pathname: '/maquinas' }} asChild>
                <Button className="bg-[#2D9483]" title="Maquinas" />
              </Link>
            </View>

            <View className="w-1/2">
              <Link href={{ pathname: '/cubiertas' }} asChild>
                <Button className="bg-[#294944]" title="Cubiertas" />
              </Link>
            </View>
          </View>
        </ScreenContent>
      </Container>
    </>
  );
}
