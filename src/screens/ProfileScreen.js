import React from 'react';
import { FlatList, View, Alert, Linking, Modal, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '../store/modules/auth/actions';
import Autolink from 'react-native-autolink';

// components
import NajContainer from '../components/NajContainer';
import NajText from '../components/NajText';
import NajButton from '../components/NajButton';

// styles
import advStyles from './styles/advChoice';
import styles from './styles/profile';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = React.useState(false);

  const url =
    'https://www.najsistemas.com.br/termosdeuso/termos_naj_desk_abril_2021.pdf';

  const [data, setData] = React.useState([]);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleNavigationDeviceList() {
    navigation.navigate('DeviceList');
  }

  function handleNavigateAdvChoice() {
    navigation.navigate('AdvChoiceScreen');
  }

  function handleRenderItem({ item }) {
    return (
      <RectButton onPress={item.onPress}>
        <View style={advStyles.listItem}>
          <MaterialIcon name={item.icon} size={22} style={advStyles.icon} />

          <View style={styles.listItem}>
            <NajText style={advStyles.listTitle}>{item.title}</NajText>
            {item?.subtitle && (
              <NajText style={advStyles.listText}>{item.subtitle}</NajText>
            )}
          </View>

          <MaterialIcon name="arrow-forward" size={22} style={advStyles.icon} />
        </View>
      </RectButton>
    );
  }

  /*const handlePressAssignment = React.useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', `Link n??o suportado: ${url}`);
    }
  }, [url]);*/
  function handlePressAssignment() {
    setModalVisible(true);
  }

  function handleCloseTerms() {
    setModalVisible(false);
  }

  function getTerms() {
    const linkText = 'https://www.najsistemas.com.br/termosdeuso/termos_naj_desk_maio_2021.pdf';

    return (
      <Modal animationType="slide" visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <View style={{ padding: 15 }}>
            <NajText style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>AVISO LEGAL</NajText>
          </View>
          <View style={{ padding: 15, flex: 1, backgroundColor: 'rgba(0, 0, 0, .1)' }}>
            <ScrollView>
              <NajText style={{ paddingBottom: 10, }}>O USU??RIO possui o direito de acesso e utiliza????o do APLICATIVO NAJ DESK durante a vig??ncia do v??nculo existente com o prestador de servi??os (LICENCIADO) e nos termos e condi????es definidos pelo mesmo.</NajText>
              <NajText style={{ paddingBottom: 10, }}>Favor entrar em contato com o seu prestador de servi??os para obten????o do Login e da senha de acesso.</NajText>
              <NajText style={{ paddingBottom: 10, }}>A interrup????o do acesso do USU??RIO ao APLICATIVO NAJ DESK pode ocorrer na discricionariedade do prestador de servi??os (LICENCIADO).</NajText>
              <NajText style={{ paddingBottom: 10, }}>A NAJ SISTEMAS EM INFORM??TICA LTDA ME. informa que durante a utiliza????o do APLICATIVO NAJ DESK ser??o coletadas as seguintes informa????es: Caracter??sticas do dispositivo de acesso (marca, modelo e sistema operacional), informa????es do navegador, IP de acesso, tempo de navegabilidade, geolocaliza????o, data e hora de cada acesso, login e senha, acesso a utiliza????o da c??mara e microfone do dispositivo.</NajText>
              <NajText style={{ paddingBottom: 10, }}>
                Leia na ??ntegra em: <Autolink text={linkText} />
              </NajText>
              <NajText style={{ fontWeight: 'bold', marginTop: 15 }}>Contato do fabricante:</NajText>
              <NajText style={{ fontWeight: 'bold' }}>NAJ SISTEMAS EM INFORM??TICA LTDA ME.</NajText>
              <NajText style={{ fontWeight: 'bold' }}>suporte@najsistemas.com.br</NajText>
            </ScrollView>
          </View>
          <View style={{ padding: 15 }}>
            <NajButton inModal={true} onPress={handleCloseTerms}>Ok, Entendido</NajButton>
          </View>
        </View>
      </Modal>
    );
  }

  function handleNavigationMyInfos() {
    Alert.alert('handleNavigationMyInfos', '** n??o implementado');
  }

  /*function handleRenderLogoutButton() {
    return (
      <View>
        <NajButton onPress={handleSignOut}>Sair</NajButton>
      </View>
    );
  }*/

  React.useEffect(() => {
    let _data = [];

    /*_data.push({
      id: '1',
      icon: 'settings-cell',
      title: 'Dispositivos',
      subtitle: 'Listagem de todos os dispositivos',
      onPress: handleNavigationDeviceList,
    });
    _data.push({
      id: '2',
      //icon: 'account-box',
      icon: 'info',
      title: 'Minhas Informa????es',
      onPress: handleNavigationMyInfos,
    });*/
    _data.push({
      id: '3',
      icon: 'swap-horiz',
      title: 'Trocar de Advocacia',
      subtitle: 'Alternar entre prestador de servi??os',
      onPress: handleNavigateAdvChoice,
    });
    _data.push({
      id: '3',
      icon: 'assignment',
      title: 'Rever Termos',
      subtitle: 'Pol??tica de Privacidade e Termos de Uso',
      onPress: handlePressAssignment,
    });
    _data.push({
      id: '99',
      icon: 'exit-to-app',
      title: 'Sair do Aplicativo',
      onPress: handleSignOut,
    });

    setData(_data);
  }, []);

  return (
    <NajContainer style={advStyles.container}>
      {getTerms()}
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <View style={advStyles.listSeparator} />}
        renderItem={handleRenderItem}
      //ListFooterComponent={handleRenderLogoutButton}
      />
    </NajContainer>
  );
}
