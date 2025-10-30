import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelCard } from "@/components/PixelCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import loginBg from "@/assets/login-bg.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar autenticação real
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8 items-center">
        {/* Title */}
        <div className="text-center animate-pixel-float">
          <h1 className="font-pixel text-3xl md:text-4xl text-primary pixel-text-shadow mb-2 pixel-glow">
            PIXEL REALMS
          </h1>
          <p className="font-pixel text-xs text-secondary pixel-text-shadow animate-pixel-pulse">
            Sua Aventura Aguarda
          </p>
        </div>

        {/* Login Form */}
        <PixelCard className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <PixelInput
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PixelInput
              label="Senha"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <PixelButton type="submit" variant="default" className="w-full">
              COMEÇAR AVENTURA
            </PixelButton>
          </form>

          {/* Additional Links */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <Link 
              to="/forgot-password" 
              className="font-pixel text-xs text-muted-foreground hover:text-accent transition-colors underline"
            >
              Esqueceu a senha?
            </Link>
            <p className="font-pixel text-xs text-muted-foreground text-center">
              Não tem conta?{" "}
              <Link to="/register" className="text-primary hover:text-accent transition-colors underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default Login;
