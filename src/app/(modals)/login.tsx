import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/src/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/src/constants/Styles';
import Colors from '@/src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy{
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_github',
}

const Login = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'});
  const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'});
  const {startOAuthFlow: githubAuth} = useOAuth({strategy: 'oauth_github'});

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: githubAuth,
    }[strategy]
    try {
      const {createdSessionId, setActive} = await selectedAuth();
      console.log('SessionId:',createdSessionId)

      if (createdSessionId) {
        setActive!({session: createdSessionId});
        router.back();
    }
  } catch (error) {
    console.error('OAuth error:',error);
  }
};

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom: 30}]} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View
        style={{
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
        />
        <Text style={styles.separator}>or</Text>
        <View
        style={{
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
        />
      </View>
        <View style={{gap:20}}>
        <TouchableOpacity style={styles.btnOutline} onPress={() =>router.back()}>
        <Ionicons name='call' size={24} style={defaultStyles.btnIcon}/>
        <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
        <Ionicons name='logo-apple' size={24} style={defaultStyles.btnIcon}/>
        <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
        <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon}/>
        <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
        <Ionicons name='logo-facebook' size={24} style={defaultStyles.btnIcon}/>
        <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26
  },
  separatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30
  },
  separator: {
    fontFamily: 'mob-sb',
    color: Colors.grey,
    fontSize: 16
  },
  btnOutline:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  btnOutlineText: {
    color: '#000',
    fontFamily: 'mon-sb',
    fontSize: 16
  }
})
export default Login

