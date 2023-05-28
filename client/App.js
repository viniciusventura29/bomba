import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { useEffect, useState } from "react";
import axios from "axios";
const URL = "http://localhost:4000"

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")


  const fetchProdutos = async () => {
    const res = await axios.get(`${URL}/produtos`);
    console.log(res.data);
    setProdutos(res.data.produtos);
  }

  useEffect(() => {
    fetchProdutos();
  }, [])

  const delProduto = async (id) => {
    await axios.delete(`${URL}/deleta/` + id);
    fetchProdutos();
  }

  const addProduto = async () => {
    console.log("adding product: ", { nome: nome, valor: valor });
    const res = await axios.post(`${URL}/criar-produto`, { nome: nome, valor: valor });
    fetchProdutos();
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label={'Produto'}
          placeholder={'Digite o seu produto'}
          style={styles.inputPadrao}
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          label={'Valor'}
          placeholder={'Digite o valor do produto'}
          style={styles.inputPadrao}
          onChangeText={setValor}
          value={valor}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={async () => {
            await addProduto();
          }}>
          <Text>Adicionar</Text>
        </TouchableOpacity>
      {produtos.map((prod) => (
          <View >
            <View style={styles.bomba}><Text>{prod.nome} - {prod.valor}</Text></View>
            <TouchableOpacity style={styles.botaoDeletar} onPress={() => delProduto(prod.produtoId)}>
              <Text>Deletar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardProduto: {

  },
  botaoDeletar: {
    backgroundColor: "#00FFFF",
    width: "50",
    height: "50",
  },
  botaoAdicionar: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  inputPadrao: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  bomba: {
    color: "black"
  }
});
