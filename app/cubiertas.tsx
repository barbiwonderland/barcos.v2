import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { SectionButtons } from '~/components/Section-buttons';

export default function Cubiertas() {
  const { name } = useLocalSearchParams();
  const cubiertasArray = [
    'tripulación',
    'certificados',
    'operaciones',
    'equipos',
    'zafarranchos',
    'planos',
  ];
  return (
      <>
         <Stack.Screen options={{ title: 'Maquinas' }} />
         <Container>
           <View className="h-full w-full bg-[#0A1C34]">
             <Text className="mt-10 text-center font-bold uppercase text-white sm:text-3xl">
               SECCIÓN MAQUINAS
             </Text>
             <View className="buttons h-2/3  w-2/3 flex-wrap  flex-row gap-5 content-center justify-center mx-auto mt-5">
               {cubiertasArray && cubiertasArray.length > 0 ? (
                 cubiertasArray.map((option, index) => <SectionButtons key={index} title={option} />)
               ) : (
                 <h1>No hay opciones disponibles</h1>
               )}
             </View>
           </View>
         </Container>
       </>
  );
}
