import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import { getXataClient } from "../../xata";


const ClubDetail: any = () => {
  const router = useRouter();
  const { id } = router.query;

  const [clube, setClube] = useState<any>([]);
  const [progressoMetas, setProgressoMetas] = useState<any>({});

  async function getClubDetails() {
    try {
      const xata = getXataClient();
      const records = await xata.db.clubes_metas
        .select([
          "id",
          "terminado",
          "meta.id",
          "meta.descricao",
          "clube.id",
          "clube.nome",
          "clube.data_fundacao",
        ])
        .filter({
          "clube.id": id as string,
        })
        .getAll();
        setClube(records);
    
    } catch (error) {
      console.error('Erro ao buscar detalhes do clube:', error);
      return null;
    }
  }


  async function PostClubMetas(metaId: any, terminado: boolean) {
    try {
      const xata = getXataClient();

         await xata.db.clubes_metas.update(metaId, {
          terminado: terminado,
        });
        await getClubDetails()
    } catch (error) {
      console.error('Erro ao buscar detalhes do clube:', error);
      return null;
    }
  }


  
  
  

  function contarTerminadosVerdadeiros(objetos: any) {
    let contador = 0;
    for (const objeto of objetos) {
        if (objeto.terminado === true) {
            contador++;
        }
    }
    return contador;
}

const quantidadeTrue = contarTerminadosVerdadeiros(clube);

  useEffect(() => {
    getClubDetails();

  }, []);


  if (!clube) {
    return <div>Clube não encontrado.</div>;
  }

  return (
    <div className={styles.Clubes}>
      <Link href="/">HOME</Link>
      <h1>Detalhes do Clube</h1>
      {
        clube.length > 0 && (
          <div>
            <p>Nome: {clube[0].clube.nome}</p>
            <p>Fundação: {clube[0].clube.data_fundacao}</p>
          </div>
        )
      }
      <h2>Metas CONCLUÍDAS: {quantidadeTrue} </h2>
      <h2>Metas</h2>
      <ul>
      {clube?.map((meta: any) => (
      <div className={styles.Clubes} key={`${clube.id}-${meta.id}`}     
      style={{
      margin: '24px'
      }}>
        <div className={styles.Warp}>
        <label
          style={{
            textDecoration: meta.terminado ? 'line-through' : 'none',
            color: meta.terminado ? 'red' : 'black',
            border: meta.terminado ? ' 1px solid red' : ' 1px solid #000',
            cursor: 'pointer'
          }}
          onClick={() => PostClubMetas( meta.id, !meta.terminado)}
          className={`${styles.title} ${styles['glow-on-hover']}`}
          
        >
         <input
         style={{
          cursor: 'pointer',
          marginRight: '4px'
        }}
            className={styles.input}
            type="checkbox"
            checked={meta.terminado}
          />
           {meta.meta.descricao}  
        </label>
    </div>
  </div>
))}
      </ul>
    </div>
  );
};

export default ClubDetail;
