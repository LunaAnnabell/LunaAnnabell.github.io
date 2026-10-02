import fitz  # PyMuPDF
import io
from PIL import Image
import os

def extract_images_from_pdf(pdf_path, output_folder):
    # Check if the PDF file exists
    if not os.path.exists(pdf_path):
        print(f"Error: The file '{pdf_path}' was not found.")
        return

    # Open the PDF file
    pdf_document = fitz.open(pdf_path)
    
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    image_count = 0
    
    # Iterate through each page
    for page_index in range(len(pdf_document)):
        page = pdf_document[page_index]
        image_list = page.get_images(full=True)
        
        # Iterate through each image found on the page
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]  # e.g., 'jpeg', 'png'
            
            # Load image to PIL and save
            try:
                image = Image.open(io.BytesIO(image_bytes))
                image_name = f"extracted_p{page_index + 1}_{img_index + 1}.{image_ext}"
                image_path = os.path.join(output_folder, image_name)
                
                image.save(image_path)
                image_count += 1
                print(f"Saved: {image_path}")
            except Exception as e:
                print(f"Could not save image {img_index} on page {page_index + 1}: {e}")
            
    print(f"\nExtraction complete! Total images saved: {image_count}")

# --- SETTINGS ---
# Change this to match the name of the PDF you want to extract from
pdf_file = "Foto_2023-07-15_175110pdf" 
output_dir = "Realistic"

extract_images_from_pdf(pdf_file, output_dir)