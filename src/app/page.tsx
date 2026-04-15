import { turso } from '@/lib/turso';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const result = await turso.execute("SELECT * FROM products");
  const products = result.rows.map((row: any) => ({
    id: Number(row.id),
    name: row.name,
    price: Number(row.price),
    image: row.image,
    tag: row.tag,
  }));

  return <ClientPage initialProducts={products} />;
}
