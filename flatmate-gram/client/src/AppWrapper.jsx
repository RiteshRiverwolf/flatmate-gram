import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import App from "./App";

function AppWrapper() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <App />;
}

export default AppWrapper;