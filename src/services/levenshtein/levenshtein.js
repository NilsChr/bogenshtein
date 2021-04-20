function replaceSpecialCharacters(text) {
  let specials = [
    ["ø", "o"],
    ["-", " "],
    ["ö", "o"],
    ["å", "aa"],
  ];
  for (let i = 0; i < specials.length; i++) {
    let org = specials[i][0];
    let changed = specials[i][1];
    const reg = new RegExp(org);
    text = text.replace(reg, changed);
  }
  return text;
}
function removeTextVowels(text) {
  const vowels = ["a", "e", "i", "o", "u", "y", "æ", "ø", "å"];
  let out = "";
  for (let i = 0; i < text.length; i++) {
    if (!vowels.includes(text.charAt(i))) {
      out += text.charAt(i);
    }
  }
  return out;
}

function levenstein(stringA, stringB, opts) {
  if (opts.makeLowerCase) {
    stringA = stringA.toLowerCase();
    stringB = stringB.toLowerCase();
  }

  if (opts.onlyFirstLastName) {
    let sa = stringA.split(" ");
    let sb = stringB.split(" ");

    stringA = sa[0] + " " + sa[sa.length - 1];
    stringB = sb[0] + " " + sb[sb.length - 1];
  }

  if (opts.replaceSpecials) {
    stringA = replaceSpecialCharacters(stringA);
    stringB = replaceSpecialCharacters(stringB);
  }

  if (opts.removeVowels) {
    stringA = removeTextVowels(stringA);
    stringB = removeTextVowels(stringB);
  }

  var a = stringA,
    b = stringB,
    m = [],
    i,
    j,
    min = Math.min;

  if (!(a && b)) return (b || a).length;

  for (i = 0; i <= b.length; m[i] = [i++]);
  for (j = 0; j <= a.length; m[0][j] = j++);

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      m[i][j] =
        b.charAt(i - 1) == a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : (m[i][j] = min(
              m[i - 1][j - 1] + 1,
              min(m[i][j - 1] + 1, m[i - 1][j] + 1)
            ));
    }
  }

  return m[b.length][a.length];
}

export default levenstein;
