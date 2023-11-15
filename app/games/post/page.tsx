'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Userpage() {

    /**버전 문제로 router 사용 시 에러가 발생합니다. usesearchParams 대체. (navigation도 동일한 에러) */
    const searchParams = useSearchParams();
    /**app의 page.tsx에서 받아온 값을 변수에 저장합니다. */
    const id = searchParams.get('id');

    /**비동기식으로 불러온 json data를 담기위한 변수입니다. */
    const [data,setData] = useState<any>(null);//any 타입을 넣어서 ossibly 'null'.ts(18047) 에러 발생을 막아줍니다.
    const [isLoading, setIsLoading] = useState(true); //비동기 함수를 사용하기때문에, Lodding시간을 위한 변수를 생성합니다.

    //async / await는 비동기 처리 방식입니다.
    //현재 function에 그대로 asnyc 사용하게 되면, 충돌이 발생합니다.
    // 즉시 실행 함수.

    /**id 값을 받아 넣어 게시물을 불러오기 위함입니다. */
    useEffect(() => { //컴포넌트가 렌더링 될 때마다 특정작업을 실행할 수 있도록 하는 hook입니다.
        async function fetchData() { //Userpage function에 async 시 'use client'에러가 발생합니다.
            /**id값을 받아온 api를 호출합니다. */
            try{
                setIsLoading(true); //값을 불러올때, Lodding값을 true로 변환합니다.
                const response = await fetch(`http://localhost:8080/api/${id}`);
                const json_data = await response.json(); //json의 형태로 변수에 변환하여 담아줍니다.
                setData(json_data); //data 변수에 json 변수를 담아줍니다.
            }catch(error){
                console.log(error);
            }
            finally{setIsLoading(false);}; //항상 (에러 발생여부 상관없이) Loading이 false가 되도록 설정합니다. 
        }
        fetchData(); //api function을 호출합니다.
    },[]) //한번만 실행하는 경우 []를 넣어줍니다.

    const [pw, setPw] = useState(""); //pw를 받아 사용하기 위한 변수입니다.
    const handleChangePw = (event:React.ChangeEvent<HTMLInputElement>) =>setPw(event.target.value);
    //input password 값을 pw 변수에 담아줍니다.

    function CheckPW(){ //수정 페이지로 진입하는 password 체크 함수입니다ㅣ.
        if(pw != ''){ //password가 빈 값이 아닌 경우에만 수정페이지로 이동합니다. 
            if(pw == data.pw){
                location.href=`/games/corr?id=${id}`
            }else{
                alert("비밀번호가 일치하지 않습니다."); //아닐 경우 얼럿을 띄웁니다.
            }
        }else{
           alert("비밀번호를 입력해주세요."); //빈 값일 경우 얼럿을 띄웁니다.
        }
    }

    function Delete(){ //삭제버튼 클릭 시 passsword 체크 함수입니다.
        if(pw != ''){
            if(pw == data.pw){
            fetch(`http://localhost:8080/api/delete/${id}`,{
                method: 'DELETE'
            });
               alert("삭제되었습니다.");
               location.href='/' //삭제가 완료되면 목록화면으로 되돌아옵니다.
            }else{
                alert("비밀번호가 일치하지 않습니다.");
            }
        }else{
           alert("비밀번호를 입력해주세요."); 
        }
    }
    

    if(isLoading)return(<h1>Lodding</h1>); //비동기 방식으로, 로딩되는 시간이 있기 때문에 해당 코드를 설정해줍니다.
  return (
    <div>

    제목: {data.title} <br/>
    내용: {data.text}<br/>
    비밀번호:<input type='password' onChange={handleChangePw}/>

    <button onClick={CheckPW}>수정하기</button>
    <button onClick={Delete}>삭제하기</button>
    </div>
  )
}
