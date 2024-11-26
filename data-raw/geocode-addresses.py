from geopy.geocoders import Nominatim
import json
geolocator = Nominatim(user_agent="OpenStreetMap")

with open("cocolife-clinics-2024-06-trial.json") as my_file:
    data = my_file.read()

    clinics = json.loads(data)

    for clinic in clinics: 
        location = geolocator.geocode(clinic["address"])
        if location != None:
            print(f"{clinics.index(clinic)}: {clinic["providerName"]} {location.longitude}, {location.latitude}")
        
        clinic["location"] = [location.latitude, location.longitude]
        
with open('test.json', "w") as f:
        json.dump(clinics, f)
# location = geolocator.geocode("1120 SANTA RITA ROAD, OLONGAPO CITY")
# print(location.address)
# print(location.latitude)
