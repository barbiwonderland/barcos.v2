import { Stack } from 'expo-router';
import CrewList from '~/components/Crew/CrewList';

export default function Crew() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tripulación' }} />

      <CrewList />
    </>
  );
}
