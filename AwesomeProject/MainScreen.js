import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

class MainScreen extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Button
                    title="근태 관리"
                    onPress={() => navigation.navigate('ManageAttendance')}
                />
                <Button
                    title="사업장 관리"
                    onPress={() => navigation.navigate('ManageBusiness')}
                />
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

export default MainScreen;