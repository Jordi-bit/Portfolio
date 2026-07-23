import os
import re
import json
from django.conf import settings
from django.shortcuts import render

def get_project_galleries():
    static_images_dir = os.path.join(settings.BASE_DIR, 'static', 'images')
    galleries = {}
    if os.path.exists(static_images_dir):
        for folder in os.listdir(static_images_dir):
            folder_path = os.path.join(static_images_dir, folder)
            if os.path.isdir(folder_path):
                files = os.listdir(folder_path)
                capturas = [f for f in files if f.lower().startswith('captura')]
                
                def sort_key(filename):
                    match = re.search(r'captura(\d+)', filename.lower())
                    return int(match.group(1)) if match else 999
                
                capturas.sort(key=sort_key)
                if capturas:
                    galleries[folder] = [f'/static/images/{folder}/{f}' for f in capturas]
                elif 'construccion.jpg' in files:
                    galleries[folder] = [f'/static/images/{folder}/construccion.jpg']
                else:
                    galleries[folder] = ['/static/images/construccion.jpg']
    return galleries

def home(request):
    galleries = get_project_galleries()
    context = {
        'galleries_json': json.dumps(galleries)
    }
    return render(request, 'core/home.html', context)

