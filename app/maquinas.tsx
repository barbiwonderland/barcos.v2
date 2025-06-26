import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Maquinas() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Maquinas' }} />
      <Container>
        <ScreenContent path="screens/maquinas.tsx" title={`Sección maquinas`} />
      </Container>
    </>
  );
}
