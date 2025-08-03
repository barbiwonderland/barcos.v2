import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { SectionButtons } from '~/components/Section-buttons';

export default function Maquinas() {
  const { name } = useLocalSearchParams();
  const maquinasArray = [
    'mantenimiento',
    'certificados',
    'diagramas',
    'equipos',
    'solicitudes',
    'reparaciones',
  ];
  return (
    <>
      <Stack.Screen options={{ title: 'Maquinas' }} />
      <Container>
        <View className="h-full w-full bg-[#0A1C34] ">
          <Text className="mt-10 text-center font-bold uppercase text-white sm:text-3xl">
            SECCIÓN MAQUINAS
          </Text>
          <View className="flex-1 justify-center items-center">
          <View className="buttons w-full  flex-wrap  flex-row gap-5  justify-center mx-auto mt-5">
            {maquinasArray && maquinasArray.length > 0 ? (
              maquinasArray.map((option, index) => <SectionButtons key={index} title={option} />)
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
