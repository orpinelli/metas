import { sql, QueryResultRow } from "@vercel/postgres";
import { useEffect, useState } from "react";

export default function Metas({
  params
}: {
  params?: { user?: string };
}): JSX.Element {
  const [rows, setRows] = useState<QueryResultRow[]>([]);

  useEffect(() => {
    if (params && params.user) {
      // Use uma expressão de função
      const fetchRows = async (user: string) => {
        try {
          const { rows } = await sql`SELECT * from CARTS where user_id=${user}`;
          setRows(rows);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      // Chame a função dentro do bloco
      fetchRows(params.user);
    }
  }, [params]);

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}
