import React, { useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Appointment from '~/components/Appointment';

import Background from '~/components/Background';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`appointments/${id}`);

      setAppointments(
        appointments.map(appointment =>
          Appointment.id === id
            ? {
                ...appointment,
                canceled_at: response.data.canceled_at,
              }
            : appointment
        )
      );
    } catch (error) {
      console.tron.error(error);
    }
  }

  async function loadAppointments() {
    try {
      const response = await api.get('appointments');
      setAppointments(response.data);
    } catch (error) {
      console.tron.error(error);
    }
  }

  useEffect(() => {
    if (isFocused) loadAppointments();
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={26} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
