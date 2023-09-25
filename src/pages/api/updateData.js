import fs from 'fs/promises'
import path from 'path'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, metaId } = req.query

    const filePath = path.join(
      process.cwd(),
      'https://seusite.vercel.app/dados.json'
    ) // Caminho para o arquivo JSON

    try {
      const jsonData = JSON.parse(await fs.readFile(filePath, 'utf-8'))

      // Encontre o clube pelo id
      const clube = jsonData.find(c => c.id === Number(id))

      if (clube) {
        // Encontre a meta pelo metaId
        const meta = clube.metas.find(m => m.metaId === Number(metaId))

        if (meta) {
          // Atualize o campo chave da meta
          meta.chave = !meta.chave

          // Escreva o JSON atualizado de volta no arquivo
          await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))

          res.status(200).json(jsonData)
        } else {
          res.status(404).json({ message: 'Meta não encontrada' })
        }
      } else {
        res.status(404).json({ message: 'Clube não encontrado' })
      }
    } catch (error) {
      console.error('Erro ao atualizar o arquivo JSON:', error)
      res.status(500).json({ message: 'Erro interno do servidor' })
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
