(async () => {
    try {
        const url = 'https://source.unsplash.com/1600x900/?cow';
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        console.log(`Final URL: ${res.url}`);
    } catch (e) {
        console.error(e);
    }
})();
