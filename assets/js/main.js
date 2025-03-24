---
---

{% include js/conference.js %}

window.conference.awaitReady().then(() => {
    const map = window.conference.map.getMap();

    if (typeof map !== 'undefined') {
        let wills = L.marker([51.45634176133822, -2.604533169022713], {
            icon: L.divIcon({
                className: '',
                html: '<span class="fas fa-graduation-cap"></span> Wills Memorial Building',
                iconSize: [120, 56]
            })
        }).addTo(map);
        let temple_meads = L.marker([51.44949548980121, -2.580592219808902], {
            icon: L.divIcon({
                className: '',
                html: '<span class="fas fa-train"></span> Bristol Temple Meads',
                iconSize: [120, 56]
            })
        }).addTo(map);
    }
});

function toggleCollapse(button) {
    // Get the dropdown content associated with the button
    var dropdownContent = button.nextElementSibling;

    // Toggle the display of the content
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
        dropdownContent.style.display = "block";  // Show the content
        button.setAttribute("aria-expanded", "true");
    } else {
        dropdownContent.style.display = "none";  // Hide the content
        button.setAttribute("aria-expanded", "false");
    }
}