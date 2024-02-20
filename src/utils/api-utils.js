const API_URL = "https://oddmanrushhockey-c7e535f96e7a.herokuapp.com";

export const getPlayersByTeam = (teamId) => API_URL + "/api/players/" + teamId;
export const postPlayer = (teamId) => API_URL + "/api/players/" + teamId;
export const updatePlayer = (playerId) => API_URL + "/api/players/" + playerId;
export const deletePlayer = (playerId) => API_URL + "/api/players/" + playerId;

export const getUsers = () => API_URL + "/api/users/";
export const logInUser = () => API_URL + "/api/users/login";

export const getGames = () => API_URL + "/api/games/";
export const postGame = () => API_URL + "/api/games/";
export const getOneGame = (gameId) => API_URL + "/api/games/" + gameId;
export const updateGame = (gameId) => API_URL + "/api/games/" + gameId;
export const deleteGame = (gameId) => API_URL + "/api/games/" + gameId;

export const getStandings = () => API_URL + "/api/games/standings";

export const getSkaterStats = (gameId) => API_URL + "/api/stats/skaters/" + gameId;
export const addSkaterStat = (gameId) => API_URL + "/api/stats/skaters/" + gameId;
export const updateSkaterStat = (skaterStatId) => API_URL + "/api/stats/skaters/" + skaterStatId;
