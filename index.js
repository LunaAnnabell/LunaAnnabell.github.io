const renderSkills = async () => {
    const container = document.getElementById('skills-grid-container');
    const toggle = document.getElementById('skill-subcategory-toggle');

    if (!container || !toggle) {
        return;
    }

    try {
        const response = await fetch('skills.json');
        const skills = await response.json();
        const groupedSkills = skills.reduce((groups, skill) => {
            if (!groups[skill.category]) {
                groups[skill.category] = [];
            }
            groups[skill.category].push(skill);
            return groups;
        }, {});

        Object.entries(groupedSkills).forEach(([category, categoryItems]) => {
            const skillBox = document.createElement('div');
            skillBox.className = 'skill-box';

            const groupedSubcategories = categoryItems.reduce((groups, skill) => {
                if (!groups[skill.subcategory]) {
                    groups[skill.subcategory] = [];
                }
                groups[skill.subcategory].push(skill);
                return groups;
            }, {});

            const skillItems = Object.entries(groupedSubcategories)
                .flatMap(([subcategory, subcategoryItems]) => [
                    `<li class="skill-subcategory-heading"><span class="skill-subcategory-label">${subcategory}</span></li>`,
                    ...subcategoryItems.map((skill) => `
                        <li>
                            <a href="${skill.link}" title="Learned in: ${skill.project}" class="skill-link">
                                ${skill.name}
                            </a>
                        </li>
                    `)
                ])
                .join('');

            skillBox.innerHTML = `
                <h3>${category}</h3>
                <ul>${skillItems}</ul>
            `;
            container.appendChild(skillBox);
        });

        toggle.addEventListener('click', () => {
            const isExpanded = container.classList.toggle('show-subcategories');
            toggle.textContent = isExpanded ? 'Hide subcategories' : 'Show subcategories';
            toggle.setAttribute('aria-expanded', String(isExpanded));
        });
    } catch (error) {
        console.error('Error loading skills.json:', error);
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
