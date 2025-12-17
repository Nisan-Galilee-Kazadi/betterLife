(async () => {
    try {
        const id = 'gL-k6-bM8q0';
        // Try download link
        const url = `https://unsplash.com/photos/${id}/download?force=true`;
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        console.log(`Final URL: ${res.url}`);
        // If 200, we can stream body
    } catch (e) {
        console.error(e);
    }
})();
