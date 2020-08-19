import L from 'leaflet'

export const useLeaflet = ({
  latitude,
  longitude,
  id,
}: {
  latitude: number
  longitude: number
  id: string
}) => {
  const map = L.map(id).setView([latitude, longitude], 15)

  const pinIcon = L.icon({
    iconUrl:
      'https://res.cloudinary.com/kiyopikko/image/upload/v1561616038/marker_di3ojx.svg',
    shadowUrl:
      'https://res.cloudinary.com/kiyopikko/image/upload/v1561616038/marker-shadow_cpdzbh.png',
    iconSize: [18, 25],
    iconAnchor: [0, 0],
    shadowSize: [26, 20],
    shadowAnchor: [0, -5],
  })

  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    id: 'streets',
  }).addTo(map)

  L.marker([latitude, longitude], { icon: pinIcon }).addTo(map)
}
