const states = [
    {
        "id_states_catalog": "AGS",
        "state": "AGUASCALIENTES",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "BC",
        "state": "BAJA CALIFORNIA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "BCS",
        "state": "BAJA CALIFORNIA SUR",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "CHI",
        "state": "CHIHUAHUA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "CHS",
        "state": "CHIAPAS",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "CMP",
        "state": "CAMPECHE",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "CMX",
        "state": "CIUDAD DE MEXICO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "COA",
        "state": "COAHUILA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "COL",
        "state": "COLIMA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "DGO",
        "state": "DURANGO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "GRO",
        "state": "GUERRERO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "GTO",
        "state": "GUANAJUATO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "HGO",
        "state": "HIDALGO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "JAL",
        "state": "JALISCO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "MCH",
        "state": "MICHOACAN",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "MEX",
        "state": "ESTADO DE MEXICO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "MOR",
        "state": "MORELOS",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "NAY",
        "state": "NAYARIT",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "NL",
        "state": "NUEVO LEON",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "OAX",
        "state": "OAXACA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "PUE",
        "state": "PUEBLA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "QR",
        "state": "QUINTANA ROO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "QRO",
        "state": "QUERETARO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "SIN",
        "state": "SINALOA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "SLP",
        "state": "SAN LUIS POTOSI",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "SON",
        "state": "SONORA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "TAB",
        "state": "TABASCO",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "TLX",
        "state": "TLAXCALA",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "TMS",
        "state": "TAMAULIPAS",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "VER",
        "state": "VERACRUZ",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "YUC",
        "state": "YUCATAN",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    },
    {
        "id_states_catalog": "ZAC",
        "state": "ZACATECAS",
        "id_countries_catalog": "MX",
        "available": true,
        "creation_date":  "2020/05/21"
    }
];
module.exports= states;