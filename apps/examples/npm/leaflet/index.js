import 'leaflet'
import { bgLayer } from 'nlmaps-leaflet'

import 'leaflet/dist/leaflet.css'

var map = L.map('map-div').setView([52, 5], 10)

/* eslint-disable no-unused-vars */
var layer = bgLayer().addTo(map)
/* eslint-enable no-unused-vars */
