import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WidgetMenu from "./components/WidgetMenu";
import Dashboard from "./components/Dashboard";
import { getAllWidgets } from "@/types/widgetRegistry";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [availableWidgets, setAvailableWidgets] = useState(getAllWidgets());
  const [dashboardWidgets, setDashboardWidgets] = useState<
    { id: string; layout: any; component: React.FC }[]
  >([]);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Function to remove widget from menu when dropped onto the dashboard
  const handleWidgetRemoveFromMenu = (id: string) => {
    setAvailableWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  };

  // Function to add widget back to the menu when removed from dashboard
  const handleWidgetReturnToMenu = (id: string) => {
    const widgetToReturn = getAllWidgets().find((widget) => widget.id === id);
    if (widgetToReturn) {
      setAvailableWidgets((prevWidgets) => [...prevWidgets, widgetToReturn]);
    }
  };

  // Function to remove a widget from the dashboard
  const handleWidgetRemoveFromDashboard = (id: string) => {
    setDashboardWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
    handleWidgetReturnToMenu(id); // Return widget to the menu
  };

  // Add widget to the dashboard when dropped
  const handleWidgetAddToDashboard = (
    id: string,
    layout: any,
    component: React.FC
  ) => {
    setDashboardWidgets((prev) => [
      ...prev,
      {
        id,
        layout: { ...layout, i: id }, // Ensure the unique `i` is set to `id`
        component,
      },
    ]);
  };

  // Update widget layout on change
  const handleLayoutChange = (newLayout: any) => {
    setDashboardWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const updatedLayout = newLayout.find((l: any) => l.i === widget.id);
        return updatedLayout ? { ...widget, layout: updatedLayout } : widget;
      })
    );
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
              <WidgetMenu
                availableWidgets={availableWidgets}
                onWidgetRemove={handleWidgetRemoveFromMenu}
              />
            </div>
          )}

          <div
            className={`flex-1 ${
              isMenuVisible ? "w-4/6" : "w-full"
            } transition-all duration-1000 p-4`}
          >
            <h1 className="w-full m-auto p-8 text-center text-2xl">
              Your Widgets
            </h1>
            <Dashboard
              widgets={dashboardWidgets}
              onWidgetRemove={handleWidgetRemoveFromDashboard}
              onWidgetAdd={handleWidgetAddToDashboard}
              onLayoutChange={handleLayoutChange} // Pass down layout change handler
              isMenuVisible={isMenuVisible}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
