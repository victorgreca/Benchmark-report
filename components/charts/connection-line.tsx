'use client';

interface ConnectionLineProps {
  color: string;
  position: {
    left: string;
    top: string;
    zIndex: number;
  };
  height: number;
}

export function ConnectionLine({ color, position, height }: ConnectionLineProps) {
  return (
    <div 
      className="absolute" 
      style={{ 
        left: position.left,
        top: position.top,
        zIndex: position.zIndex
      }}
    >
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[1px] bg-transparent">
        {/* Vertical Connection Line */}
        <div
          className="absolute top-[28px] left-0 w-[1px] transition-all duration-300"
          style={{
            height: `${height}px`,
            backgroundColor: color,
            opacity: 0.75
          }}
        />
        {/* Connection Dot */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: color,
            transform: 'translate(-50%, 50%)'
          }}
        />
      </div>
    </div>
  );
}