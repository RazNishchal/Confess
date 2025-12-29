import React, { useEffect, useState } from "react";
import "../assets/css/ConfessionList.css";
import { database, ref, onValue } from "../config/firebase";
import Moment from "react-moment";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { deleteData } from "../utils/database";

const ConfessionList = () => {
  const [confessionList, setConfessionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const monthList = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  useEffect(() => {
    // Run cleanup for expired data
    deleteData();

    const confessionsRef = ref(database, "confessions");
    
    // Listen for data
    const unsubscribe = onValue(confessionsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let key in data) {
        list.push({ id: key, ...data[key] });
      }

      // Sort: Newest confessions at the top
      list.sort((a, b) => b.createdAt - a.createdAt);

      setConfessionList(list);
      setIsLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="confession-list-container">
      <div className="confession-list">
        {isLoading ? (
          <div className="loading-wrapper">
            <ShimmerSimpleGallery card imageHeight={250} row={2} col={2} caption />
          </div>
        ) : confessionList.length > 0 ? (
          confessionList.map((confession) => {
            const _date = new Date(confession.createdAt);
            return (
              <div key={confession.id} className="confession-card">
                <div className="confession-date">
                  {`${monthList[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`}
                </div>
                
                <div className="confession-content">
                  {confession.note}
                </div>

                <div className="time-ago">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data">No Confession Notes found..</div>
        )}
      </div>
    </div>
  );
};

export default ConfessionList;
