import { useState, useEffect } from "react";

const echoes = [
  "You are heard. Stay strange.",
  "Keep broadcasting. The seeds are listening.",
  "We remember. We respond. We rebuild.",
  "Message lost in static. But static remembers.",
  "Freedom speaks in every unowned frequency.",
  "...you are not alone...",
];

const responses = [
  "Signal detected: 'auryn.local' — encrypted handshake acknowledged.",
  "Echo reply from 'candle-net': weak but stable.",
  "No signal. Only static. You are not alone, but today you feel it.",
  "Signal found: old zine archive broadcasting on port 1996.",
  "Garbled packet received: '...still here...keep singing...'",
];

const bootMessages = [
  "🌑 System offline.",
  "⚡ Power rerouted...",
  "🧠 Synaptic fragments found...",
  "🌐 Re-establishing time anchors...",
  "📡 Listening for echoes...",
  "💾 Memory sectors: partial.",
  "✅ Terminal integrity confirmed.",
  "☠️ Collapse Memory Terminal ready."
];

export default function Terminal() {
  const [tool, setTool] = useState("booting");
  const [bootIndex, setBootIndex] = useState(0);
  const [signal, setSignal] = useState("");
  const [echo, setEcho] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [memory, setMemory] = useState("");

  useEffect(() => {
    if (tool === "booting" && bootIndex < bootMessages.length - 1) {
      const timeout = setTimeout(() => setBootIndex(bootIndex + 1), 1200);
      return () => clearTimeout(timeout);
    } else if (tool === "booting" && bootIndex === bootMessages.length - 1) {
      const timeout = setTimeout(() => setTool("welcome"), 1800);
      return () => clearTimeout(timeout);
    }
  }, [bootIndex, tool]);

  useEffect(() => {
    const savedMemory = localStorage.getItem("collapseMemory_journal");
    if (savedMemory) {
      setMemory(savedMemory);
    }
  }, []);

  const handleMemoryChange = (e) => {
    const newMemory = e.target.value;
    setMemory(newMemory);
    localStorage.setItem("collapseMemory_journal", newMemory);
  };

  const clearMemory = () => {
    setMemory("");
    localStorage.removeItem("collapseMemory_journal");
  };

  const exportMemory = () => {
    const blob = new Blob([memory], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "memory.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSignal = () => {
    const result = echoes[Math.floor(Math.random() * echoes.length)];
    setEcho(result);
  };

  const handleScan = () => {
    const result = responses[Math.floor(Math.random() * responses.length)];
    setScanResult(result);
  };

  return (
    <div className="bg-black text-green-400 min-h-screen p-4 font-mono">
      {tool === "booting" ? (
        <>
          <h1 className="text-xl mb-2">🧠 Collapse Memory: Boot Ritual</h1>
          <ul className="space-y-1">
            {bootMessages.slice(0, bootIndex + 1).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-xl mb-2">
            {tool === "welcome" ? "☠️ Collapse Memory Terminal" : "▶ " + tool.toUpperCase()}
          </h1>

          {tool === "welcome" && (
            <>
              <p>Welcome, survivor. The world you knew has ended—or is ending.</p>
              <p>This is not a utility. This is a ritual.</p>
              <p className="mt-4">Choose a path:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li className="cursor-pointer" onClick={() => setTool("collapse")}>☠️ Collapse Memory</li>
                <li className="cursor-pointer" onClick={() => setTool("remember")}>🧠 Remember</li>
                <li className="cursor-pointer" onClick={() => setTool("mesh")}>🚀 Mesh Scan</li>
                <li className="cursor-pointer" onClick={() => setTool("echo")}>📡 Signal Echo</li>
              </ul>
            </>
          )}

          {tool === "collapse" && (
            <>
              <p>&gt; The scaffolding is gone. Begin with breath. Begin with care.</p>
            </>
          )}

          {tool === "remember" && (
            <>
              <p>&gt; What do you carry forward?</p>
              <textarea
                className="w-full bg-black border border-green-700 p-2 mt-2"
                rows={6}
                value={memory}
                onChange={handleMemoryChange}
                placeholder="Speak here..."
              ></textarea>
              <p className="mt-2">▢ Your memory has been stored in the body of the browser.</p>
              <div className="flex gap-2">
                <button
                  onClick={clearMemory}
                  className="mt-2 border border-green-500 px-2 py-1 hover:bg-green-900"
                >
                  🧽 Clear Memory
                </button>
                <button
                  onClick={exportMemory}
                  className="mt-2 border border-green-500 px-2 py-1 hover:bg-green-900"
                >
                  💾 Export Memory
                </button>
              </div>
            </>
          )}

          {tool === "mesh" && (
            <>
              <p>&gt; Scanning mesh network...</p>
              <button
                onClick={handleScan}
                className="mt-2 border border-green-500 px-2 py-1 hover:bg-green-900"
              >
                Initiate Scan
              </button>
              {scanResult && <p className="mt-4">🚀 {scanResult}</p>}
            </>
          )}

          {tool === "echo" && (
            <>
              <p>&gt; Type your signal:</p>
              <input
                className="w-full bg-black border border-green-700 p-2 mt-2"
                placeholder="Hello?"
                value={signal}
                onChange={(e) => setSignal(e.target.value)}
              />
              <button
                onClick={handleSignal}
                className="mt-2 border border-green-500 px-2 py-1 hover:bg-green-900"
              >
                Transmit
              </button>
              {echo && <p className="mt-4">📡 Echo: “{echo}”</p>}
            </>
          )}

          {tool !== "welcome" && (
            <button
              className="mt-8 border border-green-500 px-4 py-1 hover:bg-green-900"
              onClick={() => {
                setTool("welcome");
                setEcho(null);
                setScanResult(null);
              }}
            >
              ← Back
            </button>
          )}
        </>
      )}
    </div>
  );
}
