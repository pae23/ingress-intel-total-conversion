// ==UserScript==
// @id             iitc-plugin-show-portals-groups@pae23
// @name           iitc: show portal groups (clusters)
// @version        0.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/show-portals-groups.user.js
// @downloadURL    https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/show-portals-groups.user.js
// @description    Group portals by clusters
// @include        http://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function')
        window.plugin = function() {
        };


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
    window.plugin.showPortalsGroups = function() {
    };

    window.plugin.showPortalsGroups.loadExternals = function() {
        var base = 'http://breunigs.github.com/ingress-intel-total-conversion/dist';
        // var base = 'http://0.0.0.0:8000/dist';
        $('head').append('<link rel="stylesheet" href="' + base + '/leaflet-markercluster.css" />');
        load(base + '/leaflet-markercluster.js').thenRun(window.plugin.showPortalsGroups.boot);
    }

    window.plugin.showPortalsGroups.boot = function() {
        //plugin.showPortalsGroups.displayGroups = new L.LayerGroup();
        plugin.showPortalsGroups.markers = new L.MarkerClusterGroup();
        plugin.showPortalsGroups.markersArray = new Array();

        window.layerChooser.addOverlay(plugin.showPortalsGroups.markers, 'Groups');
        map.addLayer(plugin.showPortalsGroups.markers);
        addHook('portalDataLoaded', window.plugin.showPortalsGroups.handlePortalDataLoaded);


    }

    window.plugin.showPortalsGroups.handlePortalDataLoaded = function(obj)
    {
        var portals = obj.portals;

        $.each(portals, function(k, portal) {
            var key = portal[1];
            if (plugin.showPortalsGroups.markersArray[key] === undefined)
            {
                plugin.showPortalsGroups.markersArray[key] = portal;

                var marker = new L.Marker(new L.LatLng(portal[2].locationE6.latE6 / 1E6, portal[2].locationE6.lngE6 / 1E6,
                        {title: portal[2].controllingTeam.team}));
                marker.bindPopup(portal[2].controllingTeam.team);
                plugin.showPortalsGroups.markers.addLayer(marker);
            }

        });



    }




    var setup = window.plugin.showPortalsGroups.loadExternals;

// PLUGIN END //////////////////////////////////////////////////////////

    if (window.iitcLoaded && typeof setup === 'function') {
        setup();
    } else {
        if (window.bootPlugins)
            window.bootPlugins.push(setup);
        else
            window.bootPlugins = [setup];
    }
}
// wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + wrapper + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
