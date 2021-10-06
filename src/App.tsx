import React, { useState, useRef } from "react";
import "./App.css";

interface Tab {
  id: string;
  label: string;
  panelContent: JSX.Element;
}

function App() {
  const tabs: Tab[] = [
    {
      id: "single",
      label: "Single",
      panelContent: <div>Single contributions</div>,
    },
    {
      id: "monthly",
      label: "Monthly",
      panelContent: <div>Monthly contributions</div>,
    },
    {
      id: "annual",
      label: "Annual",
      panelContent: <div>Annual contributions</div>,
    },
    {
      id: "digi-sub",
      label: "Digital Subscription",
      panelContent: <div>Digital subscription</div>,
    },
  ];

  return (
    <div className="App">
      <Tabs tabs={tabs} />
    </div>
  );
}

// ----- Consts ----- //

const KEYS = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

// ----- Props ----- //

interface TabsProps {
  tabs: Tab[];
}

// ----- Components ----- //

function Tabs({ tabs }: TabsProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  function focusTab(index: number) {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll("button");

      buttons[index].focus();
    }
  }

  function handleKeyDown(index: number) {
    return function (event: React.KeyboardEvent<HTMLButtonElement>) {
      switch (event.key) {
        case KEYS.UP:
        case KEYS.LEFT:
          focusTab(wrap(index - 1, tabs.length));
          break;
        case KEYS.DOWN:
        case KEYS.RIGHT:
          focusTab(wrap(index + 1, tabs.length));
          break;
      }
    };
  }

  return (
    <div>
      <div role="tablist" ref={ref}>
        {tabs.map((tab, index) => (
          <button
            role="tab"
            id={`${tab.id}-tab`}
            aria-controls={`${tab.id}-tabpanel`}
            aria-selected={selectedTabIndex === index}
            tabIndex={selectedTabIndex === index ? 0 : -1}
            onKeyDown={handleKeyDown(index)}
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          role="tabpanel"
          id={`${tab.id}-tabpanel`}
          aria-labelledby={`${tab.id}-tab`}
          tabIndex={0}
          hidden={selectedTabIndex !== index}
        >
          {tab.panelContent}
        </div>
      ))}
    </div>
  );
}

// ----- Utils ----- //

function wrap(value: number, max: number) {
  if (value < 0) {
    return max + value;
  }
  return value % max;
}

export default App;
