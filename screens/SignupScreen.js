import { useContext, useState } from "react";
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your credentials or try again later.',
      );
      // only execute this in catch, it'll prevent error when switching screens
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <AuthContent
      onAuthenticate={signupHandler}
    />
  );
}

export default SignupScreen;
