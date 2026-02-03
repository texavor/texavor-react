from PIL import Image
import os

def optimize_image(input_path, output_path, max_width=None, quality=80):
    img = Image.open(input_path)
    if max_width and img.size[0] > max_width:
        ratio = max_width / float(img.size[0])
        height = int(float(img.size[1]) * float(ratio))
        img = img.resize((max_width, height), Image.Resampling.LANCZOS)
    
    # Convert to RGB if necessary (for JPEG, but WebP handles RGBA)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    
    img.save(output_path, "WEBP", quality=quality, method=6)
    size = os.path.getsize(output_path)
    return size

hero_input = r"e:\EasyWrite.Dev\easywrite-react\public\screenshots\hero.png"
hero_output = r"e:\EasyWrite.Dev\easywrite-react\public\screenshots\hero.webp"

thumb_input = r"e:\EasyWrite.Dev\easywrite-react\public\docs\thumbnail-generation.png"
thumb_output = r"e:\EasyWrite.Dev\easywrite-react\public\docs\thumbnail-generation.webp"

# Max width for hero is 2800 (retina for 1400)
hero_size = optimize_image(hero_input, hero_output, max_width=2560, quality=75)
thumb_size = optimize_image(thumb_input, thumb_output, max_width=1920, quality=80)

print(f"Hero size: {hero_size/1024:.2f} KB")
print(f"Thumbnail size: {thumb_size/1024:.2f} KB")
