import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { SectionButtons } from '~/components/Section-buttons';

export default function Cubiertas() {
  const { name } = useLocalSearchParams();
  const cubiertasArray = [
    { name: 'tripulación', route: 'crew' },
    { name: 'certificados', route: 'certificados' },
    { name: 'operaciones', route: 'operaciones' },
    { name: 'equipos', route: 'equipos' },
    { name: 'zafarranchos', route: 'zafarranchos' },
    { name: 'planos', route: 'planos' },
  ];
  return (
    <>
      <Stack.Screen options={{ title: 'Cubiertas' }} />
      <Container>
        <View className="h-full w-full bg-[#0A1C34] ">
          <Text className="mt-10 text-center font-bold uppercase text-white sm:text-3xl">
            SECCIÓN CUBIERTAS
          </Text>
          <View className="flex-1 items-center justify-center">
            <View className="buttons mx-auto  mt-5  w-full flex-row  flex-wrap justify-center gap-5">
              {cubiertasArray && cubiertasArray.length > 0 ? (
                cubiertasArray.map((option, index) => <SectionButtons key={index} title={option.name} route={option.route} />)
              ) : (
                <h1>No hay opciones disponibles</h1>
              )}
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}
