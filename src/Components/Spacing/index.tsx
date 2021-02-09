import React from 'react';

export enum SpaceTypes {
  small = '10px',
  normal = '20px',
  large = '40px',
};

export default function Spacer({ size }: { size: SpaceTypes }) {
  return (
    <div
      style={{
        width: '100%',
        height: size,
      }}
    />
  );
}