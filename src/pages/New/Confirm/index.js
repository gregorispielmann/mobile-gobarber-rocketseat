import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';

import {parseISO, format, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {Container, Avatar, Name, Time, SubmitButton} from './styles';

export default function Confirm({navigation}) {
  const time = navigation.getParam('time');
  const provider = navigation.getParam('provider');

  const formatedDate = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatars/285/${provider.name}.png`,
          }}></Avatar>
        <Name>{provider.name}</Name>
        <Time>{formatedDate}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({navigation}) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff"></Icon>
    </TouchableOpacity>
  ),
});
