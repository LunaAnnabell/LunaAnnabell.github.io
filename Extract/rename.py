import os
import uuid

def rename_all_projects(base_dir):
    categories = {
        "main": "Main",
        "figure": "Figure",
        "image": "Image",
        "screenshot": "Screenshot",
        "evaluation": "Evaluation",
        "portfolio": "Portfolio",  # Corrected key for proper file naming
        "code": "Code",
        "hyperrealistic": "Hyperrealistic",
         "multi": "Multi",
          "sculpture": "Sculpture",
    }
    
    grand_total_renamed = 0

    if not os.path.exists(base_dir):
        print(f"Error: The directory '{base_dir}' does not exist.")
        return

    projects = [p for p in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, p))]

    for project in projects:
        project_path = os.path.join(base_dir, project)
        project_tag = project.lower().replace(" ", "_")
        print(f"\n--- Processing project: {project} (Tag: {project_tag}) ---")

        for category_tag, folder_name in categories.items():
            folder_path = os.path.join(project_path, folder_name)
            
            if not os.path.exists(folder_path):
                continue
                
            files = sorted(os.listdir(folder_path))
            
            temp_files = []
            for filename in files:
                ext = os.path.splitext(filename)[1].lower()
                if ext in ['.png', '.jpg', '.jpeg', '.webp']:
                    unique_temp_name = f"temp_{uuid.uuid4().hex}{ext}"
                    old_path = os.path.join(folder_path, filename)
                    temp_path = os.path.join(folder_path, unique_temp_name)
                    
                    try:
                        os.rename(old_path, temp_path)
                        temp_files.append((temp_path, ext))
                    except Exception as e:
                        print(f"  Skipping file {filename}: {e}")

            counter = 1
            for temp_path, ext in temp_files:
                new_name = f"{project_tag}_{category_tag}_{counter:02d}{ext}"
                new_path = os.path.join(folder_path, new_name)
                
                try:
                    os.rename(temp_path, new_path)
                    print(f"  Renamed [{folder_name}]: -> {new_name}")
                    counter += 1
                    grand_total_renamed += 1
                except Exception as e:
                    print(f"  Could not rename to {new_name}: {e}")

    print(f"\n==========================================")
    print(f"All done! Total files renamed across all projects: {grand_total_renamed}")

# Using absolute path to ensure it finds your 'Finished' folder instantly
base_target_dir = "Portfolio"
rename_all_projects(base_target_dir)