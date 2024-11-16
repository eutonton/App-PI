import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const AuthContext = createContext();

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente que fornece o contexto para seus filhos
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    console.log("Usuário salvo no contexto:", userData);
  };

  const logout = () => {
    setUser(null);
    console.log("Usuário removido do contexto");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
