import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TodoProvider } from "../context/TodoContext";

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    !auth?.ready ? (
      <>Loading...</>
    ) : (
      auth?.currentUser ? (
        <TodoProvider>
          <Component />
        </TodoProvider>
      ) : (
        <Navigate to="/login" />
      )
    )
  );
};

export default PrivateRoute;
