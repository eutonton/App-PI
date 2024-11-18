import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useState } from 'react';


// Configuração do cliente axios com a URL base da API
const api = axios.create({
    baseURL: 'http://192.168.1.106:8080/api/users'
});

// Função para buscar os dados de um aluno específico pelo ID
export const fetchStudentById = async (id) => {
    try {
        const response = await api.get(`/student/${id}`); // Assume que o endpoint /student/{id} existe
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados do aluno:", error);
        throw error;
    }
};


export const fetchClass = async (id) => {


  try {
    // Fazendo a requisição para buscar todas as classes
    const response = await api.get(`http://192.168.1.106:8080/api/classes/getAllClasses`);
    
    // Filtrando para obter a classe específica pelo ID
    const filteredClass = response.data.find((classItem) => classItem.id === id);

    // Verificando se a classe foi encontrada
    if (!filteredClass) {
      throw new Error("Classe não encontrada.");
    }

    // Retornando as disciplinas associadas à classe
    return filteredClass.disciplines;
  } catch (error) {
    console.error("Erro ao buscar as disciplinas:", error);
    setError(error.message); // Armazenando o erro no estado
    throw error; // Repassando o erro para que o chamador possa tratá-lo
  }
};


  


export default api;
