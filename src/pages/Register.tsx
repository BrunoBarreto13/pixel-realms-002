import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelPanel } from "@/components/PixelPanel";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import loginBg from "@/assets/castle-dragon-dark.png";

type UserType = "player" | "master" | null;

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<UserType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    characterOrCampaign: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem!",
      });
      return;
    }

    if (!userType) return;

    setIsSubmitting(true);

    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.name,
      userType,
      formData.characterOrCampaign
    );

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message === "User already registered"
          ? "Este email já está cadastrado"
          : error.message,
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: "Conta criada!",
        description: "Você será redirecionado automaticamente.",
      });
      // Navigation happens automatically via useEffect when user state updates
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8 items-center">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-pixel text-3xl md:text-4xl text-[#FDE306] pixel-text-shadow-black mb-2">
            CADASTRO
          </h1>
          <p className="font-pixel text-xs text-white pixel-text-shadow-black">
            Escolha seu papel
          </p>
        </div>

        <PixelPanel className="w-full">
          {!userType ? (
            /* User Type Selection */
            <div className="flex flex-col gap-4">
              <p className="font-pixel text-xs text-center text-foreground mb-4">
                Você é um Mestre ou Jogador?
              </p>
              <PixelButton
                variant="default"
                onClick={() => setUserType("master")}
                className="w-full"
              >
                MESTRE
              </PixelButton>
              <PixelButton
                variant="secondary"
                onClick={() => setUserType("player")}
                className="w-full"
              >
                JOGADOR
              </PixelButton>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <PixelInput
                label={userType === "master" ? "Nome do Mestre" : "Nome do Jogador"}
                type="text"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                label={userType === "master" ? "Nome da Campanha" : "Nome do Personagem"}
                type="text"
                name="characterOrCampaign"
                placeholder={userType === "master" ? "Nome da sua campanha" : "Nome do seu personagem"}
                value={formData.characterOrCampaign}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                label="Email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                label="Senha"
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                label="Repetir Senha"
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />

              <div className="flex gap-4">
                <PixelButton
                  type="button"
                  variant="outline"
                  onClick={() => setUserType(null)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  VOLTAR
                </PixelButton>
                <PixelButton 
                  type="submit" 
                  variant="default" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "CRIANDO..." : "CRIAR CONTA"}
                </PixelButton>
              </div>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="font-pixel text-xs text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="text-[#4789c7] hover:text-[#6a9fd7] transition-colors pixel-text-shadow-blue">
                Entrar
              </Link>
            </p>
          </div>
        </PixelPanel>
      </div>
    </div>
  );
};

export default Register;