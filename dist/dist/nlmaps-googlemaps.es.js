function httpGetAsync(e){return new Promise((t,o)=>{var r=new XMLHttpRequest;r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t(JSON.parse(r.responseText))};r.open("GET",e,!0);r.send(null)})}function wktPointToGeoJson(e){if(!e.includes("POINT"))throw TypeError("Provided WKT geometry is not a point.");const t=e.split("(")[1].split(")")[0];return{type:"Point",coordinates:[parseFloat(t.split(" ")[0]),parseFloat(t.split(" ")[1])]}}function wmsBaseUrl(e){return"https://geodata.nationaalgeoregister.nl/"+e+"/wms?"}function mapWmsProvider(e,t){const o={workSpaceName:"",layerName:"",styleName:"",url:"",minZoom:0,maxZoom:24};switch(e){case"gebouwen":o.workSpaceName="bag",o.layerName="pand",o.styleName="";break;case"percelen":o.workSpaceName="kadastralekaartv3",o.layerName="kadastralekaart",o.styleName="";break;case"drone-no-fly-zones":o.workSpaceName="dronenoflyzones",o.layerName="luchtvaartgebieden,landingsite",o.styleName="";break;case"hoogte":o.workSpaceName="ahn2",o.layerName="ahn2_05m_int",o.styleName="ahn2:ahn2_05m_detail";break;case"gemeenten":o.workSpaceName="bestuurlijkegrenzen",o.layerName="gemeenten",o.styleName="bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen";break;case"provincies":o.workSpaceName="bestuurlijkegrenzen",o.layerName="provincies",o.styleName="bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen";break;default:o.url=t.url,o.layerName=t.layerName,o.styleName=t.styleName}return""===o.url&&(o.url=wmsBaseUrl(o.workSpaceName)),o}function makeWmsProvider(e,t){const o=mapWmsProvider(e,t);return{url:o.url,service:"WMS",version:"1.1.1",request:"GetMap",layers:o.layerName,styles:o.styleName,transparent:!0,format:"image/png"}}function baseUrl(e){return`https://geodata.nationaalgeoregister.nl/${"luchtfoto"===e?lufostring:brtstring}/wmts/`}function mapLayerName(e){let t;switch(e){case"standaard":t="brtachtergrondkaart";break;case"grijs":t="brtachtergrondkaartgrijs";break;case"pastel":t="brtachtergrondkaartpastel";break;case"luchtfoto":t="Actueel_ortho25";break;default:t="brtachtergrondkaart"}return t}function makeProvider(e,t,o,r){const n=baseUrl(e),a=mapLayerName(e);return{bare_url:[n,a,servicecrs].join(""),url:[n,a,servicecrs,"/{z}/{x}/{y}.",t].join(""),format:t,minZoom:o,maxZoom:r,attribution:attr,name:`${"luchtfoto"===e?"":"NLMaps "} ${e}`}}function getProvider(e){if(e in BASEMAP_PROVIDERS){var t=BASEMAP_PROVIDERS[e];return t.deprecated&&console&&console.warn&&console.warn(e+" is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference."),t}console.error("NL Maps error: You asked for a style which does not exist! Available styles: "+Object.keys(PROVIDERS).join(", "))}function getWmsProvider(e,t){let o;return e in WMS_PROVIDERS?(o=WMS_PROVIDERS[e]).deprecated&&console&&console.warn&&console.warn(e+" is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference."):(o=makeWmsProvider(e,t),console.log("NL Maps: You asked for a wms which does not exist! Available wmses: "+Object.keys(WMS_PROVIDERS).join(", ")+". Provide an options object to make your own WMS.")),o}function AttributionControl(e,t){if("object"===("undefined"==typeof google?"undefined":_typeof(google))&&"object"===_typeof(google.maps)){var o=document.createElement("div");o.style.backgroundColor="#fff",o.style.opacity="0.7",o.style.border="2px solid #fff",o.style.cursor="pointer",e.appendChild(o);var r=document.createElement("div");return r.style.color="rgb(25,25,25)",r.style.fontFamily="Roboto,Arial,sans-serif",r.style.fontSize="10px",r.innerHTML=t,o.appendChild(r),e.index=1,e}throw"google is not defined"}function geoLocatorControl(e,t){var o=document.createElement("div");return o.id="nlmaps-geolocator-control",o.innerHTML=geolocator_icon,o.style.backgroundColor="#fff",o.style.cursor="pointer",o.style.boxShadow="0 1px 5px rgba(0, 0, 0, 0.65)",o.style.height="26px",o.style.width="26px",o.style.borderRadius="26px 26px",o.style.margin=".5em",o.addEventListener("click",function(){e.start()},this),e.on("position",function(e){t.setCenter({lat:e.coords.latitude,lng:e.coords.longitude})}),o}function zoomTo(e,t){t.setCenter({lat:e.coordinates[1],lng:e.coordinates[0]}),t.setZoom(18)}function indexOfMapControl(e,t){return e.getArray().indexOf(t)}function toggleAttrControl(e,t){var o=t.getMapTypeId(),r=t.controls[google.maps.ControlPosition.BOTTOM_RIGHT],n=indexOfMapControl(r,e);"roadmap"===o||"hybrid"===o||"sattelite"===o?n>-1&&r.removeAt(n):-1===n&&r.push(e)}function makeGoogleAttrControl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,t=arguments[1],o=new AttributionControl(document.createElement("div"),t);e.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(o),e.addListener("maptypeid_changed",function(){return toggleAttrControl(o,e)})}function makeGoogleLayerOpts(e){return{getTileUrl:function(t,o){return e.bare_url+"/"+o+"/"+t.x+"/"+t.y+".png"},tileSize:new google.maps.Size(256,256),isPng:!0,name:e.name,maxZoom:e.maxZoom,minZoom:e.minZoom}}function getWmsTiledOptions(e){return{baseUrl:e.url,layers:e.layers,styles:e.styles,format:e.format,transparent:e.transparent,opacity:.7}}function bgLayer(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"standaard";if("object"===("undefined"==typeof google?"undefined":_typeof(google))&&"object"===_typeof(google.maps)){var o=getProvider(t),r=makeGoogleLayerOpts(o),n=new google.maps.ImageMapType(r),a=e||this.map||"undefined";return void 0!==a&&makeGoogleAttrControl(a,o.attribution),n}throw"google is not defined"}function toMercator(e){var t=e.lat(),o=e.lng();if(!(Math.abs(o)>180||Math.abs(t)>90)){var r=.017453292519943295*t;return{x:6378137*(.017453292519943295*o),y:3189068.5*Math.log((1+Math.sin(r))/(1-Math.sin(r)))}}}function WMSTiled(e,t){var o={getTileUrl:function(o,r){var n=e.getProjection(),a=Math.pow(2,r),s=n.fromPointToLatLng(new google.maps.Point(256*o.x/a,256*o.y/a)),i=n.fromPointToLatLng(new google.maps.Point(256*(o.x+1)/a,256*(o.y+1)/a)),l=toMercator(s),c=toMercator(i),d=l.x+","+c.y+","+c.x+","+l.y,u=t.baseUrl;return u+="SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:3857",u+="&WIDTH=256",u+="&HEIGHT=256",u+="&LAYERS="+t.layers,u+="&STYLES="+t.styles,u+="&BBOX="+d,u+="&FORMAT="+t.format,u+="&TRANSPARENT="+t.transparent},tileSize:new google.maps.Size(256,256),isPng:!0},r=new google.maps.ImageMapType(o);return r.setOpacity(t.opacity),e.overlayMapTypes.push(r)}function overlayLayer(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,t=new WMSTiled(e,getWmsTiledOptions(getWmsProvider(arguments[1],arguments[2])));return t.name="wms",t}function markerLayer(e){var t=void 0,o=void 0;if(void 0===e){var r=getMapCenter(map);t=r.latitude,o=r.longitude}else t=e.latitude,o=e.longitude;var n=new google.maps.LatLng(t,o);return new google.maps.Marker({title:"marker",position:n,icon:markerUrl})}function getMapCenter(e){return{latitude:e.getCenter().lat(),longitude:e.getCenter().lng()}}function geocoderControl(e){var t=geocoder.createControl(zoomTo,e);e.getDiv().appendChild(t)}const geocoder={suggestUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",lookupUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"};geocoder.doSuggestRequest=function(e){return httpGetAsync(`${this.suggestUrl}q=${encodeURIComponent(e)}`)},geocoder.doLookupRequest=function(e){return httpGetAsync(`${this.lookupUrl}id=${encodeURIComponent(e)}`).then(e=>{const t=e.response.docs[0];t.centroide_ll=wktPointToGeoJson(t.centroide_ll);t.centroide_rd=wktPointToGeoJson(t.centroide_rd);return t})},geocoder.createControl=function(e,t){this.zoomTo=e,this.map=t;const o=document.createElement("div"),r=document.createElement("div"),n=document.createElement("input"),a=document.createElement("div");return o.style.width="300px",o.style.zIndex=1e6,o.style.position="absolute",o.style.top="15px",o.style.left="12px",n.id="nlmaps-geocoder-control-input",n.placeholder="Zoeken op adres...",n.style.padding="4px 10px",n.style.width="100%",n.style.border="none",n.style.backgroundColor="#fff",n.style.boxShadow="0 1px 5px rgba(0, 0, 0, 0.65)",n.style.height="26px",n.style.borderRadius="5px 5px",n.addEventListener("input",e=>{this.suggest(e.target.value)}),n.addEventListener("focus",e=>{this.suggest(e.target.value)}),a.id="nlmaps-geocoder-control-results",a.style.width="300px",o.appendChild(r),r.appendChild(n),o.appendChild(a),o},geocoder.suggest=function(e){if(e.length<4)return void this.clearSuggestResults();this.doSuggestRequest(e).then(e=>{this.showSuggestResults(e.response.docs)})},geocoder.lookup=function(e){this.doLookupRequest(e).then(e=>{this.zoomTo(e.centroide_ll,this.map);this.showLookupResult(e.weergavenaam);this.clearSuggestResults()})},geocoder.clearSuggestResults=function(){document.getElementById("nlmaps-geocoder-control-results").innerHTML=""},geocoder.showLookupResult=function(e){document.getElementById("nlmaps-geocoder-control-input").value=e},geocoder.showSuggestResults=function(e){const t=document.createElement("ul");t.style.padding="10px 10px 2px 10px",t.style.width="100%",t.style.background="#FFFFFF",t.style.borderRadius="5px 5px",t.style.boxShadow="0 1px 5px rgba(0, 0, 0, 0.65)",e.forEach(e=>{const o=document.createElement("li");o.innerHTML=e.weergavenaam;o.id=e.id;o.style.cursor="pointer";o.style.padding="5px";o.style.listStyleType="none";o.style.marginBottom="5px";o.addEventListener("click",e=>{this.lookup(e.target.id)});o.addEventListener("mouseenter",()=>{o.style.background="#6C62A6";o.style.color="#FFFFFF"});o.addEventListener("mouseleave",()=>{o.style.background="#FFFFFF";o.style.color="#333"});t.appendChild(o)}),this.clearSuggestResults(),document.getElementById("nlmaps-geocoder-control-results").appendChild(t)};const WMS_PROVIDERS={gebouwen:makeWmsProvider("gebouwen"),percelen:makeWmsProvider("percelen"),"drone-no-fly-zones":makeWmsProvider("drone-no-fly-zones"),hoogte:makeWmsProvider("hoogte"),gemeenten:makeWmsProvider("gemeenten"),provincies:makeWmsProvider("provincies")},lufostring="luchtfoto/rgb",brtstring="tiles/service",servicecrs="/EPSG:3857",attr='Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>',BASEMAP_PROVIDERS={standaard:makeProvider("standaard","png",6,19),pastel:makeProvider("pastel","png",6,19),grijs:makeProvider("grijs","png",6,19),luchtfoto:makeProvider("luchtfoto","jpeg",6,19)},geolocator_icon=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1"\nxmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999">\n<metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>\n<dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/><circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>`,markerUrl="https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};export{bgLayer,overlayLayer,markerLayer,getMapCenter,geoLocatorControl,geocoderControl};
