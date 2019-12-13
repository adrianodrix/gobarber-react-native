import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "EEEE',' dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    [date]
  );

  const handleSetDate = (event, _date) => {
    if (_date) onChange(_date);
    setOpened(!opened);
  };

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" size={20} color="#fff" />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            onChange={handleSetDate}
            minimumDate={new Date()}
            minimumInterval={60}
            locale="pt"
            mode="date"
            display="default"
          />
        </Picker>
      )}
    </Container>
  );
}
