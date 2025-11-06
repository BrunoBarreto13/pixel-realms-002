// Script para verificar e criar bucket de avatares
import { supabase } from '@/integrations/supabase/client';

export const ensureAvatarBucketExists = async () => {
  try {
    // Verificar se o bucket existe
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Erro ao listar buckets:', listError);
      return false;
    }

    const avatarBucketExists = buckets?.some(bucket => bucket.id === 'avatars');
    
    if (avatarBucketExists) {
      console.log('Bucket de avatares já existe');
      return true;
    }

    // Se não existe, tentar criar via API do Supabase
    console.log('Bucket de avatares não encontrado, tentando criar...');
    
    // Como não podemos criar buckets via client-side, vamos retornar false
    // e instruir o usuário a criar manualmente
    return false;
  } catch (error) {
    console.error('Erro ao verificar bucket:', error);
    return false;
  }
};

// Função temporária para upload sem bucket
export const uploadAvatarTemporarily = async (file: File, userId: string) => {
  // Criar uma URL temporária para a imagem
  const tempUrl = URL.createObjectURL(file);
  return tempUrl;
};