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
    const unsubscribe = onValue(confessionsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let key in data) {
        list.push({ id: key, ...data[key] });
      }
      list.sort((a, b) => b.createdAt - a.createdAt);
      setConfessionList(list);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="confession-page-wrapper">
      <div className="confession-grid">
        {isLoading ? (
          <div className="full-width">
            <ShimmerSimpleGallery card imageHeight={200} row={2} col={2} caption />
          </div>
        ) : confessionList.length > 0 ? (
          confessionList.map((confession) => {
            const _date = new Date(confession.createdAt);
            return (
              <div key={confession.id} className="confession-card">
                <div className="card-header">
                  <span className="date-text">
                    {`${monthList[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`}
                  </span>
                </div>
                
                <div className="card-body">
                  <p className="confession-text">{confession.note}</p>
                </div>

                <div className="card-footer">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            );
          })
        ) : (
          <div className="full-width">No Confession Notes found..</div>
        )}
      </div>
    </div>
  );
};

export default ConfessionList;
