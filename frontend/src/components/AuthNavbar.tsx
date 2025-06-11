import AuthNavBtn from "./AuthNavBtn";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function AuthNavbar() {
  const auth = useContext(AuthContext);
  const token = auth?.token;
  const logout = auth?.logout;

  return (
    <nav className="mx-8 flex justify-around">
      {!token && <AuthNavBtn>Sign up</AuthNavBtn>}
      {!token && <AuthNavBtn>Sign in</AuthNavBtn>}
      {token && (
        <button
          className="h-8 w-24 rounded-full bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 md:h-12 md:w-32 md:text-lg lg:h-16 lg:w-40 lg:text-xl"
          onClick={logout}
        >
          Log out
        </button>
      )}
    </nav>
  );
}

export default AuthNavbar;
