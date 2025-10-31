import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelCard } from "@/components/PixelCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar recuperação de senha real
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8 items-center">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-pixel text-2xl md:text-3xl text-primary brand-text-shadow mb-2">
            RECUPERAR SENHA
          </h1>
          <p className="font-pixel text-xs text-secondary brand-text-shadow">
            {submitted ? "Verifique seu email" : "Digite seu email"}
          </p>
        </div>

        <PixelCard className="w-full">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <p className="font-pixel text-xs text-muted-foreground text-center leading-relaxed">
                Enviaremos um link de recuperação para o seu email cadastrado.
              </p>

              <PixelInput
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PixelButton type="submit" variant="default" className="w-full">
                ENVIAR LINK
              </PixelButton>
            </form>
          ) : (
            <div className="flex flex-col gap-6 text-center">
              <p className="font-pixel text-xs text-foreground leading-relaxed">
                Um link de recuperação foi enviado para {email}
              </p>
              <PixelButton
                variant="default"
                onClick={() => navigate("/login")}
                className="w-full"
              >
                VOLTAR AO LOGIN
              </PixelButton>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="font-pixel text-xs text-muted-foreground hover:text-accent transition-colors underline"
            >
              Voltar ao login
            </Link>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default ForgotPassword;