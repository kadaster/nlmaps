import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import { bgLayer, geoLocatorControl, markerLayer, overlayLayer } from 'nlmaps-ol'
import geoLocator from 'nlmaps-geolocator'

import 'ol/ol.css'

const map = new Map({
  target: 'map-div',
  view: new View({
    center: fromLonLat([5.5, 52.5]),
    zoom: 10
  })
})

let layer = bgLayer()
let overlay = overlayLayer('gemeenten')
let marker = markerLayer({ longitude: 5.5, latitude: 52.5 })
let geo = geoLocator()
let geolocator = geoLocatorControl(geo, map)
map.addLayer(layer)
map.addLayer(overlay)
map.addLayer(marker)
map.addControl(geolocator)
