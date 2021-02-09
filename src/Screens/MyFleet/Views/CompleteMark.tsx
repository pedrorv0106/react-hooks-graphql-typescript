import React from 'react';
import { Icon } from 'semantic-ui-react';

const CompleteMark = () => {
  // const {order} = props;
  return (
    <div className='complete-mark'>
      <div className="complete-image"><Icon name="check"/></div>
      <div className="complete-line"/>
    </div>
  );
};

export default CompleteMark;