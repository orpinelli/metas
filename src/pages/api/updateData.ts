// /api/updateData.ts
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'https://metas-roan.vercel.app/data.json');

// Defina a estrutura esperada do JSON
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

let jsonData: Clube[] = [];
// Carregue os dados JSON em memória quando o servidor Next.js for iniciado
async function loadJsonData() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    jsonData = JSON.parse(fileContent)
  } catch (error) {
    console.error('Erro ao carregar os dados JSON:', error)
  }
}

loadJsonData()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, metaId } = req.query

    // Encontre o clube pelo id
    const clube = jsonData.find(c => c.id === Number(id))

    if (clube) {
      // Encontre a meta pelo metaId
      const meta = clube.metas.find(m => m.metaId === Number(metaId))

      if (meta) {
        // Atualize o campo chave da meta
        meta.chave = !meta.chave

        // Escreva o JSON atualizado de volta no arquivo na pasta public
        try {
          await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))
        } catch (error) {
          console.error('Erro ao atualizar o arquivo JSON:', error)
          res.status(500).json({ message: 'Erro interno do servidor' })
          return
        }

        res.status(200).json(jsonData)
      } else {
        res.status(404).json({ message: 'Meta não encontrada' })
      }
    } else {
      res.status(404).json({ message: 'Clube não encontrado' })
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
