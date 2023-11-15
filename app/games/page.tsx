'use client'
import React, { useState } from 'react'

function page() {
    
    //입력받을 변수 setting
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [pw,setPw] = useState("");
    const [img,setImg] = useState("");    
    const [disabled,setDisabled] = useState(false);

    //input type=text에 값이 담겼을때, submit으로 보내기 위해 설정합니다.
    const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleChangeText = (event:React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
    const handleChangePw = (event:React.ChangeEvent<HTMLInputElement>) => setPw(event.target.value);

    const Memo = { //JSON으로 변환하기 위한 변수입니다.
        title,
        text,
        pw,
        img
      }

    const handelSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        setDisabled(true); //중복을 막기위한 설정입니다.(두번 호출)
        event.preventDefault(); //submit 기본동작 새로고침을 방지합니다. 

        try{
            const response = fetch('http://localhost:8080/api/insert',{
              method: 'POST',
              headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Memo)  
            })
            setDisabled(false); //중복을 막기 위한 설정입니다.
            location.href="/";
        }catch(error){
            console.log(error);
        }
    }

  return (
    <form onSubmit={handelSubmit}>
    제목<input type='text' name='title' onChange={handleChangeTitle} required></input><br/>
    내용<input type='text' name='text' onChange={handleChangeText}></input><br/>
    비밀번호<input type='password' name='pw' onChange={handleChangePw} required></input>
    <button type='submit' disabled={disabled}>등록</button>   
    </form>
  )
}

export default page