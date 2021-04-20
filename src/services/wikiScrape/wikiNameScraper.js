import axios from "axios";

export default {
  fetchMaleNames: function() {
    return new Promise(async (resolve, reject) => {
      // const url = 'http://no.wikipedia.org/wiki/Liste_over_norske_mannsnavn';
      //var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=Most%20common%20words%20in%20Spanish';

      const url = "https://data.brreg.no/rofs/od/rofs/stottetildeling/search";
      await axios.get(url);

      console.log(url.data);

      resolve();
    });
  },
  async fetchTest() {
    let d = fetch('https://no.wikipedia.org/wiki/Liste_over_norske_mannsnavn');
    console.log(d);
  },
};
