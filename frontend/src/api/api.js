const BASE_URL = "https://music-mode-recommendation-app.onrender.com";

export async function getModes() {
  const res = await fetch(`${BASE_URL}/api/modes`);
  return res.json();
}

export async function createMode(data) {
  const res = await fetch(`${BASE_URL}/api/modes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getSongsByMode(modeId) {
  const res = await fetch(`${BASE_URL}/api/modes/${modeId}/songs`);
  return res.json();
}

export async function addSong(modeId, data) {
  const res = await fetch(`${BASE_URL}/api/modes/${modeId}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

