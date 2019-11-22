import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, HourList, Hour, Title} from './styles';

import Background from '~/components/Background';
import api from '~/services/api';

import DateInput from '~/components/DateInput';

export default function SelectDateTime({navigation}) {
  const provider = navigation.getParam('provider');
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState();

  function handleDate(changedDate) {
    setDate(changedDate);
  }

  useEffect(() => {
    async function loadAvailable() {
      const res = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      console.tron.log('Horas', res.data);

      setHours(res.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleHour(time) {
    navigation.navigate('Confirm', {provider, time});
  }

  return (
    <Background>
      <Container>
        <DateInput
          date={date}
          onChange={(_, changedDate) => {
            handleDate(changedDate);
          }}></DateInput>

        <HourList
          data={hours}
          keyExtractor={item => item.t}
          renderItem={({item}) => (
            <Hour
              enabled={item.available}
              onPress={() => {
                handleHour(item.value);
              }}>
              <Title>{item.t}</Title>
            </Hour>
          )}></HourList>
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff"></Icon>
    </TouchableOpacity>
  ),
});
