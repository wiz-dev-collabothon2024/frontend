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
  const [initialized, setInitialized] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleWidgetRemoveFromMenu = (id: string) => {
    setAvailableWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  };

  const handleWidgetReturnToMenu = (id: string) => {
    const widgetToReturn = getAllWidgets().find((widget) => widget.id === id);
    if (widgetToReturn) {
      setAvailableWidgets((prevWidgets) => [...prevWidgets, widgetToReturn]);
    }
  };

  const handleWidgetRemoveFromDashboard = (id: string) => {
    setDashboardWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
    handleWidgetReturnToMenu(id);
  };

  const handleWidgetAddToDashboard = (
    id: string,
    layout: any,
    component: React.FC
  ) => {
    setDashboardWidgets((prev) => [
      ...prev,
      {
        id,
        layout: { ...layout, i: id },
        component,
      },
    ]);
  };

  const handleLayoutChange = (newLayout: any) => {
    setDashboardWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const updatedLayout = newLayout.find((l: any) => l.i === widget.id);
        return updatedLayout ? { ...widget, layout: updatedLayout } : widget;
      })
    );
  };

  return (
    <div className=" min-h-screen">
      <DndProvider backend={HTML5Backend}>
        {/* Header Section */}
        <header className="bg-[#274340] text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div>
              <img src="public/"></img>
            </div>
            {/* Navigation */}
            <nav className="flex space-x-6 text-2xl">
              <a href="#" className="hover:underline">
                Privatkunden
              </a>
              <a href="#" className="hover:underline">
                Unternehmenskunden
              </a>
              <a href="#" className="hover:underline">
                Firmenkunden
              </a>
            </nav>
          </div>
          <div className="text-right flex items-center space-x-4">
            {/* Placeholder for additional icons/text if needed */}
            <span className="text-2xl font-semibold">Kontakt</span>
            <span className="text-2xl font-semibold">photoTAN</span>
          </div>
        </header>

        {/* Main Layout */}
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <div className="absolute">
            <button
              className="bg-gradient-to-t from-[#d6ecef] to-[#dbf3df] text-primary px-4 py-2 rounded-lg shadow-lg hover:bg-primary-dark m-4"
              onClick={toggleMenu}
            >
              {isMenuVisible ? "Edit" : " Edit"}
            </button>

            <div
              className={`absolute left-0 top-16 bg-white shadow-lg rounded-lg p-4 transition-all duration-500 ease-in-out ${
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

          {/* Dashboard Section */}
          {initialized && (
            <div className={"flex-1 transition-all duration-1000 "}>
              <h1 className="w-full m-auto pb-2 text-center text-2xl text-header font-bold">
                Your Widgets
              </h1>
              <div className="w-4/5 pt-4 m-auto rounded-3xl shadow-lg bg-gradient-to-t from-[#d6ecef] to-[#dbf3df]">
                <Dashboard
                  widgets={dashboardWidgets}
                  onWidgetRemove={handleWidgetRemoveFromDashboard}
                  onWidgetAdd={handleWidgetAddToDashboard}
                  onLayoutChange={handleLayoutChange}
                  isMenuVisible={isMenuVisible}
                />
              </div>
            </div>
          )}
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
