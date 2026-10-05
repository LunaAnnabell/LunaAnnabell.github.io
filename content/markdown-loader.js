document.addEventListener('DOMContentLoaded', () => {
    const markdownSections = document.querySelectorAll('.markdown-content');

    markdownSections.forEach(async (section) => {
        const fileName = section.dataset.markdown;

        if (!fileName) {
            return;
        }

        try {
            const response = await fetch(fileName);

            if (!response.ok) {
                throw new Error(`Could not load markdown file: ${fileName}`);
            }

            const markdownText = await response.text();
            section.innerHTML = marked.parse(markdownText);
        } catch (error) {
            console.error('Error loading markdown content:', error);
            section.innerHTML = '<p>Unable to load project content.</p>';
        }
    });
});
