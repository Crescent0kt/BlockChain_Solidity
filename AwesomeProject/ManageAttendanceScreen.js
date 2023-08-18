import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GeolocationService from './GeolocationService';

class ManageAttendanceScreen extends Component {
    constructor() {
        super();
        this.geolocationService = new GeolocationService();
        this.state = {
            currentPosition: null,
            isWorking: false,
        };
    }

    async componentDidMount() {
        const isAuthorized = await this.geolocationService.requestAuthorization();

        if (isAuthorized) {
            this.getCurrentPosition();
        }
    }

    getCurrentPosition = async () => {
        try {
            const currentPosition = await this.geolocationService.getCurrentPosition();
            this.setState({ currentPosition });
        } catch (error) {
            console.error('Error getting current position:', error);
        }
    };

    startWorking = async () => {
        const { currentPosition } = this.state;

        if (currentPosition) {
            // Perform start working action using ManageAttendance module
            // For example, call a function from ManageAttendance module
            this.setState({ isWorking: true });
        }
    };

    endWorking = async () => {
        const { currentPosition } = this.state;

        if (currentPosition) {
            // Perform end working action using ManageAttendance module
            // For example, call a function from ManageAttendance module
            this.setState({ isWorking: false });
        }
    };

    render() {
        const { currentPosition, isWorking } = this.state;

        return (
            <View style={styles.container}>
                <Button title="출근" onPress={this.startWorking} />
                <Button title="퇴근" onPress={this.endWorking} />
                {currentPosition && (
                    <Text>
                        Latitude: {currentPosition.latitude}, Longitude: {currentPosition.longitude}
                    </Text>
                )}
                {isWorking ? (
                    <Text>근무 중</Text>
                ) : (
                    <Text>휴식 중</Text>
                )}
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

export default ManageAttendanceScreen;