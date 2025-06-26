import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const mockData = [
    { id: '1', name: 'Elemento A' },
    { id: '2', name: 'Elemento B' },
    { id: '3', name: 'Elemento C' },
    { id: '4', name: 'Elemento D' },
    { id: '5', name: 'Elemento E' },
  ];

  type Item = {
    id: string;
    name: string;
  };

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular fetch de API
  useEffect(() => {
    fetch('https://example.com/api/items') // Reemplazá por tu API real
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Barcos v2' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="20-4-2024">
          <View>
            <Text className="text-center text-5xl font-bold">Lista</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                //cuand agreues api cambia aca por data
                data={mockData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="border border-blue-500 p-4">
                    <Text className="text-5xl font-bold text-black">{item.name}</Text>
                  </View>
                )}
              />
            )}
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
