// pages/index.tsx
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getXataClient } from "../xata";

interface Clube {
  id: string;
  nome: string;
  data_fundacao: string;
}

const Home: NextPage = () => {
  const [clubes, setClubes] = useState<Clube[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const xata = getXataClient();
        const clubesData = await xata.db.clubes.getAll();

        const clubesTransformados: Clube[] = clubesData.map((item) => ({
          id: item.id,
          nome: item.nome || "",
          data_fundacao: item.data_fundacao || "",
        }));

        setClubes(clubesTransformados);
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Clubes}>
      <h1>Lista de Clubes</h1>
      <div>
        {clubes.map((clube) => (
          <div key={clube.id} className={styles.Clubes}>
            <Link href={`/clubs/${clube.id}`}>
              <span className={styles.Clubes}>{clube.nome}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
