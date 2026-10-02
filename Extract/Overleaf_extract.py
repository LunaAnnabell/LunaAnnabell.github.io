import fitz  # PyMuPDF
import os

def render_pdf_to_images(pdf_path, output_folder):
    # Open the PDF file
    pdf_document = fitz.open(pdf_path)
    
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    image_count = 0
    
    # Iterate through each page of the PDF
    for page_index in range(len(pdf_document)):
        page = pdf_document[page_index]
        
        # Set zoom factor for high resolution (zoom=3 gives sharp, crisp text/vectors)
        zoom = 3.0
        mat = fitz.Matrix(zoom, zoom)
        
        # Render page to an image (pixmap)
        pix = page.get_pixmap(matrix=mat)
        
        # Save image
        image_name = f"overleaf_fig_page_{page_index + 1}.png"
        image_path = os.path.join(output_folder, image_name)
        
        pix.save(image_path)
        image_count += 1
        print(f"Rendered: {image_path}")
            
    print(f"\nRendering complete! Total figures saved: {image_count}")

# --- SETTINGS ---
# Put your Overleaf-exported PDF filename here
pdf_file = "I_ll_just_ask_ChatGPT..._Conversational_AI_as_a_sense_making_tool_for_physical_and_mental_well_being.pdf" 
output_dir = "rendered_figures"

render_pdf_to_images(pdf_file, output_dir)