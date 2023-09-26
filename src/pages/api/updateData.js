// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, metaId } = req.query

    const apiUrl = '/data.json' // URL pública para o arquivo JSON na pasta "public"

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(
          `Falha ao buscar dados do arquivo JSON: ${response.statusText}`
        )
      }

      const jsonData = await response.json()

      // Encontre o clube pelo id
      const clube = jsonData.find(c => c.id === Number(id))

      if (clube) {
        // Encontre a meta pelo metaId
        const meta = clube.metas.find(m => m.metaId === Number(metaId))

        if (meta) {
          // Atualize o campo chave da meta
          meta.chave = !meta.chave

          // Escreva o JSON atualizado de volta no arquivo
          const writeFileResponse = await fetch(apiUrl, {
            method: 'PUT', // Use 'PUT' ou 'PATCH' para atualizar os dados
            body: JSON.stringify(jsonData),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (!writeFileResponse.ok) {
            throw new Error(
              `Falha ao atualizar o arquivo JSON: ${writeFileResponse.statusText}`
            )
          }

          res.status(200).json(jsonData)
        } else {
          res.status(404).json({ message: 'Meta não encontrada' })
        }
      } else {
        res.status(404).json({ message: 'Clube não encontrado' })
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados do arquivo JSON:', error)
      res.status(500).json({ message: 'Erro interno do servidor' })
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
