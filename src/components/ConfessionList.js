import React, { useEffect, useState } from "react";
import "../assets/css/ConfessionList.css";
import { database, ref, onValue } from "../config/firebase";
import Moment from "react-moment";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { deleteData } from "../utils/database";

const ConfessionList = () => {
  const [confessionList, setConfessionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    deleteData();
    const confessionsRef = ref(database, "confessions");
    
    // Using onValue to listen for real-time updates
    const unsubscribe = onValue(confessionsRef, (snapshot) => {
      const _data = snapshot.val();
      const _list = [];

      for (let key in _data) {
        _list.push({ id: key, ..._data[key] });
      }

      // Optional: Sort by newest first
      _list.sort((a, b) => b.createdAt - a.createdAt);

      setConfessionList(_list);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="confession-list-container">
      <div className="confession-list">
        {isLoading ? (
          <div className="shimmer-wrapper">
            <ShimmerSimpleGallery card imageHeight={300} row={2} col={2} caption />
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
          <p className="no-data">No Confession Notes found...</p>
        )}
      </div>
    </div>
  );
};

export default ConfessionList;
