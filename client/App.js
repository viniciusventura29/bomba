import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")

  const URL = "http://localhost:4000"

  useEffect(() => {
    axios.get(`${URL}/produtos`).then((response) => {
      console.log(response.data)
      setProdutos(response.data)
    })
  })

  const delProduto = (id) => {
    axios.delete(`${URL}/deleta/` + id).then((response) => {
      console.log(response)
    })
  }

  const addProduto = () => {
    axios.post(`${URL}/criar-produto`, { nome: nome, valor: valor }).then((res) => console.log(res))
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label={'Produto'}
          placeholder={'Digite o seu produto'}
          style={styles.inputPadrao}
          onChangeText={setNome}
        />
        <TextInput
          label={'Valor'}
          placeholder={'Digite o valor do produto'}
          style={styles.inputPadrao}
          onChangeText={setValor}
        />
        <Button style={styles.botaoAdicionar} onPress={() => { addProduto() }}>
          <Text>Adicionar</Text>
        </Button>
      </View>

      {
        produtos.map((prod) => {
          <View >
            <View style={styles.bomba}>{prod.nome} - {prod.valor}</View>
            <TouchableOpacity style={styles.botaoDeletar} onPress={delProduto(prod.id)}>
              Deletar
            </TouchableOpacity>
          </View>
        })
      }
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
    backgroundColor: "#000"
  }
});
