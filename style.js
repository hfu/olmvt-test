function createMapboxStreetsV6Style() {
  var fill = new ol.style.Fill({color: ''});
  var stroke = new ol.style.Stroke({color: '', width: 1});
  var polygon = new ol.style.Style({fill: fill});
  var strokedPolygon = new ol.style.Style({fill: fill, stroke: stroke});
  var line = new ol.style.Style({stroke: stroke});
  var text = new ol.style.Style({text: new ol.style.Text({
    text: '', fill: fill, stroke: stroke
  })});
  var icon = new ol.style.Style({image: new ol.style.Icon({
    src: 'https://cdn.rawgit.com/mapbox/maki/master/icons/' + 'circle-stroked-11.svg',
    imgSize: [11, 11]})});
  var styles = [];
  return function(feature, resolution) {
    var length = 0;
    var layer = feature.get('layer');
    var cls = feature.get('class');
    var type = feature.get('type');
    var scalerank = feature.get('scalerank');
    var labelrank = feature.get('labelrank');
    var maki = feature.get('maki');
    var geom = feature.getGeometry().getType();
    if (layer == 'landuse') {
      fill.setColor('#d8e8c8');
      styles[length++] = polygon;
    } else if (layer == 'waterway') {
      stroke.setColor('#a0c8f0');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'water') {
      fill.setColor('#a0c8f0');
      styles[length++] = polygon;
    } else if (layer == 'aeroway' && geom == 'Polygon') {
      fill.setColor('rgb(242,239,235)');
      styles[length++] = polygon;
    } else if (layer == 'aeroway' && geom == 'LineString' &&
        resolution <= 76.43702828517625) {
      stroke.setColor('#f0ede9');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'building') {
      fill.setColor('#f2eae2');
      stroke.setColor('#dfdbd7');
      stroke.setWidth(1);
      styles[length++] = strokedPolygon;
    } else if (layer == 'tunnel') {
      stroke.setColor('#e9ac77');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'road') {
      stroke.setColor('#e9ac77');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'bridge') {
      stroke.setColor('#e9ac77');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'admin') {
      stroke.setColor('#9e9cab');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'country_label') {
      text.getText().setText(feature.get('name_en'));
      text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    } else if (layer == 'marine_label' &&
        geom == 'Point') {
      text.getText().setText(feature.get('name_en'));
      text.getText().setFont(
          'italic 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#74aee9');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(1);
      styles[length++] = text;
    } else if (layer == 'place_label') {
      text.getText().setText(feature.get('name_en'));
      text.getText().setFont('11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#333');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(1);
      styles[length++] = text;
    } else if (layer == 'poi_label') {
      styles[length++] = icon;
    }
    styles.length = length;
    return styles;
  };
}
