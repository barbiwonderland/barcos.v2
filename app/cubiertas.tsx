import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Cubiertas() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Cubiertas' }} />
      <Container>
        <ScreenContent path="screens/cubiertas.tsx" title={`Sección Cubiertas`} />
      </Container>
    </>
  );
}
