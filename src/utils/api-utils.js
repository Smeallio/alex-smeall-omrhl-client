const API_URL = "http://localhost:5050";

export const getPlayersByTeam = (teamId) => API_URL + "/api/players/" + teamId;