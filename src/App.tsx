import { KeyboardComponent } from "./components";
import { useEffect, useState } from "react";
import { LayoutConfig } from "./models";

function App() {
  const [layout, setLayout] = useState<LayoutConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../test.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setLayout(jsonData);
      } catch (error) {
        console.error("Errore durante il fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  if (!layout) {
    return <div>Errore nel caricamento dei dati.</div>;
  }

  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center p-2 gap-2">
      <KeyboardComponent layout={layout.layout} layers={layout.layers} />
    </div>
  );
}

export default App;
