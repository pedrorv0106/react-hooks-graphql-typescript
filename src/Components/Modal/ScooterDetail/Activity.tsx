import React from 'react';
import OneActivity from './OneActivity';

const activities = [
  {
    date: "today",
    datas: [
      {
        comment: "You scooter A0021 has finished a rental",
        time: "3:00 pm"
      },
      {
        comment: "You scooter A0001 has started a rental",
        time: "1:00 pm"
      },
      {
        comment: "You scooter A0034 has finished a rental",
        time: "9:00 am"
      },
    ]
  },
  {
    date: "03/09/2020",
    datas: [
      {
        comment: "You scooter A0021 has finished a rental",
        time: "3:00 pm"
      },
      {
        comment: "You scooter A0021 has finished a rental",
        time: "3:00 pm"
      },
      {
        comment: "You scooter A0021 has finished a rental",
        time: "3:00 pm"
      },
    ]
  }
]
const Activity = () => {
  return (
    <div>
      {activities.map((activity, index) => {
        return <div className="one-day" key={index}>
          <div className="one-day-date">{activity.date}</div>
          {activity.datas.map((data, i) => <OneActivity key={i} data={data} />)}
        </div>
      })}
    </div>
  );
};

export default Activity;