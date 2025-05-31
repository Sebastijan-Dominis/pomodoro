import AuthNavBtn from "./AuthNavBtn";

function AuthNavbar() {
  return (
    <nav className="mx-8 flex justify-around">
      <AuthNavBtn>Sign up</AuthNavBtn>
      <AuthNavBtn>Log in</AuthNavBtn>
    </nav>
  );
}

export default AuthNavbar;
