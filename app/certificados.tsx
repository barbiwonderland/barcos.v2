import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { SectionButtons } from '~/components/Section-buttons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Cubiertas() {
  const { name } = useLocalSearchParams();
  const certificados: {
    nombre: string;
    fecha: string;
    archivo: string;
  }[] = [
    {
      nombre: 'Certificado de Matrícula',
      fecha: '2025-06-10',
      archivo: 'certificado-matricula.pdf',
    },
    {
      nombre: 'Permiso de Navegación',
      fecha: '2025-05-22',
      archivo: 'permiso-navegacion.pdf',
    },
    {
      nombre: 'Certificado de Seguridad',
      fecha: '2025-04-15',
      archivo: 'certificado-seguridad.pdf',
    },
    {
      nombre: 'Seguro Obligatorio',
      fecha: '2025-03-08',
      archivo: 'seguro-obligatorio.pdf',
    },
    {
      nombre: 'Revisión Técnica Anual',
      fecha: '2025-02-28',
      archivo: 'revision-tecnica.pdf',
    },
    {
      nombre: 'Habilitación de Capitán',
      fecha: '2025-01-20',
      archivo: 'habilitacion-capitan.pdf',
    },
    {
      nombre: 'Licencia de Radio',
      fecha: '2024-12-05',
      archivo: 'licencia-radio.pdf',
    },
    {
      nombre: 'Certificado de Motor',
      fecha: '2024-11-12',
      archivo: 'certificado-motor.pdf',
    },
    {
      nombre: 'Permiso de Amarre',
      fecha: '2024-10-01',
      archivo: 'permiso-amarre.pdf',
    },
    {
      nombre: 'Certificado de Egreso',
      fecha: '2024-09-18',
      archivo: 'certificado-egreso.pdf',
    },
    {
      nombre: 'Certificado de Motor',
      fecha: '2024-11-12',
      archivo: 'certificado-motor.pdf',
    },
    {
      nombre: 'Permiso de Amarre',
      fecha: '2024-10-01',
      archivo: 'permiso-amarre.pdf',
    },
    {
      nombre: 'Certificado de Egreso',
      fecha: '2024-09-18',
      archivo: 'certificado-egreso.pdf',
    },
  ];
  
  return (
    <>
      <Stack.Screen options={{ title: 'Certificados' }} />
      <Container>
        <View className="h-full w-full bg-[#0A1C34]">
          {/* Título principal */}
          <Text className="mt-10 text-center text-xl font-bold uppercase text-white sm:text-3xl">
            CERTIFICADOS
          </Text>

          <View className=' w-10/12 mx-auto h-3/4'>
            {/* Encabezado de columnas */}
            <View className="mt-6 flex-row justify-between border-b border-gray-400 px-4 py-2">
              <Text className="w-1/3 font-semibold text-white">Nombre</Text>
              <Text className="w-1/3 text-center font-semibold text-white">Fecha</Text>
              <Text className="w-1/3 text-right font-semibold text-white">Acciones</Text>
            </View>

            {/* Lista de elementos */}
            <ScrollView>
              {certificados.map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between border-b border-gray-300 bg-white px-4 py-3">
                  {/* Nombre */}
                  <Text className="w-1/3 font-bold text-gray-900">{item.nombre}</Text>

                  {/* Fecha */}
                  <Text className="w-1/3 text-center text-gray-700">{item.fecha}</Text>

                  {/* Acciones */}
                  <View className="w-1/3 flex-row justify-end space-x-5">
                    <TouchableOpacity onPress={() => console.log('ver', item)}>
                      <AntDesign name="eye" size={24} color="#1e3a8a" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('test')}>
                      <FontAwesome name="trash" size={24} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Container>
    </>
  );
}
