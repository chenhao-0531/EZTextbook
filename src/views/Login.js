import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
 
import Icon from 'react-native-vector-icons/FontAwesome';
import ApiUtils from '../ApiUtils'

//import FbLoginButton from '../components/FbLoginButton';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMsg: ''
        };
    }

     login = () => {
        fetch('https://eztextbook.herokuapp.com/api/auth/login/local' , {
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
        })
        .then(ApiUtils.checkStatus)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            console.log("in login. login_token = " + responseJson.token);
            AsyncStorage.setItem('Login_Token', responseJson.token);

            this.props.navigator.push({id: "Home"});

        })
        .catch((error) => {
             //   this.setState({errMsg: 'ERROR: Incorrect Email or Password'});
                alert('ERROR: Incorrect Email or Password');
                console.log(error);
        })
        .done();

    }

	render() {
		return (
			<View style={styles.container}>
					<View style={styles.content}>
						<Text style={styles.logo}>Login To EZTextbook</Text>
						<Text style={styles.error}>{this.state.errMsg}</Text>
						<View style={styles.inputContainer}>
							<TextInput underlineColorAndroid='transparent' style={styles.input}
							    onChangeText={(email) => this.setState({email})}
								value={this.state.email} placeholder='email'>
							</TextInput>
							<TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
								onChangeText={(password) => this.setState({password})}
								value={this.state.password} placeholder='password'>
							</TextInput>
						</View>
						<TouchableOpacity
						    onPress={this.login}
						    style={styles.buttonContainer}>
							<Text style={styles.buttonText}>LOGIN</Text>
						</TouchableOpacity>
					</View>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'gold'
	},
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center',
	},
	content: {
		alignItems: 'center',
	},
	logo: {
		color: 'black',
		fontSize: 40,
		fontStyle: 'italic',
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputContainer: {
		margin: 20,
		marginBottom: 0,
		padding: 20,
		paddingBottom: 10,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
	input: {
		fontSize: 16,
		height: 40,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'rgba(255,255,255,1)'
	},
	buttonContainer: {
		alignSelf: 'stretch',
		margin: 20,
		padding: 20,
		backgroundColor: 'blue',
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: 'rgba(255,255,255,0.6)',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	error: {
	    fontSize: 20,
	    color: 'red'
	}

 
});
