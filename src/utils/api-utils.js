const API_URL = "http://localhost:5050";

export const getPlayersByTeam = (teamId) => API_URL + "/api/players/" + teamId;
export const postPlayer = (teamId) => API_URL + "/api/players/" + teamId;
export const updatePlayer = (playerId) => API_URL + "/api/players/" + playerId;
export const deletePlayer = (playerId) => API_URL + "/api/players/" + playerId;
