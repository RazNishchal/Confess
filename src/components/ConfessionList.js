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
    onValue(ref(database, "confessions"), (snapshot) => {
      let _data = snapshot.val();
      let _list = [];
      for (let key in _data) {
        _list.push(_data[key]);
      }
      setConfessionList(_list);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="confession-container">
      <div className="confession-grid">
        {isLoading ? (
          <div className="full-width">
            <ShimmerSimpleGallery card imageHeight={300} row={2} col={2} caption />
          </div>
        ) : confessionList && confessionList.length > 0 ? (
          confessionList.map((confession, index) => {
            let _date = new Date(confession.createdAt);
            return (
              <div key={index} className="confession-card">
                <div className="confession-date">
                  {`${_date.getFullYear()} ${monthList[_date.getMonth()]} ${_date.getDate()}`}
                </div>
                
                <div className="confession-note">
                  {confession.note}
                </div>

                <div className="time-ago">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            );
          })
        ) : (
          <div className="full-width">No Confession Notes..</div>
        )}
      </div>
    </div>
  );
};

export default ConfessionList;
