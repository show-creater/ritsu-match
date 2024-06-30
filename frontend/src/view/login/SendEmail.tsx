import { View, Text, StyleSheet } from 'react-native';

const SendEmail = () => {
    const styles = StyleSheet.create({
        title: {
            // justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingTop: '30%',
            justifyContent: 'center',
        },

    });
    return (
        <View style={styles.title}>
            <View style={styles.message}>
                <Text>確認メールを送信しました。</Text>
                <Text>確認リンクにアクセスした後、アプリを再起動してください。</Text>
            </View>
        </View>
    )
};
export default SendEmail;