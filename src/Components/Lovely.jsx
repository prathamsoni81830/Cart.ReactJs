
// import { FaEdit, FaTrash } from "react-icons/fa";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
const Lovely = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
   
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                {/* <FaEdit /> */}
               { <EditOutlinedIcon/>}
            
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                {/* <FaTrash /> */
                <DeleteOutlineOutlinedIcon/>}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Lovely;
