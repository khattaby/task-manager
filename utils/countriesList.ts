export function getFlagEmoji(countryCode: string): string {
    return countryCode
        .toUpperCase()
        .split("")
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join("");
}

export const countryList = [
    {
        name: "Afghanistan",
        code: "AF",
        phoneCode: "+93",
        flagEmoji: getFlagEmoji("AF"),
        flag: "https://flagcdn.com/h40/af.png"
    },
    {
        name: "Albania",
        code: "AL",
        phoneCode: "+355",
        flagEmoji: getFlagEmoji("AL"),
        flag: "https://flagcdn.com/h40/al.png"
    },
    {
        name: "Algeria",
        code: "DZ",
        phoneCode: "+213",
        flagEmoji: getFlagEmoji("DZ"),
        flag: "https://flagcdn.com/h40/dz.png"
    },
    {
        name: "Andorra",
        code: "AD",
        phoneCode: "+376",
        flagEmoji: getFlagEmoji("AD"),
        flag: "https://flagcdn.com/h40/ad.png"
    },
    {
        name: "Angola",
        code: "AO",
        phoneCode: "+244",
        flagEmoji: getFlagEmoji("AO"),
        flag: "https://flagcdn.com/h40/ao.png"
    },
    {
        name: "Argentina",
        code: "AR",
        phoneCode: "+54",
        flagEmoji: getFlagEmoji("AR"),
        flag: "https://flagcdn.com/h40/ar.png"
    },
    {
        name: "Armenia",
        code: "AM",
        phoneCode: "+374",
        flagEmoji: getFlagEmoji("AM"),
        flag: "https://flagcdn.com/h40/am.png"
    },
    {
        name: "Australia",
        code: "AU",
        phoneCode: "+61",
        flagEmoji: getFlagEmoji("AU"),
        flag: "https://flagcdn.com/h40/au.png"
    },
    {
        name: "Austria",
        code: "AT",
        phoneCode: "+43",
        flagEmoji: getFlagEmoji("AT"),
        flag: "https://flagcdn.com/h40/at.png"
    },
    {
        name: "Azerbaijan",
        code: "AZ",
        phoneCode: "+994",
        flagEmoji: getFlagEmoji("AZ"),
        flag: "https://flagcdn.com/h40/az.png"
    },
    {
        name: "Bahamas",
        code: "BS",
        phoneCode: "+1242",
        flagEmoji: getFlagEmoji("BS"),
        flag: "https://flagcdn.com/h40/bs.png"
    },
    {
        name: "Bahrain",
        code: "BH",
        phoneCode: "+973",
        flagEmoji: getFlagEmoji("BH"),
        flag: "https://flagcdn.com/h40/bh.png"
    },
    {
        name: "Bangladesh",
        code: "BD",
        phoneCode: "+880",
        flagEmoji: getFlagEmoji("BD"),
        flag: "https://flagcdn.com/h40/bd.png"
    },
    {
        name: "Barbados",
        code: "BB",
        phoneCode: "+1246",
        flagEmoji: getFlagEmoji("BB"),
        flag: "https://flagcdn.com/h40/bb.png"
    },
    {
        name: "Belarus",
        code: "BY",
        phoneCode: "+375",
        flagEmoji: getFlagEmoji("BY"),
        flag: "https://flagcdn.com/h40/by.png"
    },
    {
        name: "Belgium",
        code: "BE",
        phoneCode: "+32",
        flagEmoji: getFlagEmoji("BE"),
        flag: "https://flagcdn.com/h40/be.png"
    },
    {
        name: "Belize",
        code: "BZ",
        phoneCode: "+501",
        flagEmoji: getFlagEmoji("BZ"),
        flag: "https://flagcdn.com/h40/bz.png"
    },
    {
        name: "Benin",
        code: "BJ",
        phoneCode: "+229",
        flagEmoji: getFlagEmoji("BJ"),
        flag: "https://flagcdn.com/h40/bj.png"
    },
    {
        name: "Bhutan",
        code: "BT",
        phoneCode: "+975",
        flagEmoji: getFlagEmoji("BT"),
        flag: "https://flagcdn.com/h40/bt.png"
    },
    {
        name: "Bolivia",
        code: "BO",
        phoneCode: "+591",
        flagEmoji: getFlagEmoji("BO"),
        flag: "https://flagcdn.com/h40/bo.png"
    },
    {
        name: "Bosnia and Herzegovina",
        code: "BA",
        phoneCode: "+387",
        flagEmoji: getFlagEmoji("BA"),
        flag: "https://flagcdn.com/h40/ba.png"
    },
    {
        name: "Botswana",
        code: "BW",
        phoneCode: "+267",
        flagEmoji: getFlagEmoji("BW"),
        flag: "https://flagcdn.com/h40/bw.png"
    },
    {
        name: "Brazil",
        code: "BR",
        phoneCode: "+55",
        flagEmoji: getFlagEmoji("BR"),
        flag: "https://flagcdn.com/h40/br.png"
    },
    {
        name: "Brunei",
        code: "BN",
        phoneCode: "+673",
        flagEmoji: getFlagEmoji("BN"),
        flag: "https://flagcdn.com/h40/bn.png"
    },
    {
        name: "Bulgaria",
        code: "BG",
        phoneCode: "+359",
        flagEmoji: getFlagEmoji("BG"),
        flag: "https://flagcdn.com/h40/bg.png"
    },
    {
        name: "Burkina Faso",
        code: "BF",
        phoneCode: "+226",
        flagEmoji: getFlagEmoji("BF"),
        flag: "https://flagcdn.com/h40/bf.png"
    },
    {
        name: "Burundi",
        code: "BI",
        phoneCode: "+257",
        flagEmoji: getFlagEmoji("BI"),
        flag: "https://flagcdn.com/h40/bi.png"
    },
    {
        name: "Cambodia",
        code: "KH",
        phoneCode: "+855",
        flagEmoji: getFlagEmoji("KH"),
        flag: "https://flagcdn.com/h40/kh.png"
    },
    {
        name: "Cameroon",
        code: "CM",
        phoneCode: "+237",
        flagEmoji: getFlagEmoji("CM"),
        flag: "https://flagcdn.com/h40/cm.png"
    },
    {
        name: "Canada",
        code: "CA",
        phoneCode: "+1",
        flagEmoji: getFlagEmoji("CA"),
        flag: "https://flagcdn.com/h40/ca.png"
    },
    {
        name: "Cape Verde",
        code: "CV",
        phoneCode: "+238",
        flagEmoji: getFlagEmoji("CV"),
        flag: "https://flagcdn.com/h40/cv.png"
    },
    {
        name: "Central African Republic",
        code: "CF",
        phoneCode: "+236",
        flagEmoji: getFlagEmoji("CF"),
        flag: "https://flagcdn.com/h40/cf.png"
    },
    {
        name: "Chad",
        code: "TD",
        phoneCode: "+235",
        flagEmoji: getFlagEmoji("TD"),
        flag: "https://flagcdn.com/h40/td.png"
    },
    {
        name: "Chile",
        code: "CL",
        phoneCode: "+56",
        flagEmoji: getFlagEmoji("CL"),
        flag: "https://flagcdn.com/h40/cl.png"
    },
    {
        name: "China",
        code: "CN",
        phoneCode: "+86",
        flagEmoji: getFlagEmoji("CN"),
        flag: "https://flagcdn.com/h40/cn.png"
    },
    {
        name: "Colombia",
        code: "CO",
        phoneCode: "+57",
        flagEmoji: getFlagEmoji("CO"),
        flag: "https://flagcdn.com/h40/co.png"
    },
    {
        name: "Comoros",
        code: "KM",
        phoneCode: "+269",
        flagEmoji: getFlagEmoji("KM"),
        flag: "https://flagcdn.com/h40/km.png"
    },
    {
        name: "Congo",
        code: "CG",
        phoneCode: "+242",
        flagEmoji: getFlagEmoji("CG"),
        flag: "https://flagcdn.com/h40/cg.png"
    },
    {
        name: "Costa Rica",
        code: "CR",
        phoneCode: "+506",
        flagEmoji: getFlagEmoji("CR"),
        flag: "https://flagcdn.com/h40/cr.png"
    },
    {
        name: "Croatia",
        code: "HR",
        phoneCode: "+385",
        flagEmoji: getFlagEmoji("HR"),
        flag: "https://flagcdn.com/h40/hr.png"
    },
    {
        name: "Cuba",
        code: "CU",
        phoneCode: "+53",
        flagEmoji: getFlagEmoji("CU"),
        flag: "https://flagcdn.com/h40/cu.png"
    },
    {
        name: "Cyprus",
        code: "CY",
        phoneCode: "+357",
        flagEmoji: getFlagEmoji("CY"),
        flag: "https://flagcdn.com/h40/cy.png"
    },
    {
        name: "Czech Republic",
        code: "CZ",
        phoneCode: "+420",
        flagEmoji: getFlagEmoji("CZ"),
        flag: "https://flagcdn.com/h40/cz.png"
    },
    {
        name: "Denmark",
        code: "DK",
        phoneCode: "+45",
        flagEmoji: getFlagEmoji("DK"),
        flag: "https://flagcdn.com/h40/dk.png"
    },
    {
        name: "Djibouti",
        code: "DJ",
        phoneCode: "+253",
        flagEmoji: getFlagEmoji("DJ"),
        flag: "https://flagcdn.com/h40/dj.png"
    },
    {
        name: "Dominica",
        code: "DM",
        phoneCode: "+1767",
        flagEmoji: getFlagEmoji("DM"),
        flag: "https://flagcdn.com/h40/dm.png"
    },
    {
        name: "Dominican Republic",
        code: "DO",
        phoneCode: "+1809",
        flagEmoji: getFlagEmoji("DO"),
        flag: "https://flagcdn.com/h40/do.png"
    },
    {
        name: "Ecuador",
        code: "EC",
        phoneCode: "+593",
        flagEmoji: getFlagEmoji("EC"),
        flag: "https://flagcdn.com/h40/ec.png"
    },
    {
        name: "Egypt",
        code: "EG",
        phoneCode: "+20",
        flagEmoji: getFlagEmoji("EG"),
        flag: "https://flagcdn.com/h40/eg.png"
    },
    {
        name: "El Salvador",
        code: "SV",
        phoneCode: "+503",
        flagEmoji: getFlagEmoji("SV"),
        flag: "https://flagcdn.com/h40/sv.png"
    },
    {
        name: "Equatorial Guinea",
        code: "GQ",
        phoneCode: "+240",
        flagEmoji: getFlagEmoji("GQ"),
        flag: "https://flagcdn.com/h40/gq.png"
    },
    {
        name: "Eritrea",
        code: "ER",
        phoneCode: "+291",
        flagEmoji: getFlagEmoji("ER"),
        flag: "https://flagcdn.com/h40/er.png"
    },
    {
        name: "Estonia",
        code: "EE",
        phoneCode: "+372",
        flagEmoji: getFlagEmoji("EE"),
        flag: "https://flagcdn.com/h40/ee.png"
    },
    {
        name: "Ethiopia",
        code: "ET",
        phoneCode: "+251",
        flagEmoji: getFlagEmoji("ET"),
        flag: "https://flagcdn.com/h40/et.png"
    },
    {
        name: "Fiji",
        code: "FJ",
        phoneCode: "+679",
        flagEmoji: getFlagEmoji("FJ"),
        flag: "https://flagcdn.com/h40/fj.png"
    },
    {
        name: "Finland",
        code: "FI",
        phoneCode: "+358",
        flagEmoji: getFlagEmoji("FI"),
        flag: "https://flagcdn.com/h40/fi.png"
    },
    {
        name: "France",
        code: "FR",
        phoneCode: "+33",
        flagEmoji: getFlagEmoji("FR"),
        flag: "https://flagcdn.com/h40/fr.png"
    },
    {
        name: "Gabon",
        code: "GA",
        phoneCode: "+241",
        flagEmoji: getFlagEmoji("GA"),
        flag: "https://flagcdn.com/h40/ga.png"
    },
    {
        name: "Gambia",
        code: "GM",
        phoneCode: "+220",
        flagEmoji: getFlagEmoji("GM"),
        flag: "https://flagcdn.com/h40/gm.png"
    },
    {
        name: "Georgia",
        code: "GE",
        phoneCode: "+995",
        flagEmoji: getFlagEmoji("GE"),
        flag: "https://flagcdn.com/h40/ge.png"
    },
    {
        name: "Germany",
        code: "DE",
        phoneCode: "+49",
        flagEmoji: getFlagEmoji("DE"),
        flag: "https://flagcdn.com/h40/de.png"
    },
    {
        name: "Ghana",
        code: "GH",
        phoneCode: "+233",
        flagEmoji: getFlagEmoji("GH"),
        flag: "https://flagcdn.com/h40/gh.png"
    },
    {
        name: "Greece",
        code: "GR",
        phoneCode: "+30",
        flagEmoji: getFlagEmoji("GR"),
        flag: "https://flagcdn.com/h40/gr.png"
    },
    {
        name: "Grenada",
        code: "GD",
        phoneCode: "+1473",
        flagEmoji: getFlagEmoji("GD"),
        flag: "https://flagcdn.com/h40/gd.png"
    },
    {
        name: "Guatemala",
        code: "GT",
        phoneCode: "+502",
        flagEmoji: getFlagEmoji("GT"),
        flag: "https://flagcdn.com/h40/gt.png"
    },
    {
        name: "Guinea",
        code: "GN",
        phoneCode: "+224",
        flagEmoji: getFlagEmoji("GN"),
        flag: "https://flagcdn.com/h40/gn.png"
    },
    {
        name: "Guinea-Bissau",
        code: "GW",
        phoneCode: "+245",
        flagEmoji: getFlagEmoji("GW"),
        flag: "https://flagcdn.com/h40/gw.png"
    },
    {
        name: "Guyana",
        code: "GY",
        phoneCode: "+592",
        flagEmoji: getFlagEmoji("GY"),
        flag: "https://flagcdn.com/h40/gy.png"
    },
    {
        name: "Haiti",
        code: "HT",
        phoneCode: "+509",
        flagEmoji: getFlagEmoji("HT"),
        flag: "https://flagcdn.com/h40/ht.png"
    },
    {
        name: "Honduras",
        code: "HN",
        phoneCode: "+504",
        flagEmoji: getFlagEmoji("HN"),
        flag: "https://flagcdn.com/h40/hn.png"
    },
    {
        name: "Hungary",
        code: "HU",
        phoneCode: "+36",
        flagEmoji: getFlagEmoji("HU"),
        flag: "https://flagcdn.com/h40/hu.png"
    },
    {
        name: "Iceland",
        code: "IS",
        phoneCode: "+354",
        flagEmoji: getFlagEmoji("IS"),
        flag: "https://flagcdn.com/h40/is.png"
    },
    {
        name: "India",
        code: "IN",
        phoneCode: "+91",
        flagEmoji: getFlagEmoji("IN"),
        flag: "https://flagcdn.com/h40/in.png"
    },
    {
        name: "Indonesia",
        code: "ID",
        phoneCode: "+62",
        flagEmoji: getFlagEmoji("ID"),
        flag: "https://flagcdn.com/h40/id.png"
    },
    {
        name: "Iran",
        code: "IR",
        phoneCode: "+98",
        flagEmoji: getFlagEmoji("IR"),
        flag: "https://flagcdn.com/h40/ir.png"
    },
    {
        name: "Iraq",
        code: "IQ",
        phoneCode: "+964",
        flagEmoji: getFlagEmoji("IQ"),
        flag: "https://flagcdn.com/h40/iq.png"
    },
    {
        name: "Ireland",
        code: "IE",
        phoneCode: "+353",
        flagEmoji: getFlagEmoji("IE"),
        flag: "https://flagcdn.com/h40/ie.png"
    },
    {
        name: "Israel",
        code: "IL",
        phoneCode: "+972",
        flagEmoji: getFlagEmoji("IL"),
        flag: "https://flagcdn.com/h40/il.png"
    },
    {
        name: "Italy",
        code: "IT",
        phoneCode: "+39",
        flagEmoji: getFlagEmoji("IT"),
        flag: "https://flagcdn.com/h40/it.png"
    },
    {
        name: "Jamaica",
        code: "JM",
        phoneCode: "+1876",
        flagEmoji: getFlagEmoji("JM"),
        flag: "https://flagcdn.com/h40/jm.png"
    },
    {
        name: "Japan",
        code: "JP",
        phoneCode: "+81",
        flagEmoji: getFlagEmoji("JP"),
        flag: "https://flagcdn.com/h40/jp.png"
    },
    {
        name: "Jordan",
        code: "JO",
        phoneCode: "+962",
        flagEmoji: getFlagEmoji("JO"),
        flag: "https://flagcdn.com/h40/jo.png"
    },
    {
        name: "Kazakhstan",
        code: "KZ",
        phoneCode: "+7",
        flagEmoji: getFlagEmoji("KZ"),
        flag: "https://flagcdn.com/h40/kz.png"
    },
    {
        name: "Kenya",
        code: "KE",
        phoneCode: "+254",
        flagEmoji: getFlagEmoji("KE"),
        flag: "https://flagcdn.com/h40/ke.png"
    },
    {
        name: "Kiribati",
        code: "KI",
        phoneCode: "+686",
        flagEmoji: getFlagEmoji("KI"),
        flag: "https://flagcdn.com/h40/ki.png"
    },
    {
        name: "Kuwait",
        code: "KW",
        phoneCode: "+965",
        flagEmoji: getFlagEmoji("KW"),
        flag: "https://flagcdn.com/h40/kw.png"
    },
    {
        name: "Kyrgyzstan",
        code: "KG",
        phoneCode: "+996",
        flagEmoji: getFlagEmoji("KG"),
        flag: "https://flagcdn.com/h40/kg.png"
    },
    {
        name: "Laos",
        code: "LA",
        phoneCode: "+856",
        flagEmoji: getFlagEmoji("LA"),
        flag: "https://flagcdn.com/h40/la.png"
    },
    {
        name: "Latvia",
        code: "LV",
        phoneCode: "+371",
        flagEmoji: getFlagEmoji("LV"),
        flag: "https://flagcdn.com/h40/lv.png"
    },
    {
        name: "Lebanon",
        code: "LB",
        phoneCode: "+961",
        flagEmoji: getFlagEmoji("LB"),
        flag: "https://flagcdn.com/h40/lb.png"
    },
    {
        name: "Lesotho",
        code: "LS",
        phoneCode: "+266",
        flagEmoji: getFlagEmoji("LS"),
        flag: "https://flagcdn.com/h40/ls.png"
    },
    {
        name: "Liberia",
        code: "LR",
        phoneCode: "+231",
        flagEmoji: getFlagEmoji("LR"),
        flag: "https://flagcdn.com/h40/lr.png"
    },
    {
        name: "Libya",
        code: "LY",
        phoneCode: "+218",
        flagEmoji: getFlagEmoji("LY"),
        flag: "https://flagcdn.com/h40/ly.png"
    },
    {
        name: "Liechtenstein",
        code: "LI",
        phoneCode: "+423",
        flagEmoji: getFlagEmoji("LI"),
        flag: "https://flagcdn.com/h40/li.png"
    },
    {
        name: "Lithuania",
        code: "LT",
        phoneCode: "+370",
        flagEmoji: getFlagEmoji("LT"),
        flag: "https://flagcdn.com/h40/lt.png"
    },
    {
        name: "Luxembourg",
        code: "LU",
        phoneCode: "+352",
        flagEmoji: getFlagEmoji("LU"),
        flag: "https://flagcdn.com/h40/lu.png"
    },
    {
        name: "Madagascar",
        code: "MG",
        phoneCode: "+261",
        flagEmoji: getFlagEmoji("MG"),
        flag: "https://flagcdn.com/h40/mg.png"
    },
    {
        name: "Malawi",
        code: "MW",
        phoneCode: "+265",
        flagEmoji: getFlagEmoji("MW"),
        flag: "https://flagcdn.com/h40/mw.png"
    },
    {
        name: "Malaysia",
        code: "MY",
        phoneCode: "+60",
        flagEmoji: getFlagEmoji("MY"),
        flag: "https://flagcdn.com/h40/my.png"
    },
    {
        name: "Maldives",
        code: "MV",
        phoneCode: "+960",
        flagEmoji: getFlagEmoji("MV"),
        flag: "https://flagcdn.com/h40/mv.png"
    },
    {
        name: "Mali",
        code: "ML",
        phoneCode: "+223",
        flagEmoji: getFlagEmoji("ML"),
        flag: "https://flagcdn.com/h40/ml.png"
    },
    {
        name: "Malta",
        code: "MT",
        phoneCode: "+356",
        flagEmoji: getFlagEmoji("MT"),
        flag: "https://flagcdn.com/h40/mt.png"
    },
    {
        name: "Marshall Islands",
        code: "MH",
        phoneCode: "+692",
        flagEmoji: getFlagEmoji("MH"),
        flag: "https://flagcdn.com/h40/mh.png"
    },
    {
        name: "Mauritania",
        code: "MR",
        phoneCode: "+222",
        flagEmoji: getFlagEmoji("MR"),
        flag: "https://flagcdn.com/h40/mr.png"
    },
    {
        name: "Mauritius",
        code: "MU",
        phoneCode: "+230",
        flagEmoji: getFlagEmoji("MU"),
        flag: "https://flagcdn.com/h40/mu.png"
    },
    {
        name: "Mexico",
        code: "MX",
        phoneCode: "+52",
        flagEmoji: getFlagEmoji("MX"),
        flag: "https://flagcdn.com/h40/mx.png"
    },
    {
        name: "Micronesia",
        code: "FM",
        phoneCode: "+691",
        flagEmoji: getFlagEmoji("FM"),
        flag: "https://flagcdn.com/h40/fm.png"
    },
    {
        name: "Moldova",
        code: "MD",
        phoneCode: "+373",
        flagEmoji: getFlagEmoji("MD"),
        flag: "https://flagcdn.com/h40/md.png"
    },
    {
        name: "Monaco",
        code: "MC",
        phoneCode: "+377",
        flagEmoji: getFlagEmoji("MC"),
        flag: "https://flagcdn.com/h40/mc.png"
    },
    {
        name: "Mongolia",
        code: "MN",
        phoneCode: "+976",
        flagEmoji: getFlagEmoji("MN"),
        flag: "https://flagcdn.com/h40/mn.png"
    },
    {
        name: "Montenegro",
        code: "ME",
        phoneCode: "+382",
        flagEmoji: getFlagEmoji("ME"),
        flag: "https://flagcdn.com/h40/me.png"
    },
    {
        name: "Morocco",
        code: "MA",
        phoneCode: "+212",
        flagEmoji: getFlagEmoji("MA"),
        flag: "https://flagcdn.com/h40/ma.png"
    },
    {
        name: "Mozambique",
        code: "MZ",
        phoneCode: "+258",
        flagEmoji: getFlagEmoji("MZ"),
        flag: "https://flagcdn.com/h40/mz.png"
    },
    {
        name: "Myanmar",
        code: "MM",
        phoneCode: "+95",
        flagEmoji: getFlagEmoji("MM"),
        flag: "https://flagcdn.com/h40/mm.png"
    },
    {
        name: "Namibia",
        code: "NA",
        phoneCode: "+264",
        flagEmoji: getFlagEmoji("NA"),
        flag: "https://flagcdn.com/h40/na.png"
    },
    {
        name: "Nauru",
        code: "NR",
        phoneCode: "+674",
        flagEmoji: getFlagEmoji("NR"),
        flag: "https://flagcdn.com/h40/nr.png"
    },
    {
        name: "Nepal",
        code: "NP",
        phoneCode: "+977",
        flagEmoji: getFlagEmoji("NP"),
        flag: "https://flagcdn.com/h40/np.png"
    },
    {
        name: "Netherlands",
        code: "NL",
        phoneCode: "+31",
        flagEmoji: getFlagEmoji("NL"),
        flag: "https://flagcdn.com/h40/nl.png"
    },
    {
        name: "New Zealand",
        code: "NZ",
        phoneCode: "+64",
        flagEmoji: getFlagEmoji("NZ"),
        flag: "https://flagcdn.com/h40/nz.png"
    },
    {
        name: "Nicaragua",
        code: "NI",
        phoneCode: "+505",
        flagEmoji: getFlagEmoji("NI"),
        flag: "https://flagcdn.com/h40/ni.png"
    },
    {
        name: "Niger",
        code: "NE",
        phoneCode: "+227",
        flagEmoji: getFlagEmoji("NE"),
        flag: "https://flagcdn.com/h40/ne.png"
    },
    {
        name: "Nigeria",
        code: "NG",
        phoneCode: "+234",
        flagEmoji: getFlagEmoji("NG"),
        flag: "https://flagcdn.com/h40/ng.png"
    },
    {
        name: "North Korea",
        code: "KP",
        phoneCode: "+850",
        flagEmoji: getFlagEmoji("KP"),
        flag: "https://flagcdn.com/h40/kp.png"
    },
    {
        name: "North Macedonia",
        code: "MK",
        phoneCode: "+389",
        flagEmoji: getFlagEmoji("MK"),
        flag: "https://flagcdn.com/h40/mk.png"
    },
    {
        name: "Norway",
        code: "NO",
        phoneCode: "+47",
        flagEmoji: getFlagEmoji("NO"),
        flag: "https://flagcdn.com/h40/no.png"
    },
    {
        name: "Oman",
        code: "OM",
        phoneCode: "+968",
        flagEmoji: getFlagEmoji("OM"),
        flag: "https://flagcdn.com/h40/om.png"
    },
    {
        name: "Pakistan",
        code: "PK",
        phoneCode: "+92",
        flagEmoji: getFlagEmoji("PK"),
        flag: "https://flagcdn.com/h40/pk.png"
    },
    {
        name: "Palau",
        code: "PW",
        phoneCode: "+680",
        flagEmoji: getFlagEmoji("PW"),
        flag: "https://flagcdn.com/h40/pw.png"
    },
    {
        name: "Panama",
        code: "PA",
        phoneCode: "+507",
        flagEmoji: getFlagEmoji("PA"),
        flag: "https://flagcdn.com/h40/pa.png"
    },
    {
        name: "Papua New Guinea",
        code: "PG",
        phoneCode: "+675",
        flagEmoji: getFlagEmoji("PG"),
        flag: "https://flagcdn.com/h40/pg.png"
    },
    {
        name: "Paraguay",
        code: "PY",
        phoneCode: "+595",
        flagEmoji: getFlagEmoji("PY"),
        flag: "https://flagcdn.com/h40/py.png"
    },
    {
        name: "Peru",
        code: "PE",
        phoneCode: "+51",
        flagEmoji: getFlagEmoji("PE"),
        flag: "https://flagcdn.com/h40/pe.png"
    },
    {
        name: "Philippines",
        code: "PH",
        phoneCode: "+63",
        flagEmoji: getFlagEmoji("PH"),
        flag: "https://flagcdn.com/h40/ph.png"
    },
    {
        name: "Poland",
        code: "PL",
        phoneCode: "+48",
        flagEmoji: getFlagEmoji("PL"),
        flag: "https://flagcdn.com/h40/pl.png"
    },
    {
        name: "Portugal",
        code: "PT",
        phoneCode: "+351",
        flagEmoji: getFlagEmoji("PT"),
        flag: "https://flagcdn.com/h40/pt.png"
    },
    {
        name: "Qatar",
        code: "QA",
        phoneCode: "+974",
        flagEmoji: getFlagEmoji("QA"),
        flag: "https://flagcdn.com/h40/qa.png"
    },
    {
        name: "Romania",
        code: "RO",
        phoneCode: "+40",
        flagEmoji: getFlagEmoji("RO"),
        flag: "https://flagcdn.com/h40/ro.png"
    },
    {
        name: "Russia",
        code: "RU",
        phoneCode: "+7",
        flagEmoji: getFlagEmoji("RU"),
        flag: "https://flagcdn.com/h40/ru.png"
    },
    {
        name: "Rwanda",
        code: "RW",
        phoneCode: "+250",
        flagEmoji: getFlagEmoji("RW"),
        flag: "https://flagcdn.com/h40/rw.png"
    },
    {
        name: "Saint Kitts and Nevis",
        code: "KN",
        phoneCode: "+1869",
        flagEmoji: getFlagEmoji("KN"),
        flag: "https://flagcdn.com/h40/kn.png"
    },
    {
        name: "Saint Lucia",
        code: "LC",
        phoneCode: "+1758",
        flagEmoji: getFlagEmoji("LC"),
        flag: "https://flagcdn.com/h40/lc.png"
    },
    {
        name: "Saint Vincent and the Grenadines",
        code: "VC",
        phoneCode: "+1784",
        flagEmoji: getFlagEmoji("VC"),
        flag: "https://flagcdn.com/h40/vc.png"
    },
    {
        name: "Samoa",
        code: "WS",
        phoneCode: "+685",
        flagEmoji: getFlagEmoji("WS"),
        flag: "https://flagcdn.com/h40/ws.png"
    },
    {
        name: "San Marino",
        code: "SM",
        phoneCode: "+378",
        flagEmoji: getFlagEmoji("SM"),
        flag: "https://flagcdn.com/h40/sm.png"
    },
    {
        name: "Sao Tome and Principe",
        code: "ST",
        phoneCode: "+239",
        flagEmoji: getFlagEmoji("ST"),
        flag: "https://flagcdn.com/h40/st.png"
    },
    {
        name: "Saudi Arabia",
        code: "SA",
        phoneCode: "+966",
        flagEmoji: getFlagEmoji("SA"),
        flag: "https://flagcdn.com/h40/sa.png"
    },
    {
        name: "Senegal",
        code: "SN",
        phoneCode: "+221",
        flagEmoji: getFlagEmoji("SN"),
        flag: "https://flagcdn.com/h40/sn.png"
    },
    {
        name: "Serbia",
        code: "RS",
        phoneCode: "+381",
        flagEmoji: getFlagEmoji("RS"),
        flag: "https://flagcdn.com/h40/rs.png"
    },
    {
        name: "Seychelles",
        code: "SC",
        phoneCode: "+248",
        flagEmoji: getFlagEmoji("SC"),
        flag: "https://flagcdn.com/h40/sc.png"
    },
    {
        name: "Sierra Leone",
        code: "SL",
        phoneCode: "+232",
        flagEmoji: getFlagEmoji("SL"),
        flag: "https://flagcdn.com/h40/sl.png"
    },
    {
        name: "Singapore",
        code: "SG",
        phoneCode: "+65",
        flagEmoji: getFlagEmoji("SG"),
        flag: "https://flagcdn.com/h40/sg.png"
    },
    {
        name: "Slovakia",
        code: "SK",
        phoneCode: "+421",
        flagEmoji: getFlagEmoji("SK"),
        flag: "https://flagcdn.com/h40/sk.png"
    },
    {
        name: "Slovenia",
        code: "SI",
        phoneCode: "+386",
        flagEmoji: getFlagEmoji("SI"),
        flag: "https://flagcdn.com/h40/si.png"
    },
    {
        name: "Solomon Islands",
        code: "SB",
        phoneCode: "+677",
        flagEmoji: getFlagEmoji("SB"),
        flag: "https://flagcdn.com/h40/sb.png"
    },
    {
        name: "Somalia",
        code: "SO",
        phoneCode: "+252",
        flagEmoji: getFlagEmoji("SO"),
        flag: "https://flagcdn.com/h40/so.png"
    },
    {
        name: "South Africa",
        code: "ZA",
        phoneCode: "+27",
        flagEmoji: getFlagEmoji("ZA"),
        flag: "https://flagcdn.com/h40/za.png"
    },
    {
        name: "South Korea",
        code: "KR",
        phoneCode: "+82",
        flagEmoji: getFlagEmoji("KR"),
        flag: "https://flagcdn.com/h40/kr.png"
    },
    {
        name: "South Sudan",
        code: "SS",
        phoneCode: "+211",
        flagEmoji: getFlagEmoji("SS"),
        flag: "https://flagcdn.com/h40/ss.png"
    },
    {
        name: "Spain",
        code: "ES",
        phoneCode: "+34",
        flagEmoji: getFlagEmoji("ES"),
        flag: "https://flagcdn.com/h40/es.png"
    },
    {
        name: "Sri Lanka",
        code: "LK",
        phoneCode: "+94",
        flagEmoji: getFlagEmoji("LK"),
        flag: "https://flagcdn.com/h40/lk.png"
    },
    {
        name: "Sudan",
        code: "SD",
        phoneCode: "+249",
        flagEmoji: getFlagEmoji("SD"),
        flag: "https://flagcdn.com/h40/sd.png"
    },
    {
        name: "Suriname",
        code: "SR",
        phoneCode: "+597",
        flagEmoji: getFlagEmoji("SR"),
        flag: "https://flagcdn.com/h40/sr.png"
    },
    {
        name: "Sweden",
        code: "SE",
        phoneCode: "+46",
        flagEmoji: getFlagEmoji("SE"),
        flag: "https://flagcdn.com/h40/se.png"
    },
    {
        name: "Switzerland",
        code: "CH",
        phoneCode: "+41",
        flagEmoji: getFlagEmoji("CH"),
        flag: "https://flagcdn.com/h40/ch.png"
    },
    {
        name: "Syria",
        code: "SY",
        phoneCode: "+963",
        flagEmoji: getFlagEmoji("SY"),
        flag: "https://flagcdn.com/h40/sy.png"
    },
    {
        name: "Taiwan",
        code: "TW",
        phoneCode: "+886",
        flagEmoji: getFlagEmoji("TW"),
        flag: "https://flagcdn.com/h40/tw.png"
    },
    {
        name: "Tajikistan",
        code: "TJ",
        phoneCode: "+992",
        flagEmoji: getFlagEmoji("TJ"),
        flag: "https://flagcdn.com/h40/tj.png"
    },
    {
        name: "Tanzania",
        code: "TZ",
        phoneCode: "+255",
        flagEmoji: getFlagEmoji("TZ"),
        flag: "https://flagcdn.com/h40/tz.png"
    },
    {
        name: "Thailand",
        code: "TH",
        phoneCode: "+66",
        flagEmoji: getFlagEmoji("TH"),
        flag: "https://flagcdn.com/h40/th.png"
    },
    {
        name: "Timor-Leste",
        code: "TL",
        phoneCode: "+670",
        flagEmoji: getFlagEmoji("TL"),
        flag: "https://flagcdn.com/h40/tl.png"
    },
    {
        name: "Togo",
        code: "TG",
        phoneCode: "+228",
        flagEmoji: getFlagEmoji("TG"),
        flag: "https://flagcdn.com/h40/tg.png"
    },
    {
        name: "Tonga",
        code: "TO",
        phoneCode: "+676",
        flagEmoji: getFlagEmoji("TO"),
        flag: "https://flagcdn.com/h40/to.png"
    },
    {
        name: "Trinidad and Tobago",
        code: "TT",
        phoneCode: "+1868",
        flagEmoji: getFlagEmoji("TT"),
        flag: "https://flagcdn.com/h40/tt.png"
    },
    {
        name: "Tunisia",
        code: "TN",
        phoneCode: "+216",
        flagEmoji: getFlagEmoji("TN"),
        flag: "https://flagcdn.com/h40/tn.png"
    },
    {
        name: "Turkey",
        code: "TR",
        phoneCode: "+90",
        flagEmoji: getFlagEmoji("TR"),
        flag: "https://flagcdn.com/h40/tr.png"
    },
    {
        name: "Turkmenistan",
        code: "TM",
        phoneCode: "+993",
        flagEmoji: getFlagEmoji("TM"),
        flag: "https://flagcdn.com/h40/tm.png"
    },
    {
        name: "Tuvalu",
        code: "TV",
        phoneCode: "+688",
        flagEmoji: getFlagEmoji("TV"),
        flag: "https://flagcdn.com/h40/tv.png"
    },
    {
        name: "Uganda",
        code: "UG",
        phoneCode: "+256",
        flagEmoji: getFlagEmoji("UG"),
        flag: "https://flagcdn.com/h40/ug.png"
    },
    {
        name: "Ukraine",
        code: "UA",
        phoneCode: "+380",
        flagEmoji: getFlagEmoji("UA"),
        flag: "https://flagcdn.com/h40/ua.png"
    },
    {
        name: "United Arab Emirates",
        code: "AE",
        phoneCode: "+971",
        flagEmoji: getFlagEmoji("AE"),
        flag: "https://flagcdn.com/h40/ae.png"
    },
    {
        name: "United Kingdom",
        code: "GB",
        phoneCode: "+44",
        flagEmoji: getFlagEmoji("GB"),
        flag: "https://flagcdn.com/h40/gb.png"
    },
    {
        name: "United States",
        code: "US",
        phoneCode: "+1",
        flagEmoji: getFlagEmoji("US"),
        flag: "https://flagcdn.com/h40/us.png"
    },
    {
        name: "Uruguay",
        code: "UY",
        phoneCode: "+598",
        flagEmoji: getFlagEmoji("UY"),
        flag: "https://flagcdn.com/h40/uy.png"
    },
    {
        name: "Uzbekistan",
        code: "UZ",
        phoneCode: "+998",
        flagEmoji: getFlagEmoji("UZ"),
        flag: "https://flagcdn.com/h40/uz.png"
    },
    {
        name: "Vanuatu",
        code: "VU",
        phoneCode: "+678",
        flagEmoji: getFlagEmoji("VU"),
        flag: "https://flagcdn.com/h40/vu.png"
    },
    {
        name: "Vatican City",
        code: "VA",
        phoneCode: "+379",
        flagEmoji: getFlagEmoji("VA"),
        flag: "https://flagcdn.com/h40/va.png"
    },
    {
        name: "Venezuela",
        code: "VE",
        phoneCode: "+58",
        flagEmoji: getFlagEmoji("VE"),
        flag: "https://flagcdn.com/h40/ve.png"
    },
    {
        name: "Vietnam",
        code: "VN",
        phoneCode: "+84",
        flagEmoji: getFlagEmoji("VN"),
        flag: "https://flagcdn.com/h40/vn.png"
    },
    {
        name: "Yemen",
        code: "YE",
        phoneCode: "+967",
        flagEmoji: getFlagEmoji("YE"),
        flag: "https://flagcdn.com/h40/ye.png"
    },
    {
        name: "Zambia",
        code: "ZM",
        phoneCode: "+260",
        flagEmoji: getFlagEmoji("ZM"),
        flag: "https://flagcdn.com/h40/zm.png"
    },
    {
        name: "Zimbabwe",
        code: "ZW",
        phoneCode: "+263",
        flagEmoji: getFlagEmoji("ZW"),
        flag: "https://flagcdn.com/h40/zw.png"
    }
];

export function getCountryFlagEmoji(location: string): string {
    const cleanLocation = location.trim().toLowerCase();
    const country = countryList.find((country) =>
        cleanLocation.includes(country.name.toLowerCase())
    );

    return country?.flagEmoji || "";
}