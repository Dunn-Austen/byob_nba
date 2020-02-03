### BYOB (Build Your Own Backend) NBA

**Involved Technologies**
- Node.js / Express
- Postgres
- Knex

**Project Summary**
- BYOB NBA was a solo student project completed within one week as an introduction to coding in the backend, specifically with regard to fetch request endpoints. 
NBA team data was downloaded from https://www.basketball-reference.com/ and reformatted into a pet-sized API with two tables (relational database). One table included information on all modern NBA teams, the other included information on all NBA champions.

**TeamsData Sample**
![image](https://user-images.githubusercontent.com/42498559/73634214-e77dd200-461d-11ea-8072-773ed4ed58cd.png)

**ChampionsData Sample**
![image](https://user-images.githubusercontent.com/42498559/73634224-f3699400-461d-11ea-9bc8-7b8ba6859852.png)

### Endpoints

| Request        | URL           | Body |
| ------------- |:-------------:| -----:|
| GET (all teams)      | /teams | N/A |
| GET (one team)     | /teams/:id      |   N/A  |
| GET (all champions) | /champions      |    N/A  |
| GET (one champion) | /champions/:id      |    N/A  |
| POST (new team) | /teams      |   {franchise: 'Las Vegas Vegans', playoff_series: 10, championships: 4,235} |
| POST (new champion) | /champions      |    {champion: 'Las Vegas Vegans', year: 2021, opponent: 'Los Angeles Lakers'} |
| DELETE (team) | /teams      |    N/A |

---

**GET all Teams**
Path:
```
/api/v1/teams
```

Sample Data:
```
[
  {
    franchise: "Atlanta Hawks",
    playoff_series: 46,
    championships: 1
  },
  {
    franchise: "Boston Celtics",
    playoff_series: 56,
    championships: 17
  }
]
```


**GET all Champions**
  Path:
```
/api/v1/champions
```
  Sample Data:
```
[
  {
    champion: "Detroit Pistons",
    Year: 2004,
    opponent: "Los Angeles Lakers",
    team_id: 1
  },
  {
    champion: "San Antonio Spurs",
    Year: 2003,
    opponent: "New Jersey Nets",
    team_id: 2
  }
]
```

**GET one Team**
  Path:
```
/api/v1/teams/:id
```

  Sample Data:
```
[
  {
    franchise: "Atlanta Hawks",
    playoff_series: 46,
    championships: 1
  }
]
```

**GET one Champion**
  Path:
```
/api/v1/champions/:id
```
  Sample Data:
```
[
  {
    champion: "San Antonio Spurs",
    Year: 2003,
    opponent: "New Jersey Nets",
    team_id: 2
  }
]
```

**POST an NBA Team**
  Path:
```
/api/v1/teams
```

  Sample Request Body Format:
```
 {franchise: 'Las Vegas Vegans', playoff_series: 10, championships: 4,235}
```

  Expected Response (Success): 
```
{ id: 3 }
```

**POST an NBA Champion**
  Path:
```
/api/v1/champions
```

  Sample Request Body Format:
```
   {champion: "San Antonio Spurs", Year: 2023, opponent: "New Jersey Nets"}
```

  Expected Response (Success): 
```
{ id: 3 }
```


**DELETE an NBA Team**
  Path:
```
/api/v1/teams
```

  Expected Response (Success): 
```
{msg: 'Successful delete'}
```

**Project Management Board**
- https://github.com/Dunn-Austen/byob_nba/projects/1
