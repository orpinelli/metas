import styles from '../../styles/Home.module.css'

import Link from 'next/link'
import data from '../../public/data.json'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { getXataClient } from "../xata";

const Home: NextPage = () => {


    useEffect(() => {
      async function fetchData() {
        
        try {
          const xata = getXataClient();
          const page = await xata.db.clubes.getAll();
          console.log(page)
          const metas = await xata.db.clubes_metas
            .select(["clube.nome","meta.descricao", "terminado"])
            .filter({
              "clube.id": "rec_ck9ne7megii89o7iap80",
            })
            .getAll();
          
          console.log(metas)
  
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
        {data.map((clube) => (
          <div key={clube.id} className={styles.Clubes}>
            <Link href={`/clubs/${clube.id}`}>
              <span className={styles.Clubes}>{clube.nome}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
