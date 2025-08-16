// Funkcja importu ofert pracy z pliku CSV
function loadJobOffersFromCSV(fileInputId) {
    const fileInput = document.getElementById(fileInputId);
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert('Nie wybrano pliku CSV!');
        return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        const offers = rows.slice(1).filter(row => row.trim() !== '').map(row => {
            const values = row.split(',');
            let offer = {};
            headers.forEach((header, i) => {
                offer[header.trim()] = values[i] ? values[i].trim() : '';
            });
            return offer;
        });
        // Tutaj możesz wyświetlić lub przetworzyć oferty
        console.log('Zaimportowane oferty:', offers);
        // Możesz dodać kod do wyświetlania ofert na stronie
    };
    reader.readAsText(file, 'UTF-8');
}

// Przykład użycia:
// <input type="file" id="csvFileInput" accept=".csv" onchange="loadJobOffersFromCSV('csvFileInput')">
// job-csv-import.js
// Loader for job offers from praca_baza.csv using PapaParse

// Make sure PapaParse is loaded before this script
// Funkcja do importu ofert pracy z pliku CSV przez input[type=file]
function importCSV() {
    const input = document.getElementById('csvFileInput');
    if (!input || !input.files.length) {
        alert('Wybierz plik CSV!');
        return;
    }
    const file = input.files[0];
    Papa.parse(file, {
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
            console.log('Zaimportowane oferty:', offers);
            // Możesz tutaj wywołać funkcję wyświetlającą oferty na stronie
        },
        error: function(err) {
            console.error('Błąd ładowania pliku CSV:', err);
        }
    });
}


