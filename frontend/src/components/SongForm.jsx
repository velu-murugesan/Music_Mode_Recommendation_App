import { useState } from "react";
import { addSong } from "../api/api";

function SongForm({ modeId, onAdd }) {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name || !artist) return;

    await addSong(modeId, { name, artist });
    setName("");
    setArtist("");
    onAdd();
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Song name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
      />
      <button>Add Song</button>
    </form>
  );
}

export default SongForm;
