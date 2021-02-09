import React from 'react';

interface ImageLogoProps {
  size: number;
  align?: 'left' | 'center' | 'right';
}

function ImageLogo({ size, align }: ImageLogoProps) {
  return (
    <div style={{
        width: '100%',
        display: 'block',
        textAlign: align || 'left',
    }}>
      <img
        src={require('../../Global/Assets/icon_cosmic.svg')}
        width={size}
        height={size}
        alt="Cosmic Icon"
      />
    </div>
  );
}

export default ImageLogo;
