import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {Container, ProvidersList, Provider, Avatar, Name} from './styles';

import api from '~/services/api';

export default function SelectProvider() {
  const [providers, setProviders] = useState();

  useEffect(() => {
    async function loadProviders() {
      const res = await api.get('providers');

      setProviders(res.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({item: provider}) => (
            <Provider>
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatars/285/${provider.name}.png`,
                }}></Avatar>
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({navigation}) => ({
  title: 'Selecione o Prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff"></Icon>
    </TouchableOpacity>
  ),
});
