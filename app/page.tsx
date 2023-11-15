import Image from 'next/image'
import Link from 'next/link';

interface Game{
  id: number;
  pw:string;
  title: string;
  text:string;
  image:string;
}

/**async function은 비동기식 함수. */
export default async function Home() {
  //api 호출하여 값을 가져옵니다.
  const responce = await fetch('http://localhost:8080/api',{cache: 'no-store'})
  const games: Game[] = await responce.json(); //games 객체, Game[] 배열로 JSON 으로 값을 담아줍니다.


  return (
   <div>
    <Link href={"games"}>게시글 작성</Link>
    {games.map((game) => <div key={game.id}>

      <Link href={
        {
          pathname: 'games/post', //games/post 경로로 이동시켜줍니다.
          query:{id:`${game.id}`} //localhost:3000/games/post/${id}의 경로가 같습니다.
        }
      }>
        {game.title}<br/>

      </Link>
    </div>)}
   </div>
  )
}
