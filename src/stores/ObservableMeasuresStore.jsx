// import mobx, {observable, action, computed} from 'mobx';
import * as d3 from "d3";
import $ from 'jquery'; 

// mobx.useStrict(true);

class ObservableMeasuresStore {

  // @observable jsonData = [];

//  @action loadJsonFromAeroc() {
  loadJsonFromAeroc() {
      // LOAD DATA from AEROC
    $.getJSON('http://test.ideesalter.com/alia_readMesure.php', function(data) {

      let mapJsonData = new Map();
      data.forEach((item, index) => {
        //console.log(i);
        //console.log(mapJsonData.get(item.capteur_id));
        if( !mapJsonData.get(item.capteur_id) ) {
          mapJsonData.set(item.capteur_id, new Map());
        }
        let mapCapteur = mapJsonData.get(item.capteur_id)
        //mapJsonData.set(item.capteur_id, item);
        if( !mapCapteur.get(item.channel_id) ) {
          mapCapteur.set(item.channel_id, new Array());
        }
        let arrayChannel = mapCapteur.get(item.channel_id)
        mapJsonData.get(item.capteur_id).get(item.channel_id).push(item);
      });
      console.log(mapJsonData);
      //console.log(data[0].comment);
      var minDate = d3.min(data, (d, i) => {return d.date});
      var maxDate = d3.max(data, (d, i) => {return d.date});
      //console.log("minDate " + minDate);
      //console.log("maxDate " + maxDate);

      //this.addJsonData(data);
      // this.jsonData = data;
      // data.forEach(mesure => {
      //   this.jsonData.push(mesure);
      // });
    });
  }
}
export default ObservableMeasuresStore;