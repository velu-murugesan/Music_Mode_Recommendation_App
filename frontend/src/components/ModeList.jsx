function ModeList({ modes, onSelect }) {
  return (
    <ul>
      {modes.map(mode => (
        <li key={mode._id}>
          <button onClick={() => onSelect(mode)}>
            {mode.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ModeList;
