import axios from 'axios';

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

export default api;
