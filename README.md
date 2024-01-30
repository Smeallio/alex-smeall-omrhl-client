# Project Title

**The Official Website for the [Odd Man Rush Hockey League](https://www.facebook.com/profile.php?id=61550747964046)**

## Overview

I play in a recreational ice hockey league in St. John's, Newfoundland. As a new league (founded in 2023) it lacks some of the bells and whistles of some of the more established leagues in our city or anywhere else in the world for that matter. One of those things is its own official website. 

Furthermore, there may be an opportunity to expand this into a platform that services recreational sports league managers in a similar fashion to how Shopify helps small retailers implement an eCommerce store with minimal technical know-how. 

### Problem

Every major Canadian city (and many others globally) has dozens or even hundreds of recreational sports leagues. Many of these leagues are run off a combination of social media apps, messaging apps and spreadsheets to keep track of schedules, rosters, stats and league fees. This is confusing, inefficient, and does not present these leagues to the members in a professional manner. 

### User Profile

In most of these leagues, the people running them are doing so part-time on top of their full-time job and often it's in a volunteer capacity. These are usually not people with technical skills, and even if they do have them, they are not in a position to maintain a fully functional website. They need something plug and play to help organize their league while making it look organized and professional at the same time. 

### Features

- A homepage with some nice graphics, a summary of recent games, upcoming games and a feed of recent announcements. 
- A teams page for each team that shows off the roster of each team including names, positions, numbers and stats. It will also include a table summarizing previous game results as well as the upcoming schedule. 
- League managers will get logins that provide the ability to create, update and delete players, games and announcements. 

## Implementation

### Tech Stack

- React app
- Node.js as the backend 
- MYSQL for the database
- Knex.js for the query builder

### APIs

Nothing external for this phase. 

### Sitemap

- Homepage
- Teams pages x 4
- Backend login for league managers to enter data

### Mockups

**Homepage**

![Homepage mockup](./app/assets/images/OMRHL-homepage-mockup.png)

**Team Page**

![Team page mockup](./app/assets/images/OMRHL-team-page-mockup.png)

**Login Page**

![Login page mockup](./app/assets/images/OMRHL-signin-mockup.png)

**Data Updates and Entry Page**

This will be available to authenticated and authorized users only. 

![Data entry page mockup](./app/assets/images/OMRHL-dataentry-mockup.png)

### Data

- Each team will include player details such as names, numbers and positions. 
- Each team will then need a stats table that tracks games played, goals, assists, penalties, etc. 
- Game results will need to update the standings accordingly. The standings table will track datapoints such as wins, losses, ties and points. 

### Endpoints

**GET /players**

The plan is to populate the stats portion of this table by summarizing rows from the GAMES table.

```
{
    "id": 1,
    "name": "Alex Smeall (C)",
    "number": 21,
    "position": "F",
    "games": 11,
    "goals": 9,
    "assists": 12,
    "points": 21,
    "penalties": 3
}
```

**POST /players**

The categories not shown here will all default to 0, except the ID which will be a unique number not already in use. 

```
{
    "name": "New Guy",
    "number": 99,
    "position": "F",
}
```

**PUT /players/:id**

The statistics may only be editable via the games PUT

```
{
    "name": "New Guy",
    "number": 99,
    "position": "F",
    "games": 2,
    "goals": 3,
    "assists": 2,
    "points": 5,
    "penalties": 1
}
```

**DELETE /players/:id**

```
{
    "name": "Must match player name"
}
```

**GET /games**

```
{
    "id": 1,
    "date": "January 2, 2024 @ 10pm",
    "status": "complete",
    "team1": {
        "name": "Fogtown Leprechauns",
        "score": 8,
        "players": {
            "id": 1,
            "name": "Alex Smeall"
            "goals": 1,
            "assists": 1,
            "penalties": 1
        },
        {
            "id": 2,
            "name": "New Guy"
            "goals": 1,
            "assists": 0,
            "penalties": 0
        }
    },
    "team2": {
        "name": "Mighty Moose",
        "score": 8,
        "players": {
            "id": 55,
            "name": "Johnny Hockey"
            "goals": 0,
            "assists": 1,
            "penalties": 1
        },
        {
            "id": 56,
            "name": "Gordie Puck"
            "goals": 2,
            "assists": 1,
            "penalties": 0
        }
    }

}
```

**POST /games**

```
{
    "date": "January 9, 2024 @ 9pm",
    "status": "pending",
    "team1": {
        "name": "Fogtown Leprechauns"
    }
    "team2": {
        "name": "Kraken Beers"
    }

}
```

**PUT /games/:id**

```
{
    "date": "January 9, 2024 @ 9pm",
    "team1": {
        "name": "Fogtown Leprechauns",
        "score": 7,
        "players": {
            "id": 1,
            "name": "Alex Smeall"
            "goals": 0,
            "assists": 2,
            "penalties": 0
        },
        {
            "id": 2,
            "name": "New Guy"
            "goals": 1,
            "assists": 1,
            "penalties": 1
        }
    },
    "team2": {
        "name": "Kraken Beers",
        "score": 9,
        "players": {
            "id": 22,
            "name": "Jimmy Dangles"
            "goals": 2,
            "assists": 1,
            "penalties": 0
        },
        {
            "id": 23,
            "name": "Donnie Shooter"
            "goals": 3,
            "assists": 1,
            "penalties": 1
        }
    }

}
```

**DELETE /players/:id**

```
{
    "date": "Must match date of the game"
}
```

**GET /accouncements**

```
{
    "id": 1,
    "title": "Holiday Break",
    "date": timestamp,
    "body": "Next Tuesday, December 19th will mark our final games for this calendar year. We will resume on Tuesday, January 2nd. We hope everyone has a great holidays!"
}
```

**POST /accouncements**

```
{
    "title": "Title",
    "date": timestamp,
    "body": "Placeholder text"
}
```

**PUT /accouncements/:id**

```
{
    "title": "Title",
    "date": timestamp,
    "body": "Placeholder text"
}
```

**DELETE /accouncements/:id**

```
{
    "date": "Must match date of the game"
}
```

### Auth

This will need to have a login that reveals a page where league managers can add players, delete players, update player information, add game information, update game information, delete game information, add announcements, update announcements and delete announcements. 

## Roadmap

1. Build out homepage layout with static mock data
2. Build out team pages with static mock data
3. Setup database tables to collect per game results, team info and announcements
4. Configure database to dynamically populate the data on the homepage and teams pages

## Nice-to-haves

Initially this will focus on creating a website for my league specifically as proof of concept. Ideally, it will include the functionality so that someone who is non technical can load in game results and those will dynamically flow to the rest of the pages. If all goes very well, I can then start looking into if this has potential as a platform. 
