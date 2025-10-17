// Enhanced Location Search with MapTiler
class LocationSearch {
    constructor() {
        this.apiKey = typeof maptilerKey !== 'undefined' ? maptilerKey : '';
        this.debounceTimeout = null;
        console.log('LocationSearch initialized with API key:', this.apiKey ? 'Yes (' + this.apiKey.substring(0, 10) + '...)' : 'No');
        this.init();
    }

    init() {
        const locationInput = document.getElementById('location');
        if (!locationInput) {
            console.error('Location input not found');
            return;
        }

        console.log('Location input found, setting up event listeners');

        locationInput.addEventListener('input', (e) => {
            this.handleLocationInput(e.target.value);
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#location-suggestions') && e.target.id !== 'location') {
                this.hideSuggestions();
            }
        });

        // Add Enter key prevention to avoid form submission during search
        locationInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    handleLocationInput(query) {
        clearTimeout(this.debounceTimeout);
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        this.debounceTimeout = setTimeout(() => {
            this.searchLocations(query);
        }, 500);
    }

    async searchLocations(query) {
        try {
            if (!this.apiKey) {
                console.warn('MapTiler API key not found');
                this.showError('Map service temporarily unavailable');
                return;
            }

            console.log('Searching for:', query);
            const response = await fetch(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${this.apiKey}&limit=5`
            );
            
            if (!response.ok) {
                throw new Error('Geocoding API request failed: ' + response.status);
            }
            
            const data = await response.json();
            console.log('Found locations:', data.features);
            this.showSuggestions(data.features);
        } catch (error) {
            console.error('Location search failed:', error);
            this.showError('Location search temporarily unavailable: ' + error.message);
        }
    }

    showSuggestions(features) {
        const container = document.getElementById('location-suggestions');
        if (!container) {
            console.error('Suggestions container not found');
            return;
        }

        if (!features || features.length === 0) {
            this.hideSuggestions();
            this.showError('No locations found. Try a different search term.');
            return;
        }

        container.innerHTML = features.map(feature => `
            <button type="button" class="list-group-item list-group-item-action" 
                    data-location="${feature.place_name}"
                    data-lat="${feature.center[1]}"
                    data-lng="${feature.center[0]}">
                <strong>${feature.text}</strong><br>
                <small class="text-muted">${feature.place_name}</small>
            </button>
        `).join('');

        // Add click handlers
        container.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectLocation(e.currentTarget);
            });
        });

        container.style.display = 'block';
        console.log('Showing suggestions:', features.length);
    }

    selectLocation(button) {
        const locationInput = document.getElementById('location');
        const latInput = document.getElementById('latitude');
        const lngInput = document.getElementById('longitude');
        const confirmation = document.getElementById('location-confirmation');

        const location = button.getAttribute('data-location');
        const lat = button.getAttribute('data-lat');
        const lng = button.getAttribute('data-lng');

        console.log('Selected location:', location, 'Coords:', lat, lng);

        locationInput.value = location;
        latInput.value = lat;
        lngInput.value = lng;

        // Show confirmation message
        if (confirmation) {
            confirmation.style.display = 'block';
            confirmation.innerHTML = `<i class="fas fa-check-circle"></i> Location confirmed: ${location}`;
        }

        this.hideSuggestions();
        
        // Mark the field as valid
        locationInput.classList.remove('is-invalid');
        locationInput.classList.add('is-valid');
    }

    hideSuggestions() {
        const container = document.getElementById('location-suggestions');
        if (container) {
            container.style.display = 'none';
        }
    }

    showError(message) {
        // Simple error display
        const container = document.getElementById('location-suggestions');
        if (container) {
            container.innerHTML = `<div class="list-group-item list-group-item-danger">${message}</div>`;
            container.style.display = 'block';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing LocationSearch...');
    new LocationSearch();
});