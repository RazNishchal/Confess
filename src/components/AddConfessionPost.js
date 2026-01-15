import React, { useState } from "react";
import "../assets/css/AddConfessionPost.css";
import { FaLock } from "react-icons/fa";
import { database as db, set, ref } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toast";
// import { deleteData } from "../utils/database"; 

const AddConfessionPost = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const addConfession = async () => {
    if (!text.trim()) {
      toast.error("Please enter a note.");
      return;
    }

    setLoading(true);

    try {
      // Firebase v9 set() returns a promise. Use await for cleaner code.
      await set(ref(db, "confessions/" + uuidv4()), {
        note: text,
        createdAt: Date.now(),
      });

      // SUCCESS
      toast.success("Confession Added");
      setText("");
      
      // IMPORTANT: I suggest commenting this out to see if your DB connection 
      // stays stable. deleteData() might be the reason for the "disconnection".
      // deleteData(); 

    } catch (error) {
      // ERROR
      console.error("Firebase Error:", error);
      toast.error("Could not add Confession Note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confession-container">
      <div className="add-confession-post">
        <textarea
          rows="8"
          placeholder="Write your confession here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="confession-textarea"
          spellCheck="false"
          disabled={loading}
        ></textarea>
        
        <button 
          className="confess-btn" 
          onClick={addConfession}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confess"}
        </button>
      </div>

      <div className="confession-footer">
        <FaLock size="10" />
        <small>Confessed Note will remain for 24 hrs.</small>
      </div>
      
      <ToastContainer delay={2000} />
    </div>
  );
};

export default AddConfessionPost;
