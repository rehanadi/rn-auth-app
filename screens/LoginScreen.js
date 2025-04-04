import { useContext, useState } from "react";
import AuthContent from '../components/Auth/AuthContent';
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true);
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later.',
      );
      // only execute this in catch, it'll prevent error when switching screens
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
