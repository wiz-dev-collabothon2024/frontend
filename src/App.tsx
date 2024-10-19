import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WidgetMenu from "./components/WidgetMenu";
import Dashboard from "./components/Dashboard";
import { getAllWidgets } from "@/types/widgetRegistry";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState(getAllWidgets());
  const [dashboardWidgets, setDashboardWidgets] = useState<
    { id: string; layout: any; component: React.FC }[]
  >([]);
  const [initialized, setInitialized] = useState(false); // Track initialization

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Function to initialize the layout after the first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100); // Small delay to ensure DOM is loaded

    return () => clearTimeout(timer);
  }, []);

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
      <div className="bg-gray-100 min-h-screen flex">
        {/* Left Sidebar with only one Button */}
        <div className="relative">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4"
            onClick={toggleMenu}
          >
            {isMenuVisible ? "Hide Menu" : "Show Menu"}
          </button>

          {/* Widget Menu slides down */}
          <div
            className={`absolute left-0 top-16 bg-gray-200 p-4 transition-all duration-500 ease-in-out ${
              isMenuVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <WidgetMenu
              availableWidgets={availableWidgets}
              isMenuVisible={isMenuVisible}
              onWidgetRemove={handleWidgetRemoveFromMenu}
            />
          </div>
        </div>

        {/* Main Dashboard Section */}
        {initialized && (
          <div
            className={`flex-1 transition-all duration-1000 p-4 ${
              isMenuVisible ? "ml-16" : ""
            }`}
          >
            <h1 className="w-full m-auto p-8 text-center text-2xl">
              Your Widgets
            </h1>
            <Dashboard
              widgets={dashboardWidgets}
              onWidgetRemove={handleWidgetRemoveFromDashboard}
              onWidgetAdd={handleWidgetAddToDashboard}
              onLayoutChange={handleLayoutChange}
              isMenuVisible={isMenuVisible}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
