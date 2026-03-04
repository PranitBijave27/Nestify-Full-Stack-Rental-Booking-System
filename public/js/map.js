async function renderMap(){
    const address=listing.location;
    console.log(address);
    try{
        const response=await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
        );
        const data=await response.json();
        if(data.length >0){
            const lat=data[0].lat;
            const lon=data[0].lon;
            const map=L.map('map',{
                minZoom:5,
                maxZoom:15
            }).setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OSM'
            }).addTo(map);

            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
                .openPopup();
        }else{
            document.getElementById('map').innerHTML = "<p class='p-3 text-muted'>Location map unavailable</p>";
        }
    }catch(error){
        console.error("Map error",error);
    }
}

renderMap()
