const loadProjectSkills = async () => {
    const skillsContainer = document.getElementById('project-skills');
    const projectName = skillsContainer?.dataset.projectName;

    if (!skillsContainer || !projectName) {
        return;
    }

    try {
        const response = await fetch('../../assets/data/skills.json');
        const skills = await response.json();
        const projectSkills = skills.filter((skill) => skill.project === projectName);

        projectSkills.forEach((skill) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'tag';
            skillTag.textContent = skill.name;
            skillsContainer.appendChild(skillTag);
        });
    } catch (error) {
        console.error('Error loading project skills:', error);
    }
};

loadProjectSkills();
