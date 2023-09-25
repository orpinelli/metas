import React, { useState, useEffect } from 'react'

export default function Metas() {
  const [jsonValue, setJsonValue] = useState({ chave: true })

  const fetchData = async () => {
    try {
      const response = await fetch('/data.json') // Caminho para o arquivo JSON
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do JSON')
      }
      const data = await response.json()
      setJsonValue(data)
    } catch (error) {
      console.error('Erro ao buscar dados do JSON:', error)
    }
  }

  const toggleJsonValue = async () => {
    try {
      const newData = { chave: !jsonValue.chave }

      const response = await fetch('/api/updateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar o JSON')
      }

      setJsonValue(newData)
    } catch (error) {
      console.error('Erro ao atualizar o JSON:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <div>
        <p>Valor Atual: {jsonValue.chave ? 'Ativo' : 'Inativo'}</p>
        <button onClick={toggleJsonValue}>Toggle</button>
      </div>
    </main>
  )
}
