import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { Text } from '../Texts/Text';

const Container = styled.div`
  display: block;
  width: 50%;
  margin: 1em auto;
  margin-top: 2.5em;
  text-align: center;
`;

const PaginationButton = styled(Button)`
  display: inline-block;
  margin: auto;
  border-radius: 16px !important;
  width: 100px !important;
  background-color: #fff !important;
  color: #666 !important;
  text-align: center !important;
`;

const SimplePagination = ({ loading = true, onNext, onPrevious }: any) => {
  return (
    <Container>
      {loading ? (
        <Text color="gray" align="center">
          Loading...
        </Text>
      ) : (
        <>
          <PaginationButton onClick={onPrevious}>Previous</PaginationButton>
          <PaginationButton onClick={onNext}>Next</PaginationButton>
        </>
      )}
    </Container>
  );
};

export default SimplePagination;
