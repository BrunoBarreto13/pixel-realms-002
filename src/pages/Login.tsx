import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 font-pixel text-xs">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Login Card */}
      <main className="relative z-10 w-full max-w-sm md:max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 text-outline">PIXEL REALMS</h1>
          <p className="text-sm text-gray-300 mt-2 text-outline">SUA AVENTURA AGUARDA</p>
        </div>
        <div className="bg-[#2f1b0c] p-6 md:p-8 border-4 border-[#6e4321] pixelated-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-[#e0a86a] mb-2" htmlFor="email">EMAIL</label>
              <input 
                className="w-full bg-[#1b1008] border-2 border-[#543219] text-[#f0c8a0] placeholder-[#a07850] p-3 focus:border-[#b86a32] focus:ring-0 pixelated-input" 
                id="email" 
                name="email" 
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-left text-[#e0a86a] mb-2" htmlFor="password">SENHA</label>
              <input 
                className="w-full bg-[#1b1008] border-2 border-[#543219] text-[#f0c8a0] placeholder-[#a07850] p-3 focus:border-[#b86a32] focus:ring-0 pixelated-input" 
                id="password" 
                name="password" 
                type="password" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              className="w-full bg-[#b86a32] text-white py-4 font-bold tracking-wider pixelated-button disabled:opacity-50" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ENTRANDO..." : "COMEÇAR AVENTURA"}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t-2 border-[#543219] border-dashed space-y-4">
            <Link to="/forgot-password" className="text-[#bba38a] hover:text-yellow-300 transition-colors duration-200">
              ESQUECEU A SENHA?
            </Link>
            <p className="text-[#bba38a]">
              NÃO TEM CONTA?{" "}
              <Link to="/register" className="text-yellow-400 hover:text-yellow-200 transition-colors duration-200 underline">
                CADASTRE-SE
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;