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
    onValue(confessionsRef, (snapshot) => {
      let _data = snapshot.val();
      let _list = [];
      for (let key in _data) {
        _list.push({ id: key, ..._data[key] });
      }
      _list.sort((a, b) => b.createdAt - a.createdAt);
      setConfessionList(_list);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="confession-page-container">
      <div className="confession-grid">
        {isLoading ? (
          <div className="status-message">
            <ShimmerSimpleGallery card imageHeight={200} row={2} col={2} caption />
          </div>
        ) : confessionList.length > 0 ? (
          confessionList.map((confession) => {
            const _date = new Date(confession.createdAt);
            return (
              <div key={confession.id} className="confession-card">
                <div className="date-header">
                  {`${monthList[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`}
                </div>
                
                <div className="confession-body">
                  {confession.note}
                </div>

                <div className="time-footer">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            );
          })
        ) : (
          <div className="status-message">No Confession Notes..</div>
        )}
      </div>
    </div>
  );
};

export default ConfessionList;
