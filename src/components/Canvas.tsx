"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import cn from "classnames"
const { random, min } = Math;

export interface MountaiunsLayerOptions {
  h?: number;
  bmin?: number;
  bmax?: number;
  color?: string;
}

const drawMountains = (ctx: CanvasRenderingContext2D, width: number, height: number, options?: MountaiunsLayerOptions): void => {
  
  const mindx = (options?.bmin || 0.1) * width;
  const maxdx = (options?.bmax || 0.4) * width;
  let y = (options?.h || random()) * height;
  let x = 0;
  let d = random() > .5 ? 1 : - 1;
  ctx.fillStyle = options?.color || '#FF5035';
  ctx.beginPath();
  ctx.moveTo(x, height);
  ctx.lineTo(x, y);
  while (x < width) {
    const dx = min(width - x, mindx + random() * (maxdx - mindx));
    x = x + dx;
    y = y + d * dx;
    d *= random() > 0.7 ? 1 : -1;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(x, height);
  ctx.fill();
  
  ctx.closePath();
  
}

export interface BgCanvasProps {
  width: number;
  height: number;
  wrapperClassnames?: string;
}

const COLORS = [
  '#73c6fa',
  '#7ccbfc',
  '#8acffc'
];

const BgCanvas = ({
  wrapperClassnames = cn(
    'absolute',
    'left-0',
    'top-0',
    'right-0',
    'bottom-0',
    'overflow-y-scroll',
    'overflow-x-hidden'
  ),
  ...props
}: BgCanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<number>(0);
  const width = props.width * 2;
  const height = props.height;

  useEffect(() => {
    //debugger;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      drawMountains(ctx, width, height, {
        h: 0.7,
        color: COLORS[2],
        bmin: 0.01,
        bmax: 0.02,
      });
      drawMountains(ctx, width, height, {
        h: 0.8,
        color: COLORS[1],
        bmin: 0.01,
        bmax: 0.02,
      });
      drawMountains(ctx, width, height, {
        h: 0.9,
        color: COLORS[0],
        bmin: 0.01,
        bmax: 0.02,
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    setPos(wrapperRef.current?.scrollTop || 0);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassnames}
      onScroll={handleScroll}
      style={{ backgroundColor: 'rgb(223 242 255)' }}
    >
      
      <div
        style={{
          pointerEvents: 'none',
          height: height + 'px',
          backgroundImage: 'url(clouds.png)',
          backgroundColor: 'transparent',
          backgroundRepeat: 'repeat-x',
          backgroundAttachment: 'initial',
          backgroundPositionY: '-100px',
          backgroundSize: '1200px 300px',
          width: width + 'px',
          position: 'fixed',
          opacity: .9,
          top: 0,
          marginLeft: `-${pos * .2}px`,
          zIndex: 11
        }}
      ></div>
      <div
        className={cn(
          'relative',
          'rounded-full',
          'w-[100px]',
          'h-[100px]',
          'bg-[#e0074c]',
          'left-[60%]',
          'top-[1200px]',
          'mb-[2600px]',
          'z-10',
        )}
        style={{
          boxShadow: '0 0 100px 10px #e0074c'
        }}
      ></div>
      <canvas
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          bottom: '0', top: '0',
          marginLeft: `-${pos}px`,
          zIndex: 11
        }}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default BgCanvas;