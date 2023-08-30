import React from 'react';
import { Button } from '@rneui/themed';

const CustomButton = ({ title, onPress, type }) => {
  let buttonStyle;
  let titleStyle;
  let containerStyle;

  switch(type) {
    case 'login':
      buttonStyle = {
        backgroundColor:  'rgba(90, 154, 230, 1)',
        borderRadius: 5,
      };
      titleStyle = { fontWeight: 'bold', fontSize: 23 };
      containerStyle = {
        marginHorizontal:50,
        height:50,
        width:200,
        marginVertical:10
       };
     break;

    case 'next':
      buttonStyle = {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 5,
        marginTop:0,
        width:'100%',
      };
      titleStyle = {fontSize : 15 };
      containerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
       };
    break;

    default:
     break;
   }

   return (
     <Button
       title={title}
       buttonStyle={buttonStyle}
       titleStyle={titleStyle}
       containerStyle={containerStyle}
       onPress={onPress}
     />
   );
};

export default CustomButton;
