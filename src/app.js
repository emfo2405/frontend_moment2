// En asynkron funktion som simulerar hämtning av data från en API
async function fetchData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Användning av den asynkrona funktionen
async function processData() {
    try {
        const result = await fetchData(); // Väntar på att data ska hämtas
        console.log('Received data:', result);
        // ... gör något med den mottagna datan
    } catch (error) {
        // Hantera fel om det uppstår vid hämtning eller bearbetning av data
    }
}
processData();