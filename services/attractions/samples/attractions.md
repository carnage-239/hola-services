POST - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction

### POST: http://localhost:8000/dev/attraction

```json
{
  "location": {
    "latitude": 13,
    "longitude": 13
  },
  "areaOfOperation": "Haryana",
  "name": "Akhada",
  "guides": [],
  "avatar": "",
  "images": []
}
```

### POST: http://localhost:8000/dev/nearby-attractions

```json
{
  "coordinates": {
    "latitude": 13,
    "longitude": 13
  },
  "radius": 10
}
```

### POST: http://localhost:8000/dev/attraction/aop

```json
{
  "aop": ["Delhi", "Haryana"]
}
```

### GET: http://localhost:8000/dev/attraction/{ID}

```json
no body
```

### PUT: http://localhost:8000/dev/attraction/guide

```json
{
  "locationID": "attraction-5e6bbb9e-8eed-458d-984b-d3e271c5d8c5",
  "guides": ["ramesh", "suresh"]
}
```

### endpoints:

- POST - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction
- POST - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/nearby-attractions
- POST - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction/aop
- GET - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction/{ID}
- PUT - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction/guide

### functions:

- registerAttraction: attractions-dev-registerAttraction
- getNearbyLocations: attractions-dev-getNearbyLocations
- fetchAttractionsUsingAOP: attractions-dev-fetchAttractionsUsingAOP
- fetchAttractionByID: attractions-dev-fetchAttractionByID
- addGuideToAttraction: attractions-dev-addGuideToAttraction
