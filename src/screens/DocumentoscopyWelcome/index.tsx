import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {style} from './styles';
import close from '../../assets/images/close.png';
import {getAppkey} from '../../data/getAppkey';
import id from '../../assets/icons/id.png';
import {startDocumentoscopy} from '@oiti/documentoscopy-react-native';

interface Props {
  document?: string;
}

export const DocumentoscopyWelcome: React.FC<Props> = ({
  document = '54544874491',
}) => {
  const [appkey, setAppkey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        setAppkey((await getAppkey(document)) as string);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [document]);

  const handleButton = () =>
    startDocumentoscopy(appkey).then(result => console.log(result));

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={style.header}>
        <TouchableOpacity>
          <Image source={close} />
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <View style={style.contentWrapper}>
          <Text style={style.title}>Hora de mandar seus documentos</Text>
          <Text style={style.subtitle}>
            Precisamos que você envie uma foto do seus documentos para você
            ficar seguro com relacao as sua foto.
          </Text>
        </View>
        <Image source={id} style={{width: 200, height: 200}} />
        <TouchableOpacity onPress={handleButton} style={style.button}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={style.buttonText}>Vamos lá</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
