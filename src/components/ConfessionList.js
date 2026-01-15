import React, { useEffect, useState } from "react";
import "../assets/css/ConfessionList.css";
import { database, ref, onValue } from "../config/firebase";
import Moment from "react-moment";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
// import { deleteData } from "../utils/database"; 

const ConfessionList = () => {
  const [confessionList, setConfessionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    // Note: deleteData() inside useEffect will clear your DB on every refresh. 
    // Usually, you don't want this in a real app.
    // deleteData(); 

    const confessionsRef = ref(database, "confessions");

    // Start Listener
    const unsubscribe = onValue(confessionsRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Transform object {id1: {}, id2: {}} into array [{}, {}] and reverse it
        const formattedData = Object.values(data).reverse();
        setConfessionList(formattedData);
      } else {
        setConfessionList([]);
      }
      
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase Read Error: ", error);
      setIsLoading(false);
    });

    // Cleanup: Turn off listener when user leaves the page
    return () => unsubscribe();
  }, []);

  // Helper to format date
  const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return `${d.getFullYear()} ${monthList[d.getMonth()]} ${d.getDate()}`;
  };

  return (
    <div className="container-wrapper">
      <center>
        <div className="confession-list">
          {isLoading ? (
            <div style={{ width: "85%", marginTop: "20px" }}>
              <ShimmerSimpleGallery card imageHeight={200} row={2} col={2} caption />
            </div>
          ) : confessionList.length > 0 ? (
            confessionList.map((confession, index) => (
              <div key={index} className="confession-card">
                <div className="card-date">{formatDate(confession.createdAt)}</div>
                
                <div className="confessed-note">{confession.note}</div>

                <div className="time-ago">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No Confession Notes found.</div>
          )}
        </div>
      </center>
    </div>
  );
};

export default ConfessionList;
