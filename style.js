function createDefaultStyle(r, g, b) {
  var fill = new ol.style.Fill({color: ''});
  var stroke = new ol.style.Stroke({color: '', width: 1});
  var polygon = new ol.style.Style({fill: fill});
  var line = new ol.style.Style({stroke: stroke});
  var text = new ol.style.Style({text: new ol.style.Text({
    text: '', fill: fill, stroke: stroke,
    font: '11px "Open Sans", "Arial Unicode MS"'
  })});
  var styles = [];
  return function(feature, resolution) {
    var length = 0;
    var geom = feature.getGeometry().getType();
    if(geom == 'Polygon') {
      fill.setColor('rgba(' + r + ', ' + g + ', ' + b + ', 0.1)');
      styles[length++] = polygon;
    } else if (geom == 'LineString') {
      stroke.setColor('rgba(' + r + ', ' + g + ', ' + b + ', 0.5)');
      styles[length++] = line;
    } else if (geom == 'Point') {
      var name = feature.get('name')
      if(name == undefined) {
        name = feature.get('name_en')
        name = (name == undefined) ? '*' : name
      }
      text.getText().setText(name);
      fill.setColor('rgba(' + r + ', ' + g + ', ' + b + ', 0.5)');
      //stroke.setColor('rgba(255, 255, 255, 0.5)');
      //stroke.setWidth(0.5);
      styles[length++] = text;
    }
    styles.length = length;
    return styles;
  };
}
