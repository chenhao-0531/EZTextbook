import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import axios from 'axios';
import ApiUtils from '../ApiUtils.js';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      rating: "100",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      editable: false,
      autoFocus: false,
      update: "Update Profile",
      token: ""
    };
  }

  componentDidMount() {
    ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      axios.get('https://eztextbook.herokuapp.com/api/user/profile?', {
        params: {
        token: this.state.token
        }
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rating: response.data.rating,
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            email: response.data.local.email,
            mobile: response.data.phone
          })
          ApiUtils.setToken('userName', this.state.firstName + ' ' + this.state.lastName);
          ApiUtils.setToken('userId', response.data._id);
        }
      })
    })
  }

  updateField(fieldName, event) {
    if (fieldName == 'First Name') {
      this.setState({
        firstName: event
      })
    } else if (fieldName == 'Last Name') {
      this.setState({
        lastName: event
      })
    } else {
      this.setState({
        mobile: event
      })
    }
  }

  updateProfile() {
    if (this.state.update == "Update Profile") {
      this.setState({
        update: "Save Change",
        editable: true,
        autoFocus: true
      });
    } else {
      const url = 'https://eztextbook.herokuapp.com/api/user/profile/update?token=' + this.state.token;
      axios.post(url, {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        phone: this.state.mobile
      })
      .then(function(response){
        Alert.alert("Profile Updated");
      });
      this.setState({
        update: "Update Profile",
        editable: false,
        autoFocus: false
      });
    }
  }

  render() {

    return (
      <View style={styles.containerStyle}>
        <Image
          source={require('../../img/profile.jpg')}
          style={styles.imageStyle}
        />
        <Text style={styles.ratingStyle}>
          Rating: {this.state.rating}
        </Text>
        <Text style={styles.headingStyle}>
          General Information:
        </Text>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            First Name:
          </Text>
          <TextInput
            style={styles.generalInputStyle}
            defaultValue={this.state.firstName}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.updateField.bind(this, 'First Name')}
          />
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Last Name:
          </Text>
          <TextInput
            style={styles.generalInputStyle}
            defaultValue={this.state.lastName}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.updateField.bind(this, 'Last Name')}
          />
        </View>
        <Text style={styles.headingStyle}>
          Contact Information:
        </Text>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Email address:
          </Text>
          <TextInput
            style={styles.contactInputStyle}
            defaultValue={this.state.email}
            editable={false}
          />
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Mobile number:
          </Text>
          <TextInput
            style={styles.contactInputStyle}
            defaultValue={this.state.mobile}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.updateField.bind(this, 'Mobile')}
          />
        </View>
        <TouchableHighlight style={styles.button} onPress={this.updateProfile.bind(this)}>
          <Text style={styles.buttonText}>
            {this.state.update}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ () =>
          this.props.navigator.push({
            id: 'ViewPosts',
            props: {criteria: {wishlist: true}, navigator: this.props.navigator}
        })}>
          <Text style={styles.buttonText}>
            View Interests List
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ () =>
          this.props.navigator.push({
            id: 'ViewPosts',
            props: {criteria: {user: true}, navigator: this.props.navigator}
        })}>
          <Text style={styles.buttonText}>
            View My Posts
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 10
  },
  imageStyle: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: '#800080'
  },
  ratingStyle: {
    color: '#550080',
    fontWeight: '600',
    alignSelf: 'center'
  },
  headingStyle: {
    marginTop: 5,
    color: '#550080',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center'
  },
  cellStyle: {
    alignSelf: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    paddingRight: 30,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '800'
  },
  generalInputStyle: {
    marginTop: 5,
    fontWeight: '800',
    height: 35,
    width: 80
  },
  contactInputStyle: {
    marginTop: 5,
    fontWeight: '800',
    height: 35,
    width: 200,
  },
  button: {
    height: 35,
    width: 220,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
    alignSelf: 'center'
  }
});

export default Profile;
