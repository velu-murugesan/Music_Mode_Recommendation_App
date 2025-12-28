function SongList({ songs }) {

      console.log("Songs received by SongList:", songs);

  if (!Array.isArray(songs)) {
    return <p>No songs available</p>;
  }

     if (songs.length === 0) {
    return <p>No songs found</p>;
  }

  return (
    <ul>
      {songs.map(song => (
        <li key={song._id}>
          {song.name} — {song.artist}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
