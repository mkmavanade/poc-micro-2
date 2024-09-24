import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "home/Header";
import Footer from "home/Footer";
import axios from "axios";
const App = () => {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  const buscarCep = async (e) => {
    e.preventDefault();

    if (!cep) {
      setErro("Por favor, insira um CEP.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP inválido ou não encontrado.");
        setDados(null);
      } else {
        setDados(response.data);
        setErro("");
      }
    } catch (error) {
      console.log('error', error)
      setErro("Ocorreu um erro ao buscar o CEP.");
      setDados(null);
    }
  };


  return (
    <div className="text-3xl mx-auto flex flex-col items-center justify-between w-full h-screen ">
      <Header />

      <div class="text-center mt-2">
        <img
          src="https://avatars.githubusercontent.com/u/52221653?v=4"
          class="rounded-full w-16 mb-4 mx-auto"
          alt="Avatar"
        />
        <h5 class="text-xl font-medium leading-tight mb-2">Matheus Kuaye Muramoto</h5>
        <p class="text-gray-500">Desenvolvedor Frontend</p>
      </div>

      <div className="p-4 flex flex-col items-center mx-auto">
        <div className="flex gap-2 " >
          <div className="w-64">
            <h1 className="text-2xl font-bold ">Buscar CEP</h1>
            <form onSubmit={buscarCep} className="flex flex-col items-center">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite o CEP"
                className="text-sm border border-gray-300 p-2 mb-4 w-full rounded"
                maxLength={8}
              />
              <button type="submit" className="text-sm bg-blue-500 text-white px-4 py-2 rounded">
                Buscar
              </button>
            </form>

            {erro && <p className="text-sm text-red-500 mt-2 items-center text-center">{erro}</p>}
          </div>

          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-2xl">Endereço</h2>
              <input
                type="text"
                value={dados?.logradouro}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Rua"
                className="text-sm border border-gray-300 p-2 mb-4 w-full rounded text-ellipsis"
                disabled
              />
              <input
                type="text"
                value={dados?.bairro}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Bairro"
                className="text-sm border border-gray-300 p-2 mb-4 w-full rounded"
                disabled
              />
              <input
                type="text"
                value={dados?.localidade}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Cidade"
                className="text-sm border border-gray-300 p-2 mb-4 w-full rounded"
                disabled
              />
              <input
                type="text"
                value={dados?.uf}
                onChange={(e) => setCep(e.target.value)}
                placeholder="UF"
                className="text-sm border border-gray-300 p-2 mb-4 w-full rounded"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));