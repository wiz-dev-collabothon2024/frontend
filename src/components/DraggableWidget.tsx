// import React from "react";
// import { useDrag } from "react-dnd";

// interface DraggableWidgetProps {
//   widget: { id: string; title: string };
//   onRemove: () => void;
// }

// const DraggableWidget: React.FC<DraggableWidgetProps> = ({
//   widget,
//   onRemove,
// }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "WIDGET",
//     item: { id: widget.id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div ref={drag} className={`p-2 ${isDragging ? "bg-gray-200" : ""}`}>
//       <h3 className="text-lg">{widget.title}</h3>
//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//         onClick={onRemove}
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// export default DraggableWidget;
