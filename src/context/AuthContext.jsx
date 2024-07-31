import React from "react";

export const AuthContext = React.createContext();

export const useAuthContext = () => React.useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isAdmin: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
