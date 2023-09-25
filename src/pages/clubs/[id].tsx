import { useRouter } from 'next/router';
import data from '../../../public/data.json';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

interface Meta {
  metaId: number;
  title?: string;
  texto: string;
  chave: boolean;
}

interface Clube {
  id: number;
  nome: string;
  fundacao: string;
  metas: Meta[];
  href: string;
}

interface ProgressoMetas {
  [key: string]: boolean;
}

const ClubDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const clube: Clube | undefined = data?.find((c) => c.id === Number(id));

  const [progressoMetas, setProgressoMetas] = useState<ProgressoMetas>({});

  const [metasComTrue, setMetasComTrue] = useState<number>(0);

  useEffect(() => {
    const count: number | undefined = clube?.metas.filter((meta) => meta.chave === true).length;

    if (count !== undefined) {
      setMetasComTrue(count);
    }
  }, [clube]);

  const handleCheckboxChange = async (metaId: number) => {
    try {
      const response = await fetch(`/api/updateData?id=${clube?.id}&metaId=${metaId}`, {
        method: 'POST',
      });

      if (response.ok) {
        setProgressoMetas((prevState: ProgressoMetas) => ({
          ...prevState,
          [`${clube?.id}-${metaId}`]: !prevState[`${clube?.id}-${metaId}`],
        }));
      } 
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  useEffect(() => {
    const progresso: ProgressoMetas = {};
    clube?.metas.forEach((meta) => {
      progresso[`${clube?.id}-${meta?.metaId}`] = meta?.chave;
    });
    setProgressoMetas(progresso);
  }, [clube]);

  if (!clube) {
    return <div>Clube não encontrado.</div>;
  }

  return (
    <div className={styles.Clubes}>
      <Link href="/">HOME</Link>
      <h1>Detalhes do Clube</h1>
      <p>Nome: {clube.nome}</p>
      <p>Fundação: {clube.fundacao}</p>
      <h2>Metas CONCLUIDAS: {metasComTrue}</h2>
      <h2>Metas</h2>
      <ul>
        {clube.metas.map((meta) => (
          <div className={styles.Clubes} key={meta.metaId}>
            <div className={styles.Warp}>
              <input
                className={styles.input}
                type="checkbox"
                checked={progressoMetas[`${clube.id}-${meta.metaId}`]}
                onChange={() => handleCheckboxChange(meta.metaId)}
              />
              <span
                style={{
                  textDecoration: progressoMetas[`${clube.id}-${meta.metaId}`] ? 'line-through' : 'none',
                  color: progressoMetas[`${clube.id}-${meta.metaId}`] ? 'red' : 'black',
                }}
                className={styles.title}
              >
                {meta?.title}
              </span>
              <span
                style={{
                  textDecoration: progressoMetas[`${clube.id}-${meta.metaId}`] ? 'line-through' : 'none',
                  color: progressoMetas[`${clube.id}-${meta.metaId}`] ? 'red' : 'black',
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: meta.texto }} />
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ClubDetail;
