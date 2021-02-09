import React, {useState} from 'react';
import { Container, Sidebar } from 'semantic-ui-react';
import { useModal, useHideModal } from './WrapperHooks';
import './style.scss';
import VechicleInfo from './VehicleInfo';
import Activity from './Activity';

const ScooterDetail = () => {
  const { modal } = useModal();
  const { handleOnClose } = useHideModal();
  const [tab, setActive] = useState(1)
  return (
    <Sidebar
      as={Container}
      animation='overlay'
      icon='labeled'
      onHide={handleOnClose}
      visible={modal.show}
      width='very wide'
      direction="right"
      id="scooter-panel"
    >
      <Container className="scooter-detail">
        <div className="panel-header">
          <div className="title">Detail Information</div>
          <div className="close" onClick={handleOnClose}>&#10006;</div>
        </div>
        <div className="btn-tab flex">
          <div className={tab === 1 ? "btn active-tab" : "btn"} onClick={()=>setActive(1)}>Vechicle Info</div>
          <div className={tab === 2 ? "btn active-tab" : "btn"} onClick={()=>setActive(2)}>Activity</div>
        </div>
        {tab === 1 && <VechicleInfo />}
        {tab === 2 && <Activity />}
      </Container>
    </Sidebar>
  );
};

export default ScooterDetail;