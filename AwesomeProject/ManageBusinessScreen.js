import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import ManageBusiness from './ManageBusiness';

class ManageBusinessScreen extends Component {
    constructor() {
        super();
        this.manageBusiness = new ManageBusiness();
        this.state = {
            latitude: '',
            longitude: '',
            name: '',
        };
    }

    addBusiness = async () => {
        const { latitude, longitude, name } = this.state;

        if (latitude && longitude && name) {
            // Perform add business action using ManageBusiness module
            // For example, call a function from ManageBusiness module
        }
    };

    render() {
        const { latitude, longitude, name } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="위도"
                    onChangeText={text => this.setState({ latitude: text })}
                    value={latitude}
                />
                <TextInput
                    placeholder="경도"
                    onChangeText={text => this.setState({ longitude: text })}
                    value={longitude}
                />
                <TextInput
                    placeholder="사업장 이름"
                    onChangeText={text => this.setState({ name: text })}
                    value={name}
                />
                <Button title="사업장 추가" onPress={this.addBusiness} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManageBusinessScreen;