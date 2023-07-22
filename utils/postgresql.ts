import postgres from "postgres";

const sql = postgres(process.env.NEXT_PUBLIC_PG_URL!);

async function getUsers() {
  const users = await sql`
      select
        *
      from users
    `;
  return users;
}

async function insertUser(address: string) {
  const users = await sql`
      insert into users
        (address)
      values
        (${address})
      returning address
    `;
  return users;
}

async function updateUser(address: string, isVerified: boolean) {
  const users = await sql`
      update users
      set is_verified = ${isVerified}
      where address = ${address}
    `;
  return users;
}
