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
import take from '../../assets/icons/take.png';
import {getAppkey} from '../../data/getAppkey';
import {
  startLiveness3d,
  resultFaceCaptcha,
} from '@oiti/liveness3d-react-native';
import {postAppKey} from '../../data/postAppKey';

interface Props {
  document?: string;
}

export const LivenessWelcome: React.FC<Props> = ({
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

  async function getResultFace(appKey: string) {
    try {
      console.log(appKey);
      const resultLiveness3D = await resultFaceCaptcha(appKey);
      console.log(resultLiveness3D);
      if (resultLiveness3D) {
        await postAppKey({appkey: appkey, document: document});
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleButton = () =>
    startLiveness3d(appkey as string).then(
      result => result && getResultFace(appkey),
      error => {
        console.log(error);
      },
    );

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
          <Text style={style.title}>Hora de se arrumar para a foto</Text>
          <Text style={style.subtitle}>
            Precisamos que você envie uma foto do seu rosto e uma do seu
            documento para que ninguém se passe por você.
          </Text>
        </View>
        <Image source={take} />
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
