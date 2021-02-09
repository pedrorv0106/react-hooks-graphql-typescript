import React from 'react';
import './Title.scss';

export interface TitleProps {
  size?: 'small' | 'normal' | 'large';
  align?: 'left' | 'center' | 'right';
  label: string;
  style?: any;
}

export function Title({ label, size, align, style }: TitleProps) {
  return (
    <h1
      className={`title title_${size || 'normal'} title_${align || 'left'}`}
      style={style}
    >
      {label}
    </h1>
  );
}
