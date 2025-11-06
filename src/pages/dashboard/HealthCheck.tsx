import { useEffect, useState } from 'react';
import PagePanel from '@/components/PagePanel';
import { runSupabaseHealthCheck } from '@/integrations/supabase/health-check';

interface Result {
  tables: {
    characters: { name: string; exists: boolean; rls_ok: boolean; error?: string };
    profiles: { name: string; exists: boolean; rls_ok: boolean; error?: string };
    user_roles: { name: string; exists: boolean; rls_ok: boolean; error?: string };
  };
  storage: { bucket: string; exists: boolean };
  env: { url: string; keyPresent: boolean };
}

const HealthCheck = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await runSupabaseHealthCheck();
      setResult(res as Result);
      setLoading(false);
    })();
  }, []);

  return (
    <PagePanel title="Verificação de Integração">
      {loading ? (
        <p className="font-pixel text-sm">Verificando Supabase...</p>
      ) : result ? (
        <div className="space-y-4 font-pixel text-xs">
          <div>
            <p>URL: <code>{result.env.url}</code></p>
            <p>Chave pública presente: {result.env.keyPresent ? 'Sim' : 'Não'}</p>
          </div>
          <div className="space-y-2">
            <p className="uppercase">Tabelas</p>
            {Object.values(result.tables).map((t) => (
              <div key={t.name} className="border-2 p-2 rounded-lg">
                <p><strong>{t.name}</strong></p>
                <p>Existe: {t.exists ? 'Sim' : 'Não'}</p>
                <p>SELECT permitido (RLS): {t.rls_ok ? 'Sim' : 'Não'}</p>
                {t.error && <p className="text-red-600">Erro: {t.error}</p>}
              </div>
            ))}
          </div>
          <div>
            <p className="uppercase">Storage</p>
            <p>Bucket avatars existe: {result.storage.exists ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      ) : (
        <p className="font-pixel text-sm text-red-600">Falha ao obter resultados.</p>
      )}
    </PagePanel>
  );
};

export default HealthCheck;