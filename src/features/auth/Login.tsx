import { useState } from "react";
import Button from "../../components/Button";
import FormWrapper from "../../components/FormWrapper";
import InputField from "../../components/InputField";
import TabSwitcher from "../../components/TabSwitcher";
import PasswordInputField from "../../components/PasswordInputField";
import AuthFooter from "../../components/AuthFooter";
import TermsAndPrivacy from "../../components/TermsAndPrivacy";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Here you can call your API endpoint
  };

  return (
    <div>
      <FormWrapper title="CareerIQ" logoSrc="/public/logo.png">
        <h2 className="text-2xl font-bold font-inter text-black text-center mb-1">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Enter your credentials to access your account.
        </p>
        <TabSwitcher activeTab="Login" />
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
          forgotPasswordUrl="/forgot-password"
        />

        <Button type="submit">Login</Button>
        <AuthFooter
          promptText="Don't have an account?"
          actionText="Sign Up"
          actionLink="/signup"
        />
        <TermsAndPrivacy
         className="mt-3"
        />
      </FormWrapper>

    </div>
  );
}
