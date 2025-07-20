import React from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { Table, Guest } from '../../types/guest';

interface TableComponentProps {
  table: Table;
  guests: Guest[];
  isSelected: boolean;
  isDragged: boolean;
  readonly?: boolean;
  zoom: number;
  onSelect: (tableId: string) => void;
  onDrag: (tableId: string, info: PanInfo) => void;
  onSeatClick: (tableId: string, seatNumber: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  table,
  guests,
  isSelected,
  isDragged,
  readonly = false,
  zoom,
  onSelect,
  onDrag,
  onSeatClick
}) => {
  const dragControls = useDragControls();
  
  const tableSize = table.type === 'round' ? 80 : { width: 120, height: 60 };
  const radius = table.type === 'round' ? 40 : 0;
  
  const renderSeats = () => {
    const seats = [];
    const tableRadius = table.type === 'round' ? 40 : 60;
    const seatRadius = 12;
    const seatDistance = tableRadius + 20;
    
    for (let i = 0; i < table.seats; i++) {
      const angle = (i / table.seats) * 2 * Math.PI - Math.PI / 2;
      const seatX = table.position.x + Math.cos(angle) * seatDistance;
      const seatY = table.position.y + Math.sin(angle) * seatDistance;
      
             // Find guest for this seat
       const guest = guests.find(g => 
         g.table_assignment_id === table.id && g.seat_number === i + 1
       );
      
      seats.push(
        <g key={`${table.id}-seat-${i}`}>
          {/* Seat Circle */}
          <motion.circle
            cx={seatX}
            cy={seatY}
            r={seatRadius}
            fill={guest ? '#9D7D6A' : '#F9F3F0'}
            stroke="#E6D4C1"
            strokeWidth={1}
            className="transition-all duration-200 cursor-pointer"
            whileHover={{ fill: '#DBC2A4', scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSeatClick(table.id, i + 1)}
          />
          
          {/* Guest Photo or Initial */}
          {guest && (
            <>
              {guest.photo_url ? (
                <image
                  x={seatX - seatRadius + 2}
                  y={seatY - seatRadius + 2}
                  width={seatRadius * 2 - 4}
                  height={seatRadius * 2 - 4}
                  href={guest.photo_url}
                  clipPath={`circle(${seatRadius - 2}px at center)`}
                  className="pointer-events-none"
                />
              ) : (
                <text
                  x={seatX}
                  y={seatY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs font-medium fill-white pointer-events-none"
                  style={{ userSelect: 'none' }}
                >
                  {guest.first_name.charAt(0)}{guest.last_name.charAt(0)}
                </text>
              )}
            </>
          )}
          
          {/* Seat Number */}
          <text
            x={seatX}
            y={seatY + seatRadius + 15}
            textAnchor="middle"
            className="text-xs fill-accent pointer-events-none"
            style={{ userSelect: 'none' }}
          >
            {i + 1}
          </text>
        </g>
      );
    }
    
    return seats;
  };
  
  return (
    <motion.g
      drag={!readonly}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => onDrag(table.id, info)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isDragged ? 1.1 : 1,
        filter: isSelected ? 'drop-shadow(0 4px 8px rgba(107, 70, 193, 0.3))' : 'none'
      }}
      whileHover={{ scale: readonly ? 1 : 1.05 }}
      whileTap={{ scale: readonly ? 1 : 0.98 }}
      style={{ cursor: readonly ? 'default' : 'move' }}
    >
      {/* Table Shape */}
      {table.type === 'round' ? (
        <motion.circle
          cx={table.position.x}
          cy={table.position.y}
          r={radius}
          fill={table.style.color}
          stroke={isSelected ? '#FFFFFF' : '#E6D4C1'}
          strokeWidth={isSelected ? 3 : 2}
          className="transition-all duration-200"
          onClick={() => onSelect(table.id)}
          whileHover={{ stroke: '#FFFFFF', strokeWidth: 3 }}
        />
      ) : (
        <motion.rect
          x={table.position.x - (tableSize as any).width / 2}
          y={table.position.y - (tableSize as any).height / 2}
          width={(tableSize as any).width}
          height={(tableSize as any).height}
          rx={8}
          fill={table.style.color}
          stroke={isSelected ? '#FFFFFF' : '#E6D4C1'}
          strokeWidth={isSelected ? 3 : 2}
          className="transition-all duration-200"
          onClick={() => onSelect(table.id)}
          whileHover={{ stroke: '#FFFFFF', strokeWidth: 3 }}
        />
      )}
      
      {/* Table Name */}
      <text
        x={table.position.x}
        y={table.position.y - 5}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium fill-white pointer-events-none"
        style={{ userSelect: 'none' }}
      >
        {table.name}
      </text>
      
      {/* Seat Count */}
      <text
        x={table.position.x}
        y={table.position.y + 8}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs fill-white opacity-80 pointer-events-none"
        style={{ userSelect: 'none' }}
      >
        {table.seats} Plätze
      </text>
      
      {/* Seat Indicators */}
      {renderSeats()}
      
      {/* Selection Indicator */}
      {isSelected && (
        <motion.circle
          cx={table.position.x}
          cy={table.position.y}
          r={radius + 15}
          fill="none"
          stroke="#6B46C1"
          strokeWidth={2}
          strokeDasharray="5,5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="pointer-events-none"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 ${table.position.x} ${table.position.y}`}
            to={`360 ${table.position.x} ${table.position.y}`}
            dur="3s"
            repeatCount="indefinite"
          />
        </motion.circle>
      )}
    </motion.g>
  );
};

export default TableComponent; 