import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    space: {
        flex: 1,
    },
    title: {
        flex: 6,
        fontSize: 30,
        textAlign: 'center',
    },
    nextButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4a91e2',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    separator: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
    },
    smallText: {
        fontSize: 14,
        textAlign: 'left',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
        marginTop: 7,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        minWidth: 60,
        fontSize: 18,
        marginRight: 5,
        paddingVertical: 3,
        textAlign: 'right',

    },
    smallInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        minWidth: 30,
        fontSize: 14,
        marginRight: 7,
        paddingVertical: 0,
        textAlign: 'right',
    },
    wideInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        minWidth: 200,
        fontSize: 18,
        marginRight: 5,
        paddingVertical: 7,
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
      },
});

export default styles;