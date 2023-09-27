// Generated with CLI
import { getXataClient } from "./xata";

const xata = getXataClient();

const page = await xata.db.clubes
  .select(["id", "nome", "data_fundacao"])
  .getPaginated({
    pagination: {
      size: 15,
    },
  });

console.log(page.records);