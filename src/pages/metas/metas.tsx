import { sql } from "@vercel/postgres";

async function minhaFuncao() {
  const likes = 100;

  try {
    const { rows } = await sql`SELECT * FROM posts WHERE likes > ${likes}`;
    // Processar os resultados aqui
    console.log(rows);
  } catch (error) {
    // Lidar com erros
    console.error("Erro ao executar a consulta:", error);
  }
}

minhaFuncao();
