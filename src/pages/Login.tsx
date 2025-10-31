import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelCard } from "@/components/PixelCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import loginBg from "@/assets/castle-dragon-login.png";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message === "Invalid login credentials"
          ? "Email ou senha incorretos"
          : error.message,
      });
    } else {
      navigate("/dashboard");
    }

    setIsSubmitting(false);
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
          <h1 className="font-pixel text-3xl md:text-4xl text-brand-yellow brand-text-shadow mb-2 brand-glow">
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

            <PixelButton 
              type="submit" 
              variant="default" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ENTRANDO..." : "COMEÇAR AVENTURA"}
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