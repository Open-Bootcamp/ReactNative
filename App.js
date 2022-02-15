import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import { firebaseConfig } from './firebase-config';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
//navegaror entre pantallas
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Login(){
  //hooks userState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //Utilizamos Firebase y lo configuramos con el archivo externo
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () =>{
    //Crear una cuenta
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredencial) => {
      console.log('Account created!!');
      const user = userCredencial.user;
      console.log(user);
    }).catch(error =>{
      console.log(error);
      Alert.alert(error.message);
    })

  }
  
  const navigation = useNavigation();

  const handleSignIn = () =>{
    //Iniciar sesion
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }



  return(
    <View>
       <View>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
          <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="ramiro@prueba.com" />
        </View>
        <View>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
          <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
        </View>
          <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFDB90'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#1792F090'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Create Account</Text>
          </TouchableOpacity>
    </View>
  )
}

function Home(){

  return(
    <View>
      <Text>Bienvenido a tu perfil</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 350,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    backgroundColor:'#fff',
    borderWidth: 1,
  }
})

