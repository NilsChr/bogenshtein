import listFemalenames from "./femaleNames";
import listMalenames from "./maleNames";
import listSurnames from "./surnames";

export default {
  generateNamePairs: function(n, typoChance) {
    let out = [];

    for (let i = 0; i < n; i++) {
      const r = Math.round(Math.random());
      let name = "";
      if (r == 0) name = this.getMaleName();
      else name = this.getFemaleName();

      let nameB = name;
      let d = Math.floor(Math.random() * 10);

      if (d == 4 || d == 5) {
        nameB = this.replaceMiddleName(nameB);
      } else if (d == 6) {
        nameB = this.removeMiddleName(nameB);
      } else if (d == 7) {
        nameB = this.getGibberishName();
      } 
      
      if (Math.random() < typoChance) {
        nameB = this.generateTypos(nameB);
      }

      if(Math.random() < 0.4) {
          nameB = nameB.toLowerCase();
      }

      let names = {
        nameA: name,
        nameB: nameB,
      };

      out.push(names);
    }

    return out;
  },
  getMaleName() {
    let nNames = 1 + Math.floor(Math.random() * 1);
    let name = "";
    for (let i = 0; i < nNames; i++) {
      let index = Math.floor(Math.random() * listMalenames.length);
      name += listMalenames[index];
      name += this.getNameSpace();
    }

    name += this.getSurName();

    return name;
  },
  getFemaleName() {
    let nNames = 1 + Math.floor(Math.random() * 2);
    let name = "";
    for (let i = 0; i < nNames; i++) {
      let index = Math.floor(Math.random() * listFemalenames.length);
      name += listFemalenames[index];
      name += this.getNameSpace();
    }

    name += this.getSurName();

    return name;
  },
  getSurName() {
    let nNames = 1 + Math.floor(Math.random() * 2);
    let name = "";
    for (let i = 0; i < nNames; i++) {
      let index = Math.floor(Math.random() * listSurnames.length);
      name += listSurnames[index];
      if (i < nNames - 1) name += this.getNameSpace();
    }
    return name;
  },
  getGibberishName() {
    let nNames = 1 + Math.floor(Math.random() * 4);
    let name = "";
    for (let i = 0; i < nNames; i++) {
      let index = Math.floor(Math.random() * listSurnames.length);
      name += listSurnames[index];
      name += this.getNameSpace();
    }
    return name;
  },
  generateTypos(name) {
    let out = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let bias = 0;
    for (let i = 0; i < name.length; i++) {
      if (Math.random() < 0.1 + bias && name.charAt(i) != " ") {
        const randomCharacter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        bias += 0.05;
        out += randomCharacter;
      } else {
        out += name.charAt(i);
        bias = 0;
      }
    }

    return out;
  },
  removeMiddleName(name) {
    let split = name.split(" ");
    return split[0] + " " + split[split.length - 1];
  },
  replaceMiddleName(name) {
    let split = name.split(" ");
    let out = "";

    for (let i = 0; i < split.length; i++) {
      if (i == 0 || i == split.length - 1) {
        out += split[i];
      } else out += split[i].charAt(0);
      if (i < split.length - 1) out += " ";
    }

    return out;
  },
  getNameSpace() {
    if (Math.random() < 0.05) {
      return "-";
    }
    return " ";
  },
};
