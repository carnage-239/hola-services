POST - https://gy75hisw1i.execute-api.ap-south-1.amazonaws.com/dev/attraction

### POST: http://localhost:8000/dev/attraction

```json
{
  "location": {
    "latitude": 13,
    "longitude": 13
  },
  "name": "",
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
