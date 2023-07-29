# DailyTrends
on this project get 5 first news of differnt newspapper and get the daily news from mongo created by user,

- stack: im used node with ts, hexagonal architecture, express and mongo.

# firsts steps:

- npm i
- npm run serve


# get collection of postman sent by email 

- get: get 5 first news of differnt newspapper and get the daily news from mongo created by user

    - http://localhost:3003/dev/getdailytrends

    - body:
        [
        "https://elpais.com/",
        "https://www.elmundo.es/"
        ]

- post: create a news in mongo
    - http://localhost:3003/dev/createnews

    - body:
        [
            {
             "title": "Motor",
            "description": "Marc Marquez vuelve con mas fuerzas que nunca"
            }
        ]


