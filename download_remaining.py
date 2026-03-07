import os
import requests
import time
from duckduckgo_search import DDGS

cars = [
    ("Changan Karvaan white van isolated png", "changan-karvaan.png"),
    ("Suzuki APV car isolated png", "suzuki-apv.png"),
    ("Toyota Coaster bus white isolated png", "toyota-coaster.png"),
    ("Toyota Prius car isolated png", "toyota-prius.png"),
    ("Toyota Vitz hatchback white isolated png", "toyota-vitz.png"),
    ("Honda HR-V white car isolated png", "honda-hrv.png"),
]

def main():
    ddgs = DDGS()
    for query, filename in cars:
        print(f"Searching for {query}...")
        try:
            results = list(ddgs.images(query, max_results=2))
            if results:
                url = results[0]['image']
                print(f"Downloading {url} for {filename}...")
                try:
                    r = requests.get(url, timeout=10)
                    if r.status_code == 200:
                        path = os.path.join("public", "cars", filename)
                        with open(path, "wb") as f:
                            f.write(r.content)
                        print(f"Successfully saved {filename}")
                except Exception as e:
                    print(f"Failed to download {url}: {e}")
            time.sleep(5)
        except Exception as e:
            print(f"Failed to search for {query}: {e}")
            time.sleep(10)

if __name__ == "__main__":
    main()
