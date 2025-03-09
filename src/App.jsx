import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { addTask, deleteTask, taskComplete, taskIncomplete, editDataSave } from "./todoSlice";
const App =()=>{
  const[Myval,setMyVal]=useState("");
  const [btnStatus, setBtnStatus]=useState(true);
  const [workId , setwWrkId]=useState("");
  const mytask=useSelector(state=>state.mytodo.task);
  const dispatch = useDispatch();

  console.log(mytask);
  const editmydata=(id, work)=>{
    setMyVal(work);
    setBtnStatus(false);
    setwWrkId(id);
  }
  const editDataDispatch=()=>{
    dispatch(editDataSave({id:workId, work:Myval}))
    setBtnStatus(true);
  }



  let sno=0;
  const ans=mytask.map((key)=>{
    sno++;
    return(
      <>
      <tr>
        <td>{sno}</td>
        <td>
          {key.status=="complete" ? (<>
          <span style={{textDecoration:"line-through"}}>
          {key.work}
          </span>
          </>):(<>
          {key.work}</>)}
          </td>
        <td>
          <button onClick={()=>{dispatch(deleteTask({id:key.id}))}} >Delete</button>
        </td>
        <td>
          <button onClick={()=>{dispatch(taskComplete({id:key.id}))}}>complete</button>
        </td>
        <td>     
        <button onClick={()=>{dispatch(taskIncomplete({id:key.id}))}}>Incomplete</button>
        </td>
        <td>
          <button onClick={()=>{editmydata(key.id, key.work)}}>edit <data value=""></data></button>
        </td>
      </tr>
      </>
    )
  })
  return(
    <>
    <h1>welocme to my todoapp</h1>
    Enter task: <input type="text" value={Myval} onChange={(e)=>{setMyVal(e.target.value)}}/>
    
    {btnStatus ?(<> 
    <button onClick={()=>{dispatch(addTask({id:Date.now(), work:Myval, status:"incomplete"}))}}>
    Add task</button>
    </>):(<>
    <button onClick={editDataDispatch}>edit save</button>
      </>)}
    
    <hr />
    <table border={1} width={500}>
      <tr>
        <th>#</th>
        <th>your task list</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      {ans}

    </table>
    </>
    )
  }
  export default App;
  