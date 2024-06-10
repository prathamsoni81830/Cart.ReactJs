import { useState, useEffect } from "react";
import Lovely from "./Components/Lovely";
import Showltem from "./Components/ShowItem";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './App.css'
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: ""
  });

  

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a value")
      showAlert(true, "Please enter a value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      // showAlert(true, "Item added", "success");
      toast.success("Item Added to the List")
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    toast("clear")
    // showAlert(true, "empty list", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    // showAlert(true, "Item removed", "danger");
    toast.success("Item Deleted")
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
    
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Showltem {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <Lovely items={list} removeItem={removeItem} editItem={editItem} />
        <button className="clear-btn" onClick={clearList}>
          Clear Items
        </button>
       <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}

        {/* <ToastContainer /> */}
      </div>
    </section>
  );
}

export default App;
