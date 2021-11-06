import { useState,useEffect } from 'react';
import '../App.css'
import { todos } from '../utils/request';

export const Todo=()=>{
    const [data,setData]=useState([])
    const [text,setText]= useState("")
    const [page,setPage]= useState(1)
    const [total, setTotal] = useState(0);
    const [loading,setLoading]= useState(true)
    const [error,setError]=useState(false)

    const handleaddtodo=async()=>{
   await todos.post("/todos",{
        title:text,
        status:false,
    })
    gettodos()
  };

    const getAllDataLength = () => {
      fetch(`http://localhost:3001/todos`)
      .then((d) => d.json())
      .then(res => setTotal(res.length))
      .catch((err)=> console.log(err,'err'))
    };
  


  const gettodos= async()=>{
   try{
    const {data}=await todos.get(`/todos`,{
        params:{
            _page:page,
            _limit:4,                       //limit:null --> all data will render
        },
    })
    setData(data);
    setLoading(false)
   }catch{
       console.log("error occured");
       setLoading(false);setError(true)
   }
 
}
 


//delete list
  const deleteMe = async(id) => {
await todos.delete(`/todos/${id}`)
gettodos()
  };
  //update status
const toggleList =async (id) => {
await todos.patch(`/todos/${id}`)
gettodos()
};
  const getTodo = () =>
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
      .then((d) => d.json())
      .then(res => {
        getAllDataLength();
        setData(res)
      })
      .catch((err)=> console.log(err,'err'))
 
  
  


useEffect(()=>{
  gettodos(page)
  getAllDataLength();
},[page]);


  return loading? (<h1>Loading...</h1>) :error ? "something went wrong" : (
  <div className="App" onChange={(e)=>setText(e.target.value)}>
       <button onClick={handleaddtodo}>Add Todo</button>
      <input type="text"/>
 {data.map((e)=>(
   <div className="attributes">
   <div key={e.id}>
     {e.title}-
     </div>

     <div>{e.status ? "Completed" : "Not Completed"}</div>
     <button  onClick={()=> toggleList(e.id)}>Toggle</button>
     <button  onClick={()=> deleteMe(e.id)}>Delete</button>
   
   </div>
 ))}
 <button disabled={page===1} onClick={()=>{
   setPage(page-1)
   setLoading(true)
 }}>Previous</button>
 <button  onClick={()=>{
   setPage(page+1)
   setLoading(true)
 }}>Next</button>
 <h3 >Page:{page}</h3>
 
  </div> 
  );
}
   
  
     
