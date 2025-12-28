import { useEffect, useState } from "react";
import { getModes, getSongsByMode } from "./api/api";
import ModeForm from "./components/ModeForm";
import ModeList from "./components/ModeList";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";

function App() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    loadModes();
  }, []);



  async function loadModes() {
    const data = await getModes();
    setModes(data);
  }

  async function selectMode(mode) {

      console.log("SELECTED MODE ID:", mode._id);

    setSelectedMode(mode);
  const data = await getSongsByMode(mode._id);

   console.log("SONGS FROM API:", data);

  if (Array.isArray(data)) {
    setSongs(data);
  } else {
    setSongs([]);
  }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Music Mode Recommendation</h2>

      <ModeForm onAdd={loadModes} />
      <ModeList modes={modes} onSelect={selectMode} />

      {selectedMode && (
        <>
          <h3>Songs in {selectedMode.name}</h3>
          <SongForm modeId={selectedMode._id} onAdd={() => selectMode(selectedMode)} />
          <SongList songs={songs} />
        </>
      )}
    </div>
  );
}

export default App;

