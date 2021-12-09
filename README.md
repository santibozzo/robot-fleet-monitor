# Robot fleet monitor
Robot fleet monitor using Node.js, MongoDB, RabbitMQ, React.

## Node version

Tested with v.12.13.0, should work with anything newer.

## Install dependencies

```console
cd robotsim-back
npm install
```

## MongoDB
Install MongoDB Community Server (Optional you can also get MongoDB Compass for a GUI).
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Tested with 4.4.3)

## RabbitMQ
Install RabbitMQ Server.
- [RabbitMQ Server](https://rabbitmq.com/download.html) (Tested with 3.9.11)


## Settings
You can change the project setting in src/settings.json
- **rabbitUrl**: RabbitMQ's url
- **serverPort**: Port for express server
- **dbHost**: Host of MongoDB Server
- **dbPort**: Port of MongoDB Server
- **startSim**: If it should start the robot simulation (true/false)
- **realTimeCloseCalls**: If it should only keep actual closeCalls (actual tick) or keep all of them
 (previous ticks) (true/false)
- **locationsAmount**: Amount of locations

## API

### GET:/locations
Returns all locations IDs.
```
http://localhost:8080/location

[
    "1",
    "2",
    "3",
    ...
]
```

### GET:/robots
Returns all robots with actual state.  Accepts `locationId` query param.
```
http://localhost:8080/robots

[
    {
        "id": "14228_5",
        "x": 11,
        "y": -1,
        "location": "72",
        "battery": 35.94489888539472,
        "mode": "MISSION",
        "status": "OK"
    },
    { ... }
]
```

### GET:/robots/:id
Returns robot with given id.
```
http://localhost:8080/robots/14228_5

{
    "id": "14228_5",
    "x": 11,
    "y": -1,
    "location": "72",
    "battery": 35.94489888539472,
    "mode": "MISSION",
    "status": "OK"
}
```

### GET:/battery-anomalies
Returns all battery anomalies. Accepts `locationId` query param.
```
http://localhost:8080/battery-anomalies

[
    {
        "robotId": "6568_82",
        "location": "2",
        "oldBatteryCharge": 65.23586594732443,
        "newBatteryCharge": 13.321448402172301,
        "errorMessage": "Abrupt battery charge change",
        "time": "2021-02-15T23:17:47.340Z"
    },
    { ... }
]
```

### GET:/close-calls
Returns all close calls. Accepts `locationId` query param.
```
http://localhost:8080/close-calls

[
    {
        "closeRobots":[
            "14228_56"
        ],
        "robotId": "6568_96",
        "x": 0,
        "y": 0,
        "location": "27"
    },
    { ... }
]
```