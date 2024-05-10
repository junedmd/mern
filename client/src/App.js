
import './App.css';
import axios from 'axios'

import { useState, useEffect } from "react";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("")

  const [data, setData]= useState(" ")

    const loaddata = async () => {
      try{
        const response = await axios.get('/users')
        setData(response?.data?.data)
      }catch(e){
        console.log(e.message);
        alert(e.message)
      }
     
    }

    useEffect(() => {
      loaddata();
    }, [])

  const User = async () => {

    
      const inputFields = [name, email, mobile, birthday];
      
      
      if (inputFields.some(field => field.trim() === '')) {
        alert("Please fill in all fields");
        return; 
      } 

    
    
      try {
      const response = await axios.post('/users', {
        name: name,
        email: email,
        mobile: mobile,
        birthday: birthday,

      });

      if (response?.data?.success) {
        alert(response?.data?.message)
      } else {
        alert(response?.data?.message)
      }

      setName("")
      setEmail("")
      setBirthday("")
      setMobile("")
    } catch (e) {
      console.log("not working")
    }
  }



  return (
    <div className="App">
      <h1 className=" header"> Practice  </h1>

      <div className='main-container'>
        <div className=" form">
          <div>
            <input placeholder=" Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="inputfields" />
          </div>
          <div>
            <input placeholder="Your mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value)
              }}
              className="inputfields" />
          </div>

          <div>

            <input placeholder=" Your Email "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="inputfields" />
          </div>

          <div>
            <input placeholder="Your birthday"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value)
              }}
              className="inputfields" />
          </div>
          <button
            type="button"
            className="btn"
            onClick={User} > Sumbit</button>
        </div>
        
        <div className='side-form'>  
        
        <div className=' container'> </div>
        {
          data?.map((userobj ,index)=>{
               const {name,mobile,email,birthday}=userobj;
               return(
                 <div className="link-contain">
                   <p>Name : {name}</p>
                   <p> Mobile number :{mobile} </p>
                   <p> Email :{email}</p>
                   <p> Date of birth :{birthday}</p>
                 </div>

               )
           })
         }
        </div>
      </div>

    </div>
  );
}

export default App;
