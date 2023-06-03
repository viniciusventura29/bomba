import axios from "axios";
import { URL } from "./index"

export const fetchProdutos = async () => {
    const res = await axios.get(`${URL}/produtos`);
    return res.data.produtos
}

export const addProduto = async (data) => {
    await axios.post(`${URL}/criar-produto`, data);
}

export const delProduto = async (id) => {
    await axios.delete(`${URL}/deleta/` + id);
}