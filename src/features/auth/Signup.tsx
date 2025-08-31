import FormWrapper from "../../components/FormWrapper";
import TabSwitcher from "../../components/TabSwitcher";
import InputField from "../../components/InputField";
import { useState } from "react";
import PasswordInputField from "../../components/PasswordInputField";
import Button from "../../components/Button";
import AuthFooter from "../../components/AuthFooter";
import TermsAndPrivacy from "../../components/TermsAndPrivacy";
import DividerWithText from "../../components/DividerWithText";
import GoogleSignInButton from "../../components/GoogleSignInButton";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMITTED ✅");
    console.log({ email, password, name });
  };
  return (
    <div>
      <FormWrapper title="CareerIQ" logoSrc="/public/logo.png">
        <h2 className="text-2xl font-bold font-inter text-black text-center mb-1">
          Welcome to CareerIQ
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Create Your Account.
        </p>
        <TabSwitcher activeTab="Sign Up" />
        <form onSubmit={handleSubmit} >
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <PasswordInputField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showForgotPassword={false}   // ✅ hides the link
          />
          <Button type="submit">SignUp</Button>
        </form>
         <DividerWithText text="Or" />
         <GoogleSignInButton onClick={() => console.log("Google Sign-In clicked")} />

        <AuthFooter
          promptText="Have an account?"
          actionText="Sign in"
          actionLink="/login"
        />
        <TermsAndPrivacy className="mt-3" />   
      </FormWrapper>


    </div>
  );
}
