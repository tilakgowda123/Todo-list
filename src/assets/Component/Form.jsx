import  { useRef, useState } from 'react'
import "./Form.css"


function Form() {
  let [data, setdata] = useState("");
  let [value, setvalue] = useState([]);
  let [message, setMessage] = useState("");
  let [toggle, setToggle] = useState({ show: false, id: "" })
  let editRef = useRef(null)




  let getData = (e) => {
    e.preventDefault();
    setdata(e.target.value)
    setMessage('')
  }

  let displayData = () => {
    if (data) {
      setvalue([...value, data])
      setdata("");
    } else {
      setMessage(" Please enter the item");
    }
  }

  // let delItem=( index)=>{
  //   let newList=[...value]
  //   newList.splice(index,1)
  //   setvalue(newList)
  // }

  let delItem = (id) => {
    let filteredItems = value.filter((_, index) => id !== index)
    setvalue(filteredItems)
  }

  let editItem = (id) => {
    editRef.current.focus();
    setToggle({ show: true, id })
    setdata(value[id])
  }

  let updateItem = () => {
    value[toggle.id] = data;
    setvalue([...value])
    setdata("")
    setToggle({ show: false })
  }

  return (
    <div className="container">
      <h2>Todo List</h2>
      <input type="text" value={data} onChange={getData} ref={editRef} />
      {toggle.show || <button onClick={displayData}>Add</button>}
      {toggle.show && <button onClick={updateItem}>Update</button>}
      {message && <p className='error'>{message}</p>}
      <hr />
      {value.length === 0 ? (<p>No item in the list</p>) : (
        <ol>

          {value.map((info, index) => {
            return <div key={index}>
              <li> {info} <button onClick={() => delItem(index)}>Delete</button>
                <button onClick={() => editItem(index)}>Edit</button></li>

            </div>
          })}

        </ol>
      )}

    </div>
  )
}

export default Form