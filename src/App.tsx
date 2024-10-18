import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./components/Dashboard";
import WidgetMenu from "./components/WidgetMenu";

const App: React.FC = () => {
  const handleWidgetDrop = () => {
    // You can add additional logic here if needed
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-gray-100">
        {/* Side Menu Section */}
        <aside className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl mb-2">Available Widgets</h2>
          <WidgetMenu onWidgetDrop={handleWidgetDrop} />
        </aside>

        {/* Main Dashboard Section */}
        <div className="flex-1">
          <header className="flex justify-between bg-gray-800 text-white p-4">
            <div className="logo">COMMERZBANK</div>
            <nav>
              <ul className="flex space-x-4">
                <li>Privatkunden</li>
                <li>Unternehmenskunden</li>
                <li>Firmenkunden</li>
              </ul>
            </nav>
            <div className="top-right">
              <span>Kontakt</span>
              <span>photoTAN</span>
            </div>
          </header>
          <h1 className="w-auto m-auto p-8 text-center text-2xl">
            Your widgets
          </h1>
          <Dashboard />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
