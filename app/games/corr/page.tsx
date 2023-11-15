'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Corrpage() { //수정 페이지입니다.

  /**버전 문제로 router 사용 시 에러가 발생합니다. usesearchParams 대체. (navigation도 동일한 에러) */
  const searchParams = useSearchParams();
  /**app의 page.tsx에서 받아온 값을 변수에 저장합니다. */
  const id = searchParams.get('id');

  /**비동기식으로 불러온 json data를 담기위한 변수입니다. */
  const [data,setData] = useState<any>(null);//any 타입을 넣어서 ossibly 'null'.ts(18047) 에러 발생을 막아줍니다.
  const [isLoading, setIsLoading] = useState(true); //비동기 함수를 사용하기때문에, Lodding시간을 위한 변수를 생성합니다.

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disabled,setDisabled] = useState(false); //빈 값인지 아닌지 chekck합니다.
  
  const Memo = { //JSON으로 변환하기 위한 변수입니다.
    title,
    text,
  }


  /**onChange 이벤트가 발생하면 변수가 담깁니다. */
  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleChangeText = (event:React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

    /**id 값을 받아 넣어 게시물을 불러오기 위함입니다. */
    useEffect(() => {
        async function fetchData(){ //컴포넌트가 렌더링 될 때마다 특정작업을 실행할 수 있도록 하는 hook입니다.
               /**id값을 받아온 api를 호출합니다. */
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/${id}`);
                const json_data = await response.json();
                setData(json_data); //data 변수에 json_data를 저장해줍니다.
                //json으로 담은 변수에서 값을 지정하여 불러올 수 있습니다.
                
                setTitle(json_data.title); //각각의 변수에 초기값을 넣어줍니다. (업데이트 하기 위함.)
                setText(json_data.text);
            }catch(error){
                console.log(error);
            }finally{setIsLoading(false)}
        };
        fetchData(); //함수를 호출합니다.
    },[]);

    /**Submit 이벤트입니다. */
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>)=>{
        setDisabled(true); //중복을 막기위한 설정입니다.(두번 호출)
        event.preventDefault(); //submit 기본동작 새로고침을 방지합니다.

        try{ //update하는 await fetch문입니다.
            const res = await fetch(`http://localhost:8080/api/update/${id}`,{
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Memo)
            })
            setDisabled(false);
            window.location.href="/";
        }catch(error){
            console.log(error);
        }
    }
    function MainPage(){ //이전 페이지로 돌아가는 function입니다.
        location.href='/';
       }
       if(isLoading)return(<h1>Lodding</h1>)
  return (
    <form onSubmit={handleSubmit}>
    <input type='text' name='title' onChange={handleChangeTitle} defaultValue={data.title} required></input><br/>
    <input type='text' name='text' onChange={handleChangeText} defaultValue={data.text}></input><br/>
    <button type='button' onClick={MainPage}>이전</button><p/>
    <button type='submit'>등록</button>
    </form>
  )
}

export default Corrpage