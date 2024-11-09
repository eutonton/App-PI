import axios from 'axios';

// Configuração do cliente axios com a URL base da API
const api = axios.create({
    baseURL: 'http://localhost:8080/api/users'
});

// Função para buscar todos os estudantes
export const fetchAllStudents = async () => {
    try {
        const response = await api.get('/allStudents');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados dos estudantes:", error);
        throw error;
    }
};

export default api;
