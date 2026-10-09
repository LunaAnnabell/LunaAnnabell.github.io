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
        const projectsRaw = parts[3] || '';
        const featuredRaw = (parts[4] || '').toLowerCase();
        const isFeatured = featuredRaw === 'yes' || featuredRaw === 'true' || featuredRaw === '1' || featuredRaw === 'x';

        const projects = projectsRaw
            ? projectsRaw.split(/[,;|]/).map((p) => p.trim()).filter(Boolean)
            : [];

        return {
            name,
            category,
            subcategory,
            projects,
            isFeatured
        };
    }).filter((item) => item && item.name);
};

const projectLinkMap = {
    "socialengagementthroughinteractivedesign": "content/projects/Social_Engagement_Through_Interactive_Design.html",
    "beneaththeweight": "content/projects/Beneath_The_Weight.html",
    "incaseyouneedcleaning": "content/projects/In_Case_You_Need_Cleaning.html",
    "illjustaskchatgpt": "content/projects/I'll_just_ask_ChatGPT....html"
};

const renderSkills = async () => {
    const container = document.getElementById('skills-grid-container');
    const toggle = document.getElementById('skill-subcategory-toggle');

    if (!container || !toggle) {
        return;
    }

    try {
        const response = await fetch('assets/data/skills.csv');
        const csvText = await response.text();
        const skills = parseSkillsCSV(csvText);

        // Group cards by Domain (Subcategory)
        const groupedDomains = skills.reduce((groups, skill) => {
            const domain = skill.subcategory || 'General';
            if (!groups[domain]) {
                groups[domain] = [];
            }
            groups[domain].push(skill);
            return groups;
        }, {});

        container.innerHTML = '';

        Object.entries(groupedDomains).forEach(([domain, domainSkills]) => {
            const skillBox = document.createElement('div');
            skillBox.className = 'skill-box';

            // Group by Category (Hard Skills vs Soft Skills) inside domain
            const groupedByCat = domainSkills.reduce((groups, skill) => {
                const cat = skill.category || 'Hard Skills';
                if (!groups[cat]) {
                    groups[cat] = [];
                }
                groups[cat].push(skill);
                return groups;
            }, {});

            // Standard order: Hard Skills first, then Soft Skills
            const categoryOrder = ['Hard Skills', 'Soft Skills'];
            const sortedCategories = Object.keys(groupedByCat).sort((a, b) => {
                const idxA = categoryOrder.indexOf(a);
                const idxB = categoryOrder.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                return a.localeCompare(b);
            });

            const skillItems = sortedCategories
                .flatMap((cat) => {
                    const catSkills = groupedByCat[cat];

                    // Sort so featured skills appear first within category
                    const sortedCatSkills = [...catSkills].sort((a, b) => {
                        if (a.isFeatured === b.isFeatured) return 0;
                        return a.isFeatured ? -1 : 1;
                    });

                    return [
                        `<li class="skill-category-heading"><span class="skill-category-label">${cat}</span></li>`,
                        ...sortedCatSkills.map((skill) => {
                            const firstProj = skill.projects[0];
                            let linkTarget = null;

                            if (firstProj) {
                                const norm = normalizeProject(firstProj);
                                linkTarget = projectLinkMap[norm] || 'coming_soon.html';
                            }

                            const titleText = skill.projects.length > 0 
                                ? `Applied in: ${skill.projects.join(', ')}` 
                                : skill.name;

                            const extraClass = skill.isFeatured ? '' : 'skill-extra';

                            return linkTarget
                                ? `<li class="${extraClass}"><a href="${linkTarget}" title="${titleText}" class="skill-link">${skill.name}</a></li>`
                                : `<li class="${extraClass}"><span class="skill-link" title="${titleText}">${skill.name}</span></li>`;
                        })
                    ];
                })
                .join('');

            skillBox.innerHTML = `
                <h3>${domain}</h3>
                <ul>${skillItems}</ul>
            `;
            container.appendChild(skillBox);
        });

        toggle.textContent = 'Show full list';
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            const isExpanded = container.classList.toggle('show-all-skills');
            toggle.textContent = isExpanded ? 'Show selected skills' : 'Show full list';
            toggle.setAttribute('aria-expanded', String(isExpanded));
        });
    } catch (error) {
        console.error('Error loading skills.csv:', error);
    }
};

const initializeScrollReveal = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((element) => observer.observe(element));
};

renderSkills();
initializeScrollReveal();
