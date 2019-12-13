import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const [loading, setLoading] = useState(false);
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');
  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: ptBR }),
    [time]
  );

  const handleAppointment = async () => {
    try {
      setLoading(true);
      await api.post('appointments', {
        provider_id: provider.id,
        date: time,
      });

      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert(error.message);
      console.tron.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/150/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAppointment} loading={loading}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={26} color="#fff" />
    </TouchableOpacity>
  ),
});
