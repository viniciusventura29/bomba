import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { delProduto } from "../utils/index"

export const ProductList = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.dataContainer}>
                <Text style={styles.dataHeader}>Name: </Text>
                <Text>{props.nome}</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.dataHeader}>Price: </Text>
                <Text>{props.valor}</Text>
            </View>
            <TouchableOpacity style={styles.botaoDeletar} onPress={async () => {
                await delProduto(props.produtoId);
                props.getNewProducts()
            }}>
                <Text style={styles.whiteText}>DELET</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '200px',
        backgroundColor: 'white'
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: '2px'
    },
    dataHeader: {
        fontWeight: 'bold'
    },
    botaoDeletar: {
        backgroundColor: 'red',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 4
    },
    whiteText: {
        color: 'white'
    }
})