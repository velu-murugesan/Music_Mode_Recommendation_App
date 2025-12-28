import { useState } from "react";
import { createMode } from "../api/api";

function ModeForm({ onAdd }) {
  const [name, setName] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name) return;

    await createMode({ name });
    setName("");
    onAdd();
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Mode name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button>Add Mode</button>
    </form>
  );
}

export default ModeForm;

