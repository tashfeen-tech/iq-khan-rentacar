from bing_image_downloader import downloader
import os
import shutil

cars = [
    ("changan karvaan white car isolated transparent png", "changan-karvaan.png"),
    ("suzuki apv white car isolated transparent png", "suzuki-apv.png"),
    ("toyota coaster bus white isolated transparent png", "toyota-coaster.png"),
    ("toyota prius white auto isolated transparent png", "toyota-prius.png"),
    ("toyota vitz white hatchback car isolated transparent png", "toyota-vitz.png"),
    ("honda hr-v white car isolated transparent png", "honda-hrv.png"),
]

for query, filename in cars:
    try:
        downloader.download(query, limit=1, output_dir='bing_cars', force_replace=False, timeout=10)
        # Find downloaded file
        dir_name = os.path.join('bing_cars', query)
        files = os.listdir(dir_name)
        if files:
            source = os.path.join(dir_name, files[0])
            dest = os.path.join('public', 'cars', filename)
            shutil.copyfile(source, dest)
            print(f"Copied {filename} to public/cars")
    except Exception as e:
        print(f"Failed to process {query}: {e}")
