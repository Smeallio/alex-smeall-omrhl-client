const API_URL = "https://oddmanrushhockey-c7e535f96e7a.herokuapp.com";

export const getPlayersByTeam = (teamId) => API_URL + "/api/players/team/" + teamId;
export const postPlayer = (teamId) => API_URL + "/api/players/team/" + teamId;
export const updatePlayer = (playerId) => API_URL + "/api/players/player/" + playerId;
export const deletePlayer = (playerId) => API_URL + "/api/players/player/" + playerId;

export const getUsers = () => API_URL + "/api/users/";
export const logInUser = () => API_URL + "/api/users/login";

export const getGames = () => API_URL + "/api/games/";
export const getRegSeasonGames = () => API_URL + "/api/games/season";
export const getPlayoffGames = () => API_URL + "/api/games/playoffs";
export const postGame = () => API_URL + "/api/games/";
export const getOneGame = (gameId) => API_URL + "/api/games/" + gameId;
export const updateGame = (gameId) => API_URL + "/api/games/" + gameId;
export const deleteGame = (gameId) => API_URL + "/api/games/" + gameId;

export const getStandings = () => API_URL + "/api/games/standings";

export const getAllSkaterStats = () => API_URL + "/api/stats/skaters/summary/";
export const getAllPlayoffSkaterStats = () => API_URL + "/api/stats/skaters/summary/playoffs";
export const getSkaterStatsByGame = (gameId) => API_URL + "/api/stats/skaters/" + gameId;
export const getSkaterStatsByTeam = (teamId) => API_URL + "/api/stats/skaters/summary/" + teamId;
export const getPlayoffSkaterStatsByTeam = (teamId) => API_URL + "/api/stats/skaters/summary/playoffs/" + teamId;
export const addSkaterStat = (gameId) => API_URL + "/api/stats/skaters/" + gameId;
export const updateSkaterStat = (skaterStatId) => API_URL + "/api/stats/skaters/" + skaterStatId;
export const deleteSkaterStat = (skaterStatId) => API_URL + "/api/stats/skaters/" + skaterStatId;

export const getAllGoalieStats = () => API_URL + "/api/stats/goalies/summary/"
export const getAllPlayoffGoalieStats = () => API_URL + "/api/stats/goalies/summary/playoffs";
export const getGoalieStatsByGame = (gameId) => API_URL + "/api/stats/goalies/" + gameId;
export const getGoalieStatsByTeam = (teamId) => API_URL + "/api/stats/goalies/summary/" + teamId;
export const getPlayoffGoalieStatsByTeam = (teamId) => API_URL + "/api/stats/goalies/summary/playoffs/" + teamId;
export const addGoalieStat = (gameId) => API_URL + "/api/stats/goalies/" + gameId;
export const updateGoalieStat = (goalieStatId) => API_URL + "/api/stats/goalies/" + goalieStatId;
export const deleteGoalieStat = (goalieStatId) => API_URL + "/api/stats/goalies/" + goalieStatId;

export const getAnnouncements = () => API_URL + '/api/announcements/';
export const postAnnouncement = () => API_URL + '/api/announcements/';
export const updateAnnouncement = (announcementId) => API_URL + '/api/announcements/' + announcementId;
export const deleteAnnouncement = (announcementId) => API_URL + '/api/announcements/' + announcementId;