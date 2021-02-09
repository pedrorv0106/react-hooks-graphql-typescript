import React from 'react';
import cosmicScooter from "../../../Global/Assets/cosmic_scooter.png";
import { Button, Image } from 'semantic-ui-react';

const Activity = (props: any) => {
  const { data } = props;
  return (
    <div className="one-activity">
      <div className="flex">
        <Image src={cosmicScooter}/>
        <div className="comment-detail">
          <div className="comment">{data.comment}</div>
          <div className="time">{data.time}</div>
        </div>
      </div>
      <Button basic color="blue" className="detail-btn">See Details</Button>
    </div>
  );
};

export default Activity;