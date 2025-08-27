export function pronajimatelFields(type) {
  switch (type) {
    case "Osoba":
      return [
        { name: "jmeno", label: "Jméno", required: true, inputType: "text" },
        { name: "prijmeni", label: "Příjmení", required: true, inputType: "text" },
        { name: "datumNarozeni", label: "Datum narození", required: true, inputType: "date" },
        { name: "email", label: "Email", required: true, inputType: "email" },
        { name: "telefon", label: "Telefon", required: true, inputType: "tel" },
        { name: "stat", label: "Stát", required: true, type: "select", options: ["Česká republika", "Slovensko"] },
        { name: "mesto", label: "Město", required: true, inputType: "text" },
        { name: "ulice", label: "Ulice", required: true, inputType: "text" },
        { name: "cisloPopisne", label: "Číslo popisné", required: true, inputType: "text" },
        { name: "psc", label: "PSČ", required: true, inputType: "text" },
        { name: "typDokladu", label: "Typ dokladu", required: true, type: "select", options: ["Občanský průkaz", "Pas", "Řidičský průkaz"] },
        { name: "cisloDokladu", label: "Číslo dokladu", required: true, inputType: "text" }
      ];
    case "OSVČ":
      return [
        { name: "jmeno", label: "Jméno", required: true, inputType: "text" },
        { name: "prijmeni", label: "Příjmení", required: true, inputType: "text" },
        { name: "ic", label: "IČ", required: true, inputType: "text" },
        { name: "dic", label: "DIČ", required: false, inputType: "text" },
        { name: "datumNarozeni", label: "Datum narození", required: true, inputType: "date" },
        { name: "email", label: "Email", required: true, inputType: "email" },
        { name: "telefon", label: "Telefon", required: true, inputType: "tel" },
        { name: "stat", label: "Stát", required: true, type: "select", options: ["Česká republika", "Slovensko"] },
        { name: "mesto", label: "Město", required: true, inputType: "text" },
        { name: "ulice", label: "Ulice", required: true, inputType: "text" },
        { name: "cisloPopisne", label: "Číslo popisné", required: true, inputType: "text" },
        { name: "psc", label: "PSČ", required: true, inputType: "text" },
        { name: "typDokladu", label: "Typ dokladu", required: true, type: "select", options: ["Občanský průkaz", "Pas", "Řidičský průkaz"] },
        { name: "cisloDokladu", label: "Číslo dokladu", required: true, inputType: "text" }
      ];
    case "Firma":
      return [
        { name: "nazevSpolecnosti", label: "Název společnosti", required: true, inputType: "text" },
        { name: "ic", label: "IČ", required: true, inputType: "text" },
        { name: "dic", label: "DIČ", required: false, inputType: "text" },
        { name: "email", label: "Email", required: true, inputType: "email" },
        { name: "telefon", label: "Telefon", required: true, inputType: "tel" },
        { name: "stat", label: "Stát", required: true, type: "select", options: ["Česká republika", "Slovensko"] },
        { name: "mesto", label: "Město", required: true, inputType: "text" },
        { name: "ulice", label: "Ulice", required: true, inputType: "text" },
        { name: "cisloPopisne", label: "Číslo popisné", required: true, inputType: "text" },
        { name: "psc", label: "PSČ", required: true, inputType: "text" }
      ];
    case "Spolek / Skupina":
      return [
        { name: "nazevSpolku", label: "Název spolku/skupiny", required: true, inputType: "text" },
        { name: "ic", label: "IČ", required: false, inputType: "text" },
        { name: "dic", label: "DIČ", required: false, inputType: "text" },
        { name: "email", label: "Email", required: true, inputType: "email" },
        { name: "telefon", label: "Telefon", required: true, inputType: "tel" },
        { name: "stat", label: "Stát", required: true, type: "select", options: ["Česká republika", "Slovensko"] },
        { name: "mesto", label: "Město", required: true, inputType: "text" },
        { name: "ulice", label: "Ulice", required: true, inputType: "text" },
        { name: "cisloPopisne", label: "Číslo popisné", required: true, inputType: "text" },
        { name: "psc", label: "PSČ", required: true, inputType: "text" }
      ];
    default:
      return [];
  }
}

export function najemnikFields(type) {
  // Stejná struktura jako pronajimatelFields
  return pronajimatelFields(type);
}

export function zastupujiciFields() {
  return [
    { name: "typOpravneni", label: "Typ oprávnění", required: true, type: "select", options: ["Čtení vybraných informací", "Čtení všech informací", "Úprava všech informací"] },
    { name: "typZastoupeni", label: "Typ zastoupení", required: true, type: "select", options: ["Zastupuje nájemníka", "Zastupuje pronajímatele"] },
    { name: "kohoZastupuje", label: "Koho zastupuje", required: true, inputType: "text" }, // Zjednodušeno
    { name: "titul", label: "Titul", required: false, inputType: "text" },
    { name: "jmeno", label: "Jméno", required: true, inputType: "text" },
    { name: "prijmeni", label: "Příjmení", required: true, inputType: "text" },
    { name: "datumNarozeni", label: "Datum narození", required: true, inputType: "date" },
    { name: "typDokladu", label: "Typ dokladu totožnosti", required: true, type: "select", options: ["Občanský průkaz", "Pas", "Řidičský průkaz"] },
    { name: "cisloDokladu", label: "Číslo dokladu totožnosti", required: true, inputType: "text" },
    { name: "stat", label: "Stát", required: true, type: "select", options: ["Česká republika", "Slovensko"] },
    { name: "psc", label: "PSČ", required: true, inputType: "text" },
    { name: "mesto", label: "Město", required: true, inputType: "text" },
    { name: "ulice", label: "Ulice", required: true, inputType: "text" },
    { name: "cisloPopisne", label: "Číslo popisné", required: true, inputType: "text" },
    { name: "telefon", label: "Telefon", required: true, inputType: "tel" },
    { name: "email", label: "Email", required: true, inputType: "email" },
    { name: "bankovniUcet", label: "Bankovní účet / číslo banky", required: false, inputType: "text" },
    { name: "prihlasovaciJmeno", label: "Přihlašovací jméno", required: true, inputType: "text" },
    { name: "prihlasovaciHeslo", label: "Přihlašovací heslo", required: true, inputType: "password" }
  ];
}