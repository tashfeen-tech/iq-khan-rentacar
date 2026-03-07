import os
import requests
import json
from duckduckgo_search import DDGS

cars = [
    ("Toyota Corolla Altis white car png transparent background", "toyota-corolla-altis.png"),
    ("Toyota Land Cruiser V8 white car png transparent background", "toyota-land-cruiser-v8.png"),
    ("Hyundai Sonata white car png transparent background", "hyundai-sonata.png"),
    ("Hyundai Elantra white car png transparent background", "hyundai-elantra.png"),
    ("Audi A6 white car png transparent background", "audi-a6.png"),
    ("KIA Carnival white car png transparent background", "kia-carnival.png"),
    ("Changan Karvaan white car png transparent background", "changan-karvaan.png"),
    ("Suzuki APV white car png transparent background", "suzuki-apv.png"),
    ("Toyota Coaster bus white png transparent background", "toyota-coaster.png"),
    ("Toyota Prius white car png transparent background", "toyota-prius.png"),
    ("Toyota Vitz white car png transparent background", "toyota-vitz.png"),
    ("Honda HR-V white car png transparent background", "honda-hrv.png"),
]

def main():
    ddgs = DDGS()
    for query, filename in cars:
        print(f"Searching for {query}...")
        try:
            results = list(ddgs.images(query, max_results=3))
            if results:
                for res in results:
                    url = res['image']
                    print(f"Downloading {url} for {filename}...")
                    try:
                        r = requests.get(url, timeout=10)
                        if r.status_code == 200:
                            path = os.path.join("public", "cars", filename)
                            with open(path, "wb") as f:
                                f.write(r.content)
                            print(f"Successfully saved {filename}")
                            break
                    except Exception as e:
                        print(f"Failed to download {url}: {e}")
        except Exception as e:
            print(f"Failed to search for {query}: {e}")

if __name__ == "__main__":
    main()
