import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelPanel } from "@/components/PixelPanel";
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8 items-center">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-pixel text-4xl md:text-5xl text-[#ffce08] pixel-text-shadow mb-2">
            PIXEL REALMS
          </h1>
          <p className="font-pixel text-sm text-white pixel-text-shadow">
            SUA AVENTURA AGUARDA
          </p>
        </div>

        <PixelPanel className="w-full">
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

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="font-pixel text-xs text-muted-foreground">
              Não tem conta?{" "}
              <Link to="/register" className="text-primary hover:text-accent transition-colors underline">
                Cadastre-se
              </Link>
            </p>
            <p className="font-pixel text-xs text-muted-foreground">
              <Link to="/forgot-password" className="hover:text-accent transition-colors underline">
                Esqueceu a senha?
              </Link>
            </p>
          </div>
        </PixelPanel>
      </div>
    </div>
  );
};

export default Login;