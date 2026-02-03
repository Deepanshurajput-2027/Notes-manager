import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setnotes] = useState([])

 function fetchNotes(){
   axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    console.log(res.data.notes)
    setnotes(res.data.notes)
  })
  .catch(err=>{
    console.log("Error:",err) 
  })
}

  useEffect(()=>{
    fetchNotes();
  },[])

  function submitHandler(e){
    e.preventDefault();
    const {title,description}=e.target.elements;
    console.log(title.value,description.value);

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes();
    })
    form.reset();
  }

  function deleteNotes(noteId){
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then(res=>{
      console.log(res.data);
      fetchNotes();     
    })
  }

  function editNotes(noteId){
    const newDescription = prompt("Enter new description:");
    if(newDescription === null) return;
    axios.patch(`http://localhost:3000/api/notes/${noteId}`,{
      //-------------------------------------------------------------
      description:newDescription  
      //-------------------------------------------------------------
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes();     
    })
  }

  return (
    <>
      <form className='note-input-form' onSubmit={submitHandler}>
        <input type="text" placeholder='Title' name='title'/>
        <br />
        <input type="text" placeholder='Description' name='description'/>
        <br />
        <button type='submit'>Add Note</button>
      </form>
      <div className='notes'>
        {
          notes.map((note,idx)=>{
            return <div key={idx} className='note'>
                      <h1>{note.title}</h1>
                      <p>{note.description}</p>
                      <div className='btn'>
                        <button onClick={()=>{deleteNotes(note._id)}}>delete</button>
                      <button onClick={()=>{editNotes(note._id)}}>edit</button>
                      </div>
                     </div>
          })
        }
    </div>
    </>
  )
}

export default App
