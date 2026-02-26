import urllib.request
import urllib.parse
import json
import os
import ssl
import sys

ssl._create_default_https_context = ssl._create_unverified_context

cars = [
    ("Suzuki Cultus", "suzuki-cultus.png"),
    ("Maruti Suzuki Wagon R", "suzuki-wagon-r.png"),
    ("Suzuki Swift", "suzuki-swift.png"),
    ("Honda City", "honda-city.png"),
    ("Toyota Corolla", "toyota-corolla.png"),
    ("Changan Alsvin", "changan-alsvin.png"),
    ("Honda BR-V", "honda-brv.png"),
    ("Hyundai Tucson", "hyundai-tucson.png"),
    ("Kia Sportage", "kia-sportage.png"),
    ("Toyota Fortuner", "toyota-fortuner.png"),
    ("Toyota Land Cruiser Prado", "toyota-prado.png")
]

def fetch_image(car_name, filename):
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(car_name)}"
    print(f"Fetching {car_name} via {url}", flush=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id in pages:
                if 'original' in pages[page_id]:
                    img_url = pages[page_id]['original']['source']
                    if not (img_url.endswith('.png') or img_url.endswith('.jpg') or img_url.endswith('.jpeg')):
                        continue
                    print(f"Downloading {car_name} from {img_url}...", flush=True)
                    img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                    with urllib.request.urlopen(img_req, timeout=5) as img_resp:
                        with open(os.path.join("public/cars", filename), 'wb') as f:
                            f.write(img_resp.read())
                    print(f"Saved {filename}", flush=True)
                    return True
    except Exception as e:
        print(f"Failed for {car_name}: {e}", flush=True)
    return False

for car, filename in cars:
    if not os.path.exists(os.path.join("public/cars", filename)):
        success = fetch_image(car, filename)
        if not success:
            print(f"Could not find image for {car}, trying fallback...", flush=True)
            fallback_url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(car + ' car')}&prop=pageimages&format=json&piprop=original&gsrlimit=3"
            req = urllib.request.Request(fallback_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            try:
                with urllib.request.urlopen(req, timeout=5) as response:
                    data = json.loads(response.read().decode())
                    if 'query' in data and 'pages' in data['query']:
                        pages = data['query']['pages']
                        for page_id in pages:
                            if 'original' in pages[page_id]:
                                img_url = pages[page_id]['original']['source']
                                if not (img_url.endswith('.png') or img_url.endswith('.jpg') or img_url.endswith('.jpeg')):
                                    continue
                                print(f"Downloading fallback {car} from {img_url}...", flush=True)
                                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                                with urllib.request.urlopen(img_req, timeout=5) as img_resp:
                                    with open(os.path.join("public/cars", filename), 'wb') as f:
                                        f.write(img_resp.read())
                                print(f"Saved {filename}", flush=True)
                                break
            except Exception as e:
                print(f"Fallback failed for {car}: {e}", flush=True)
