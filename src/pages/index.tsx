import styles from '../../styles/Home.module.css'

import Link from 'next/link'
import data from '../../public/data.json'
import { NextPage } from 'next'

const Home: NextPage = () => {
  const jsonData = {
    id: 1,
    nome: 'Rotaract Club de Aguaí',
    isActive: true // Valor inicial da chave
  }

  const updateJson = (updatedData: any) => {
    // Esta função será chamada para atualizar o JSON
    console.log('JSON atualizado:', updatedData)
    // Aqui você pode fazer uma solicitação para atualizar o JSON no servidor, se necessário
  }
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
