import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WidgetMenu from "./components/WidgetMenu";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-100 min-h-screen">
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={toggleMenu}
            >
              {isMenuVisible ? "Hide Menu" : "Show Menu"}
            </button>
          </div>
        </header>

        <div className="flex w-full">
          {/* WidgetMenu and Dashboard inside the same div */}
          {isMenuVisible && (
            <div className="w-1/7 bg-gray-200 p-4">
              <h2 className="text-xl mb-2">Available Widgets</h2>
              <WidgetMenu />
            </div>
          )}

          <div
            className={`flex-1 ${
              isMenuVisible ? "w-4/6" : "w-full"
            } transition-all duration-300 p-4`}
          >
            <h1 className="w-full m-auto p-8 text-center text-2xl">
              Your Widgets
            </h1>
            <Dashboard />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
