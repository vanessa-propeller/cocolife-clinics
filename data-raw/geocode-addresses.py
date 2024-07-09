from geopy.geocoders import Nominatim
import json
geolocator = Nominatim(user_agent="GoogleMaps")

with open("cocolife-clinics-2024-06.json") as my_file:
    data = my_file.read()

    clinics = json.loads(data)

    for clinic in clinics: 
        location = geolocator.geocode(clinic["address"])
        print(location)

# location = geolocator.geocode("1120 SANTA RITA ROAD, OLONGAPO CITY")
# print(location.address)
