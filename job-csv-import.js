// job-csv-import.js
// Loader for job offers from praca_baza.csv using PapaParse

// Make sure PapaParse is loaded before this script
// <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>

function loadJobOffersFromCSV(csvPath, callback) {
    Papa.parse(csvPath, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            const offers = results.data.map(row => {
                const cleaned = {};
                Object.keys(row).forEach(key => {
                    const cleanKey = key.replace(/^[\s"']+|[\s"']+$/g, '');
                    let value = row[key];
                    if (typeof value === 'string') {
                        value = value.replace(/^[\s"']+|[\s"']+$/g, '');
                    }
                    cleaned[cleanKey] = value;
                });
                return cleaned;
            });
            callback(offers);
        },
        error: function(err) {
            console.error('Błąd ładowania pliku CSV:', err);
            callback([]);
        }
    });
}


