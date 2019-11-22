import React, {useState, useMemo} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {Container, DateButton, DateText, Picker} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DateInput({date, onChange}) {
  [opened, setOpened] = useState(false);

  const formatedDate = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy ", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20}></Icon>
        <DateText>{formatedDate}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            onChange={onChange}
            locale="pt"
            mode="date"
            minimumDate={new Date()}
            display="default"></DateTimePicker>
        </Picker>
      )}
    </Container>
  );
}
