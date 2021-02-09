import React, { useState } from 'react';
import { Container, Grid, Sidebar } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './style.scss';
import { Text } from '../../../Components/Texts/Text';

type FilterPanelProps = {
  visible: boolean;
  setVisible: Function;
  onSave: Function;
  startDate: string | null;
  endDate: string | null;
  loading: boolean;
};

const FilterPanel = (props: FilterPanelProps) => {
  const { visible, setVisible, onSave, startDate, endDate, loading } = props;

  const [startValue, setStartValue] = useState(startDate);
  const [endValue, setEndValue] = useState(endDate);

  function handleOnSave() {
    onSave(
      startValue ? new Date(startValue).toISOString() : null,
      endValue ? new Date(endValue).toISOString() : null
    );
  }

  function handleChangeStart(e: any, data: any) {
    const { value } = data;
    setStartValue(value);
    handleOnSave();
  }
  function handleChangeEnd(e: any, data: any) {
    const { value } = data;
    setEndValue(value);
    handleOnSave();
  }

  return (
    <Sidebar
      as={Container}
      animation="overlay"
      icon="labeled"
      onHide={() => setVisible(false)}
      visible={visible}
      width="very wide"
      direction="right"
    >
      <Container className="filter-panel" style={{ height: '100% !important' }}>
        <div className="panel-header">
          <div className="title">Filter</div>
          <div className="close" onClick={() => setVisible(false)}>
            &#10006;
          </div>
        </div>
        <Container style={{ height: '100% !important' }}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column computer={8}>
                <Text size="s" color="gray">
                  Start Date
                </Text>
                <SemanticDatepicker
                  type="basic"
                  value={startValue ? new Date(startValue) : null}
                  onChange={handleChangeStart}
                  disabled={loading}
                />
              </Grid.Column>

              <Grid.Column computer={8}>
                <Text size="s" color="gray">
                  End Date
                </Text>
                <SemanticDatepicker
                  type="basic"
                  value={endValue ? new Date(endValue) : null}
                  onChange={handleChangeEnd}
                  disabled={loading}
                />
              </Grid.Column>

              {loading && (
                <Grid.Column computer={16}>
                  <Text
                    size="m"
                    color="gray"
                    align="center"
                    style={{ marginTop: '3em' }}
                  >
                    Loading...
                  </Text>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    </Sidebar>
  );
};

export default FilterPanel;
