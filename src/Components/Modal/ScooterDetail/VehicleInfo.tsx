import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import DetailSimpleCard1 from './DetailSimpleCard1';
import DetailSimpleCard2 from './DetailSimpleCard2';
import MarkerMap from '../../Map/MarkerMap';

const VechicleInfo = () => {
  return (
    <div>
      <h1>Scooter</h1>
      <span className="scooter-id">ID:92716</span>

      <div className="status">
        STATUS: <div>Availalbe</div>
      </div>

      <div className="dash-line"></div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <DetailSimpleCard1 title="Total Earnings" subtitle="" value="15,310 USD" isMoney={true}/>
          </Grid.Column>
          <Grid.Column>
            <DetailSimpleCard1 title="Average Rides" subtitle="per day" value="21" isMoney={false}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <DetailSimpleCard1 title="Average Value" subtitle="per day" value="15 USD" isMoney={true}/>
          </Grid.Column>
          <Grid.Column>
            <DetailSimpleCard1 title="Total Live Days" subtitle="" value="612" isMoney={false}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className="dash-line"></div>
      <h3>Data Usage</h3>
      <Grid columns={3}>
        <Grid.Column>
          <DetailSimpleCard2 title="Total Used" value="10.63 MB"/>
        </Grid.Column>
        <Grid.Column>
          <DetailSimpleCard2 title="Sessions" value="11"/>
        </Grid.Column>
        <Grid.Column>
          <DetailSimpleCard2 title="Average Usage" value="966,67KB"/>
        </Grid.Column>
      </Grid>

      <h3>Current Location</h3>
      <div className="location">
        <div>Carrera 13 #131-35, Bogotá - Colombia</div>
        <div>
          <Button className="btn-send">SEND</Button>
          Tasks to <br/>Logistics Team
        </div>
      </div>
      <div style={{ height: '170px', width: '100%' }}>
        <MarkerMap />
      </div>
    </div>
  );
};

export default VechicleInfo;