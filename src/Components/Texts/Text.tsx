import React, { ReactNode } from 'react';
import './Text.scss';

export interface TextProps {
  size?:
    | 'small'
    | 'normal'
    | 'large'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl';
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
  label?: string;
  style?: any;
  color?: 'normal' | 'gray' | 'success' | 'lightdark' | 'white' | 'error';
  weight?: 'bolder' | 'bold' | 'regular' | 'thin';
}

export function Text({
  children,
  label,
  size,
  align,
  style,
  color,
  weight,
}: TextProps) {
  return (
    <h3
      className={`
        text text_${size || 'normal'} 
        text_${align || 'left'} 
        text_color_${color || 'normal'}
        ${weight ? `text_weight_${weight}` : ''}
      `}
      style={style}
    >
      {label}
      {children}
    </h3>
  );
}
