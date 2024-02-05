import { getDictionary } from '../../dictionaries';
import { cookies } from 'next/headers'

export default async function Home() {
    return (
        <main style={{minHeight: "100vh", padding: "20px"}}>
            <p>Welcome!</p>
            <img src='/static/as.jpg'></img>
            <a href='/login'>Login page</a>
        </main>
    );
}
{/*export default function Page() {
  const cookieStore = cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}*/}