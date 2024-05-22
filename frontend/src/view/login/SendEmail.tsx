import {View, Text, StyleSheet} from 'react-native';

const SendEmail=()=>{
    const styles = StyleSheet.create({ 
        title: {
            // justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingTop: '20%'
        }
      });
    return (
        <View style={styles.title}>
            <Text>確認メールを送信しました。本文に記載されているURLにアクセスした後、アプリを再起動してください。</Text>
        </View>
    )
};
export default SendEmail;