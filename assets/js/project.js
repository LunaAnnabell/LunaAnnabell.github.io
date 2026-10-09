const normalizeProject = (str) => {
    return (str || '')
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]/g, '');
};

const parseSkillsCSV = (csvText) => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const delimiter = lines[0].includes(';') ? ';' : ',';

    return lines.slice(1).map((line) => {
        if (!line.trim()) return null;
        const parts = line.split(delimiter).map((p) => p.trim());
        const name = parts[0] || '';
        const category = parts[1] || 'Hard Skills';
        const subcategory = parts[2] || 'General';
        const projectsRaw = parts.slice(3).join(delimiter);

        const projects = projectsRaw
            ? projectsRaw.split(/[,;|]/).map((p) => p.trim()).filter(Boolean)
            : [];

        return {
            name,
            category,
            subcategory,
            projects
        };
    }).filter((item) => item && item.name);
};

const loadProjectSkills = async () => {
    const skillsContainer = document.getElementById('project-skills');
    const projectName = skillsContainer?.dataset.projectName;

    if (!skillsContainer || !projectName) {
        return;
    }

    // Auto-detect relative path whether in root or in a subfolder
    const isSubfolder = window.location.pathname.includes('/content/projects/');
    const csvPath = isSubfolder ? '../../assets/data/skills.csv' : 'assets/data/skills.csv';

    try {
        const response = await fetch(csvPath);
        const csvText = await response.text();
        const skills = parseSkillsCSV(csvText);

        const targetNorm = normalizeProject(projectName);

        const projectSkills = skills.filter((skill) =>
            skill.projects.some((p) => normalizeProject(p) === targetNorm)
        );

        skillsContainer.innerHTML = '';
        projectSkills.forEach((skill) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'tag';
            skillTag.textContent = skill.name;
            skillsContainer.appendChild(skillTag);
        });
    } catch (error) {
        console.error('Error loading project skills from CSV:', error);
    }
};

loadProjectSkills();
