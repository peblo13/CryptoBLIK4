$(document).ready(function(){
    // Konfiguracja karuzeli szablonów CV
    // ...pozostały kod bez karuzeli szablonów CV...

    // Pobieranie ofert pracy z fetch_jobs.php
    $.getJSON('fetch_jobs.php', function(data) {
        renderJobs(data.slice(0, 16));
        renderPagination(data.length);
    });

    // Funkcja renderująca oferty pracy
    function renderJobs(jobs) {
        var jobListings = $('#job-listings');
        jobListings.empty();
        $.each(jobs, function(index, job) {
            var descriptionParts = job.description.split(', ');
            var location = descriptionParts[0].split(': ')[1].replace(/"/g, '');
            var contract = descriptionParts[1].split(': ')[1].replace(/"/g, '');
            var company = descriptionParts[2].split(': ')[1].replace(/"/g, '');
            var available_from = descriptionParts[3].split(': ')[1].replace(/"/g, '');

            var jobSquare = `
                <div class="job-square">
                    <h3>${job.title}</h3>
                    <p>${location}</p>
                    <div class="job-description">
                        <p>Rodzaj umowy: ${contract}</p>
                        <p>Pracodawca: ${company}</p>
                        <p>Dostępna od: ${available_from}</p>
                        <p>${job.description}</p>
                    </div>
                </div>
            `;
            jobListings.append(jobSquare);
        });

        // Dodaj animację powiększania kwadratów
        $('.job-square').hover(function() {
            $(this).find('.job-description').slideDown();
        }, function() {
            $(this).find('.job-description').slideUp();
        });
    }

    // Funkcja renderująca paginację
    function renderPagination(totalJobs) {
        const totalPages = Math.ceil(totalJobs / 16);
        const pagination = $('#pagination');
        pagination.empty();
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = `<button class="page-btn" data-page="${i}">${i}</button>`;
            pagination.append(pageButton);
        }
    }

    // Obsługa paginacji
    $(document).on('click', '.page-btn', function() {
        const page = $(this).data('page');
        $.getJSON('fetch_jobs.php', function(data) {
            const start = (page - 1) * 16;
            const end = start + 16;
    // Globalne funkcje formularza aplikacji
    window.openApplicationForm = function(jobTitle) {
        console.log('=== OTWIERANIE FORMULARZA APLIKACJI ===');
        console.log('Tytuł pracy:', jobTitle);
        const formOverlay = document.getElementById('application-form');
        const jobTitleSpan = document.getElementById('job-title-form');
        console.log('Element formOverlay:', formOverlay);
        console.log('Element jobTitleSpan:', jobTitleSpan);
        if (formOverlay && jobTitleSpan) {
            console.log('Ustawiam tytuł pracy w formularzu...');
            jobTitleSpan.textContent = jobTitle;
            console.log('Ustawiam style wyświetlania...');
            formOverlay.style.display = 'flex';
            formOverlay.style.visibility = 'visible';
            formOverlay.style.opacity = '1';
            formOverlay.style.pointerEvents = 'auto';
            formOverlay.style.zIndex = '999999';
            console.log('Dodaję klasę form-open do body...');
            document.body.classList.add('form-open');
            console.log('✅ Formularz aplikacji otwarty pomyślnie');
            console.log('Aktualny display formularza:', formOverlay.style.display);
            console.log('Klasy na body:', document.body.className);
        } else {
            console.error('❌ Nie znaleziono elementów formularza aplikacji');
            console.error('formOverlay:', formOverlay);
            console.error('jobTitleSpan:', jobTitleSpan);
        }
    };

    window.closeApplicationForm = function() {
        console.log('=== ZAMYKANIE FORMULARZA APLIKACJI ===');
        const formOverlay = document.getElementById('application-form');
        console.log('Element formularza:', formOverlay);
        if (formOverlay) {
            console.log('Ukrywam formularz...');
            formOverlay.style.display = 'none';
            formOverlay.style.visibility = 'hidden';
            formOverlay.style.opacity = '0';
            formOverlay.setAttribute('style', 'display: none !important; visibility: hidden !important; opacity: 0 !important;');
            console.log('Usuwam klasę form-open z body...');
            document.body.classList.remove('form-open');
            const form = document.getElementById('job-application-form');
            if (form) {
                console.log('Resetuję formularz...');
                form.reset();
            }
            console.log('✅ Formularz aplikacji zamknięty pomyślnie');
            console.log('Display po zamknięciu:', formOverlay.style.display);
        } else {
            console.error('❌ Nie znaleziono elementu formularza do zamknięcia');
        }
    };
            renderJobs(data.slice(start, end));
        });
    });

    // Obsługa wyszukiwania
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const query = $('#search-input').val().toLowerCase();
        $.getJSON('fetch_jobs.php', function(data) {
            const filteredJobs = data.filter(job => {
                const descriptionParts = job.description.split(', ');
                const location = descriptionParts[0].split(': ')[1].replace(/"/g, '');
                return job.title.toLowerCase().includes(query) || location.toLowerCase().includes(query);
            });
            renderJobs(filteredJobs.slice(0, 16));
            renderPagination(filteredJobs.length);
        });
    });
});