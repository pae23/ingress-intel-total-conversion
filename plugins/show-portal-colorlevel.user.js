// ==UserScript==
// @id             iitc-plugin-show-portal-colorlevel@pae23
// @name           iitc: show portal color level in the center of the circle, border represents faction.
// @version        0.2
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/show-portal-colorlevel.user.js
// @downloadURL    https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/show-portal-colorlevel.user.js
// @description    Use the fill color of the portals to show the portal level and the border color for the team
// @include        http://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin

// This plugin is forked from iitc-plugin-show-portal-weakness@vita10gy

window.plugin.portalColorLevel = function() {};

window.plugin.portalColorLevel.portalAdded = function(data) {
  
      var fill_color = COLORS_LVL[Math.floor(data.portal.options.level)];
      var fill_opacity = 1;
      var params = {fillColor: fill_color, fillOpacity: fill_opacity};
      data.portal.setStyle(params);
    }


var setup =  function() {
  window.addHook('portalAdded', window.plugin.portalColorLevel.portalAdded);
}


// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
