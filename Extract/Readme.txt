# PDF Image Extraction & Renaming Tools

This folder contains Python scripts designed to extract embedded images from PDF project reports and automatically organize/rename them for portfolio use.

## Prerequisites

Make sure you have Python installed, along with the required libraries. Run this in your terminal:

pip install PyMuPDF Pillow

---

## 1. Extracting Images from a PDF (`extract_images.py`)

This script scans a target PDF file page by page, extracts all embedded raster images (photos, figures, diagrams), and saves them into an output folder.

### How to use:
1. Place the PDF file you want to extract from in the same directory as the script.
2. Open `extract_images.py` and update the `pdf_file` variable with your PDF's exact filename:
   pdf_file = "Your_Project_Report.pdf"
3. Run the script in your terminal:
   python extract_images.py

All extracted images will be saved automatically into the `extracted_images/` folder.

---

## 2. Categorizing and Bulk Renaming (`rename.py`)

This script loops through your project folders, cleans up file names, and numbers them sequentially based on specific categories (Main, Figure, Image, Screenshot, Evaluation, Code).

### Recommended Folder Structure:
extracted_images/
├── Project_Name_1/
│   ├── Main/        (Put your hero/primary image here)
│   ├── Figure/      (Put charts/diagrams here)
│   ├── Screenshot/  (Put app or interface screenshots here)
│   └── Code/        (Put code snippet images here)
└── Project_Name_2/
    └── Figure/

### How to use:
1. Organize your extracted images into subfolders matching your categories inside each project folder.
2. Run the renaming script in your terminal:
   python rename.py

The script will automatically detect each project folder, convert project names into clean lowercase tags, and rename files following this structure:
-> `projecttag_category_01.png` (e.g., `balancing_n_a_s_figure_01.png`)