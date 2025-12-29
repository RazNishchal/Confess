import React, { useState } from "react";
import "../assets/css/AddConfessionPost.css";
import { FaLock } from "react-icons/fa";
import { database as db, set, ref } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toast";
import { deleteData } from "../utils/database";

const AddConfessionPost = () => {
  const [text, setText] = useState("");

  const addConfession = () => {
    if (text.trim()) {
      set(ref(db, "confessions/" + uuidv4()), {
        note: text,
        createdAt: Date.now(),
      }).then((err) => {
        if (!err) {
          toast.success("Confession Added");
          setText("");
          deleteData();
        } else {
          toast.error("Could not add Confession Note.");
        }
      });
    }
  };

  return (
    <div className="confession-container">
      <div className="add-confession-post">
        <textarea
          rows="8"
          placeholder="Confess here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="confession-textarea"
        ></textarea>
        
        <button className="confess-btn" onClick={addConfession}>
          Confess
        </button>
      </div>

      <div className="confession-footer">
        <FaLock size="10" />
        <small>Confessed Note will remain for 24 hrs.</small>
      </div>
      
      <ToastContainer delay={2500} />
    </div>
  );
};

export default AddConfessionPost;
