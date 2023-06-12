import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
import { ProductList } from "./components/productsList";
import { addProduto, fetchProdutos } from "./utils/index";

export default function App() {
  const [produtos, setProdutos] = useState();
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  const returnData = async () => {
    setProdutos(await fetchProdutos());
  };

  useEffect(() => {
    returnData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        To do list
        <TextInput
          label={"Produto"}
          placeholder={"Nome do produto..."}
          style={styles.inputPadrao}
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          label={"Valor"}
          placeholder={"Preço do produto..."}
          style={styles.inputPadrao}
          onChangeText={setValor}
          value={valor}
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={async () => {
            await addProduto({ nome: nome, valor: valor });
            returnData();
          }}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <MapView style={styles.mapView} />
      <View style={styles.productList}>
        {produtos &&
          produtos.map((item, index) => (
            <ProductList
              nome={item.nome}
              valor={item.valor}
              produtoId={item.produtoId}
              getNewProducts={returnData}
              key={index}
            />
          ))}
      </View>
      Vinicius Ventura de Andrade
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAdicionar: {
    backgroundColor: "#00a2ff",
    padding: 10,
    textAlign: "center",
  },
  inputPadrao: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#0073b5",
  },
  productList: {
    marginTop: "10px",
    gap: "20px",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
