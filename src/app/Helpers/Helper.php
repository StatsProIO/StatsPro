<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

class Helper
{     
    const timezones = [
        "Africa/Abidjan" => [
            "c" => ["CI", "BF", "GH", "GM", "GN", "ML", "MR", "SH", "SL", "SN", "TG"]
        ],
        "Africa/Accra" => [
            "c" => ["GH"]
        ],
        "Africa/Addis_Ababa" => [
            "c" => ["ET"],
        ],
        "Africa/Algiers" => [
            
            "c" => ["DZ"]
        ],
        "Africa/Asmara" => [
            
            "c" => ["ER"],
            
        ],
        "Africa/Asmera" => [
            
            "c" => ["ER"],
            
        ],
        "Africa/Bamako" => [
            
            "c" => ["ML"],
            
        ],
        "Africa/Bangui" => [
            
            "c" => ["CF"],
            
        ],
        "Africa/Banjul" => [
            
            "c" => ["GM"],
            
        ],
        "Africa/Bissau" => [
            
            "c" => ["GW"]
        ],
        "Africa/Blantyre" => [
            
            "c" => ["MW"],
            
        ],
        "Africa/Brazzaville" => [
            
            "c" => ["CG"],
            
        ],
        "Africa/Bujumbura" => [
            
            "c" => ["BI"],
            
        ],
        "Africa/Cairo" => [
            
            "c" => ["EG"]
        ],
        "Africa/Casablanca" => [
            
            
            "c" => ["MA"]
        ],
        "Africa/Ceuta" => [
            
            
            "c" => ["ES"]
        ],
        "Africa/Conakry" => [
            
            "c" => ["GN"],
            
        ],
        "Africa/Dakar" => [
            
            "c" => ["SN"],
            
        ],
        "Africa/Dar_es_Salaam" => [
            
            "c" => ["TZ"],
            
        ],
        "Africa/Djibouti" => [
            
            "c" => ["DJ"],
            
        ],
        "Africa/Douala" => [
            
            "c" => ["CM"],
            
        ],
        "Africa/El_Aaiun" => [
            
            
            "c" => ["EH"]
        ],
        "Africa/Freetown" => [
            
            "c" => ["SL"],
            
        ],
        "Africa/Gaborone" => [
            
            "c" => ["BW"],
            
        ],
        "Africa/Harare" => [
            
            "c" => ["ZW"],
            
        ],
        "Africa/Johannesburg" => [
            
            "c" => ["ZA", "LS", "SZ"]
        ],
        "Africa/Juba" => [
            
            "c" => ["SS"]
        ],
        "Africa/Kampala" => [
            
            "c" => ["UG"],
            
        ],
        "Africa/Khartoum" => [
            
            "c" => ["SD"]
        ],
        "Africa/Kigali" => [
            
            "c" => ["RW"],
            
        ],
        "Africa/Kinshasa" => [
            
            "c" => ["CD"],
            
        ],
        "Africa/Lagos" => [
            
            "c" => ["NG", "AO", "BJ", "CD", "CF", "CG", "CM", "GA", "GQ", "NE"]
        ],
        "Africa/Libreville" => [
            
            "c" => ["GA"],
            
        ],
        "Africa/Lome" => [
            
            "c" => ["TG"],
            
        ],
        "Africa/Luanda" => [
            
            "c" => ["AO"],
            
        ],
        "Africa/Lubumbashi" => [
            
            "c" => ["CD"],
            
        ],
        "Africa/Lusaka" => [
            
            "c" => ["ZM"],
            
        ],
        "Africa/Malabo" => [
            
            "c" => ["GQ"],
            
        ],
        "Africa/Maputo" => [
            
            "c" => ["MZ", "BI", "BW", "CD", "MW", "RW", "ZM", "ZW"]
        ],
        "Africa/Maseru" => [
            
            "c" => ["LS"],
            
        ],
        "Africa/Mbabane" => [
            
            "c" => ["SZ"],
            
        ],
        "Africa/Mogadishu" => [
            
            "c" => ["SO"],
            
        ],
        "Africa/Monrovia" => [
            
            "c" => ["LR"]
        ],
        "Africa/Nairobi" => [
            
            "c" => ["KE", "DJ", "ER", "ET", "KM", "MG", "SO", "TZ", "UG", "YT"]
        ],
        "Africa/Ndjamena" => [
            
            "c" => ["TD"]
        ],
        "Africa/Niamey" => [
            
            "c" => ["NE"],
            
        ],
        "Africa/Nouakchott" => [
            
            "c" => ["MR"],
            
        ],
        "Africa/Ouagadougou" => [
            
            "c" => ["BF"],
            
        ],
        "Africa/Porto-Novo" => [
            
            "c" => ["BJ"],
            
        ],
        "Africa/Sao_Tome" => [
            
            "c" => ["ST"]
        ],
        "Africa/Timbuktu" => [
            
            "c" => ["ML"],
            
        ],
        "Africa/Tripoli" => [
            
            "c" => ["LY"]
        ],
        "Africa/Tunis" => [
            
            "c" => ["TN"]
        ],
        "Africa/Windhoek" => [
            
            "c" => ["NA"]
        ],
        "America/Adak" => [
            
            
            "c" => ["US"]
        ],
        "America/Anchorage" => [
            
            
            "c" => ["US"]
        ],
        "America/Anguilla" => [
            
            "c" => ["AI"],
            
        ],
        "America/Antigua" => [
            
            "c" => ["AG"],
            
        ],
        "America/Araguaina" => [
            
            "c" => ["BR"]
        ],
        "America/Argentina/Buenos_Aires" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Catamarca" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/ComodRivadavia" => [
            
            
        ],
        "America/Argentina/Cordoba" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Jujuy" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/La_Rioja" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Mendoza" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Rio_Gallegos" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Salta" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/San_Juan" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/San_Luis" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Tucuman" => [
            
            "c" => ["AR"]
        ],
        "America/Argentina/Ushuaia" => [
            
            "c" => ["AR"]
        ],
        "America/Aruba" => [
            
            "c" => ["AW"],
            
        ],
        "America/Asuncion" => [
            
            
            "c" => ["PY"]
        ],
        "America/Atikokan" => [
            
            "c" => ["CA"],
            
        ],
        "America/Atka" => [
            
            
        ],
        "America/Bahia" => [
            
            "c" => ["BR"]
        ],
        "America/Bahia_Banderas" => [
            
            
            "c" => ["MX"]
        ],
        "America/Barbados" => [
            
            "c" => ["BB"]
        ],
        "America/Belem" => [
            
            "c" => ["BR"]
        ],
        "America/Belize" => [
            
            "c" => ["BZ"]
        ],
        "America/Blanc-Sablon" => [
            
            "c" => ["CA"],
            
        ],
        "America/Boa_Vista" => [
            
            "c" => ["BR"]
        ],
        "America/Bogota" => [
            
            "c" => ["CO"]
        ],
        "America/Boise" => [
            
            
            "c" => ["US"]
        ],
        "America/Buenos_Aires" => [
            
            
        ],
        "America/Cambridge_Bay" => [
            
            
            "c" => ["CA"]
        ],
        "America/Campo_Grande" => [
            
            "c" => ["BR"]
        ],
        "America/Cancun" => [
            
            "c" => ["MX"]
        ],
        "America/Caracas" => [
            
            "c" => ["VE"]
        ],
        "America/Catamarca" => [
            
            
        ],
        "America/Cayenne" => [
            
            "c" => ["GF"]
        ],
        "America/Cayman" => [
            
            "c" => ["KY"],
            
        ],
        "America/Chicago" => [
            
            
            "c" => ["US"]
        ],
        "America/Chihuahua" => [
            
            
            "c" => ["MX"]
        ],
        "America/Coral_Harbour" => [
            
            "c" => ["CA"],
            
        ],
        "America/Cordoba" => [
            
            
        ],
        "America/Costa_Rica" => [
            
            "c" => ["CR"]
        ],
        "America/Creston" => [
            
            "c" => ["CA"],
            
        ],
        "America/Cuiaba" => [
            
            "c" => ["BR"]
        ],
        "America/Curacao" => [
            
            "c" => ["CW"],
            
        ],
        "America/Danmarkshavn" => [
            
            "c" => ["GL"]
        ],
        "America/Dawson" => [
            
            "c" => ["CA"]
        ],
        "America/Dawson_Creek" => [
            
            "c" => ["CA"]
        ],
        "America/Denver" => [
            
            
            "c" => ["US"]
        ],
        "America/Detroit" => [
            
            
            "c" => ["US"]
        ],
        "America/Dominica" => [
            
            "c" => ["DM"],
            
        ],
        "America/Edmonton" => [
            
            
            "c" => ["CA"]
        ],
        "America/Eirunepe" => [
            
            "c" => ["BR"]
        ],
        "America/El_Salvador" => [
            
            "c" => ["SV"]
        ],
        "America/Ensenada" => [
            
            
        ],
        "America/Fort_Nelson" => [
            
            "c" => ["CA"]
        ],
        "America/Fort_Wayne" => [
            
            
        ],
        "America/Fortaleza" => [
            
            "c" => ["BR"]
        ],
        "America/Glace_Bay" => [
            
            
            "c" => ["CA"]
        ],
        "America/Godthab" => [
            
            
        ],
        "America/Goose_Bay" => [
            
            
            "c" => ["CA"]
        ],
        "America/Grand_Turk" => [
            
            
            "c" => ["TC"]
        ],
        "America/Grenada" => [
            
            "c" => ["GD"],
            
        ],
        "America/Guadeloupe" => [
            
            "c" => ["GP"],
            
        ],
        "America/Guatemala" => [
            
            "c" => ["GT"]
        ],
        "America/Guayaquil" => [
            
            "c" => ["EC"]
        ],
        "America/Guyana" => [
            
            "c" => ["GY"]
        ],
        "America/Halifax" => [
            
            
            "c" => ["CA"]
        ],
        "America/Havana" => [
            
            
            "c" => ["CU"]
        ],
        "America/Hermosillo" => [
            
            "c" => ["MX"]
        ],
        "America/Indiana/Indianapolis" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Knox" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Marengo" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Petersburg" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Tell_City" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Vevay" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Vincennes" => [
            
            
            "c" => ["US"]
        ],
        "America/Indiana/Winamac" => [
            
            
            "c" => ["US"]
        ],
        "America/Indianapolis" => [
            
            
        ],
        "America/Inuvik" => [
            
            
            "c" => ["CA"]
        ],
        "America/Iqaluit" => [
            
            
            "c" => ["CA"]
        ],
        "America/Jamaica" => [
            
            "c" => ["JM"]
        ],
        "America/Jujuy" => [
            
            
        ],
        "America/Juneau" => [
            
            
            "c" => ["US"]
        ],
        "America/Kentucky/Louisville" => [
            
            
            "c" => ["US"]
        ],
        "America/Kentucky/Monticello" => [
            
            
            "c" => ["US"]
        ],
        "America/Knox_IN" => [
            
            
        ],
        "America/Kralendijk" => [
            
            "c" => ["BQ"],
            
        ],
        "America/La_Paz" => [
            
            "c" => ["BO"]
        ],
        "America/Lima" => [
            
            "c" => ["PE"]
        ],
        "America/Los_Angeles" => [
            
            
            "c" => ["US"]
        ],
        "America/Louisville" => [
            
            
        ],
        "America/Lower_Princes" => [
            
            "c" => ["SX"],
            
        ],
        "America/Maceio" => [
            
            "c" => ["BR"]
        ],
        "America/Managua" => [
            
            "c" => ["NI"]
        ],
        "America/Manaus" => [
            
            "c" => ["BR"]
        ],
        "America/Marigot" => [
            
            "c" => ["MF"],
            
        ],
        "America/Martinique" => [
            
            "c" => ["MQ"]
        ],
        "America/Matamoros" => [
            
            
            "c" => ["MX"]
        ],
        "America/Mazatlan" => [
            
            
            "c" => ["MX"]
        ],
        "America/Mendoza" => [
            
            
        ],
        "America/Menominee" => [
            
            
            "c" => ["US"]
        ],
        "America/Merida" => [
            
            
            "c" => ["MX"]
        ],
        "America/Metlakatla" => [
            
            
            "c" => ["US"]
        ],
        "America/Mexico_City" => [
            
            
            "c" => ["MX"]
        ],
        "America/Miquelon" => [
            
            
            "c" => ["PM"]
        ],
        "America/Moncton" => [
            
            
            "c" => ["CA"]
        ],
        "America/Monterrey" => [
            
            
            "c" => ["MX"]
        ],
        "America/Montevideo" => [
            
            "c" => ["UY"]
        ],
        "America/Montreal" => [
            
            "c" => ["CA"],
            
        ],
        "America/Montserrat" => [
            
            "c" => ["MS"],
            
        ],
        "America/Nassau" => [
            
            "c" => ["BS"],
            
        ],
        "America/New_York" => [
            
            
            "c" => ["US"]
        ],
        "America/Nipigon" => [
            
            
            "c" => ["CA"]
        ],
        "America/Nome" => [
            
            
            "c" => ["US"]
        ],
        "America/Noronha" => [
            
            "c" => ["BR"]
        ],
        "America/North_Dakota/Beulah" => [
            
            
            "c" => ["US"]
        ],
        "America/North_Dakota/Center" => [
            
            
            "c" => ["US"]
        ],
        "America/North_Dakota/New_Salem" => [
            
            
            "c" => ["US"]
        ],
        "America/Nuuk" => [
            
            
            "c" => ["GL"]
        ],
        "America/Ojinaga" => [
            
            
            "c" => ["MX"]
        ],
        "America/Panama" => [
            
            "c" => ["PA", "CA", "KY"]
        ],
        "America/Pangnirtung" => [
            
            
            "c" => ["CA"]
        ],
        "America/Paramaribo" => [
            
            "c" => ["SR"]
        ],
        "America/Phoenix" => [
            
            "c" => ["US", "CA"]
        ],
        "America/Port-au-Prince" => [
            
            
            "c" => ["HT"]
        ],
        "America/Port_of_Spain" => [
            
            "c" => ["TT"],
            
        ],
        "America/Porto_Acre" => [
            
            
        ],
        "America/Porto_Velho" => [
            
            "c" => ["BR"]
        ],
        "America/Puerto_Rico" => [
            
            "c" => [
                "PR",
                "AG",
                "CA",
                "AI",
                "AW",
                "BL",
                "BQ",
                "CW",
                "DM",
                "GD",
                "GP",
                "KN",
                "LC",
                "MF",
                "MS",
                "SX",
                "TT",
                "VC",
                "VG",
                "VI"
            ]
        ],
        "America/Punta_Arenas" => [
            
            "c" => ["CL"]
        ],
        "America/Rainy_River" => [
            
            
            "c" => ["CA"]
        ],
        "America/Rankin_Inlet" => [
            
            
            "c" => ["CA"]
        ],
        "America/Recife" => [
            
            "c" => ["BR"]
        ],
        "America/Regina" => [
            
            "c" => ["CA"]
        ],
        "America/Resolute" => [
            
            
            "c" => ["CA"]
        ],
        "America/Rio_Branco" => [
            
            "c" => ["BR"]
        ],
        "America/Rosario" => [
            
            
        ],
        "America/Santa_Isabel" => [
            
            
        ],
        "America/Santarem" => [
            
            "c" => ["BR"]
        ],
        "America/Santiago" => [
            
            
            "c" => ["CL"]
        ],
        "America/Santo_Domingo" => [
            
            "c" => ["DO"]
        ],
        "America/Sao_Paulo" => [
            
            "c" => ["BR"]
        ],
        "America/Scoresbysund" => [
            
            
            "c" => ["GL"]
        ],
        "America/Shiprock" => [
            
            
        ],
        "America/Sitka" => [
            
            
            "c" => ["US"]
        ],
        "America/St_Barthelemy" => [
            
            "c" => ["BL"],
            
        ],
        "America/St_Johns" => [
            
            
            "c" => ["CA"]
        ],
        "America/St_Kitts" => [
            
            "c" => ["KN"],
            
        ],
        "America/St_Lucia" => [
            
            "c" => ["LC"],
            
        ],
        "America/St_Thomas" => [
            
            "c" => ["VI"],
            
        ],
        "America/St_Vincent" => [
            
            "c" => ["VC"],
            
        ],
        "America/Swift_Current" => [
            
            "c" => ["CA"]
        ],
        "America/Tegucigalpa" => [
            
            "c" => ["HN"]
        ],
        "America/Thule" => [
            
            
            "c" => ["GL"]
        ],
        "America/Thunder_Bay" => [
            
            
            "c" => ["CA"]
        ],
        "America/Tijuana" => [
            
            
            "c" => ["MX"]
        ],
        "America/Toronto" => [
            
            
            "c" => ["CA", "BS"]
        ],
        "America/Tortola" => [
            
            "c" => ["VG"],
            
        ],
        "America/Vancouver" => [
            
            
            "c" => ["CA"]
        ],
        "America/Virgin" => [
            
            "c" => ["VI"],
            
        ],
        "America/Whitehorse" => [
            
            "c" => ["CA"]
        ],
        "America/Winnipeg" => [
            
            
            "c" => ["CA"]
        ],
        "America/Yakutat" => [
            
            
            "c" => ["US"]
        ],
        "America/Yellowknife" => [
            
            
            "c" => ["CA"]
        ],
        "Antarctica/Casey" => [
            
            "c" => ["AQ"]
        ],
        "Antarctica/Davis" => [
            
            "c" => ["AQ"]
        ],
        "Antarctica/DumontDUrville" => [
            
            "c" => ["AQ"],
            
        ],
        "Antarctica/Macquarie" => [
            
            
            "c" => ["AU"]
        ],
        "Antarctica/Mawson" => [
            
            "c" => ["AQ"]
        ],
        "Antarctica/McMurdo" => [
            
            "c" => ["AQ"],
            
        ],
        "Antarctica/Palmer" => [
            
            "c" => ["AQ"]
        ],
        "Antarctica/Rothera" => [
            
            "c" => ["AQ"]
        ],
        "Antarctica/South_Pole" => [
            
            "c" => ["AQ"],
            
        ],
        "Antarctica/Syowa" => [
            
            "c" => ["AQ"],
            
        ],
        "Antarctica/Troll" => [
            
            
            "c" => ["AQ"]
        ],
        "Antarctica/Vostok" => [
            
            "c" => ["AQ"]
        ],
        "Arctic/Longyearbyen" => [
            
            "c" => ["SJ"],
            
        ],
        "Asia/Aden" => [
            
            "c" => ["YE"],
            
        ],
        "Asia/Almaty" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Amman" => [
            
            
            "c" => ["JO"]
        ],
        "Asia/Anadyr" => [
            
            "c" => ["RU"]
        ],
        "Asia/Aqtau" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Aqtobe" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Ashgabat" => [
            
            "c" => ["TM"]
        ],
        "Asia/Ashkhabad" => [
            
            
        ],
        "Asia/Atyrau" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Baghdad" => [
            
            "c" => ["IQ"]
        ],
        "Asia/Bahrain" => [
            
            "c" => ["BH"],
            
        ],
        "Asia/Baku" => [
            
            "c" => ["AZ"]
        ],
        "Asia/Bangkok" => [
            
            "c" => ["TH", "KH", "LA", "VN"]
        ],
        "Asia/Barnaul" => [
            
            "c" => ["RU"]
        ],
        "Asia/Beirut" => [
            
            
            "c" => ["LB"]
        ],
        "Asia/Bishkek" => [
            
            "c" => ["KG"]
        ],
        "Asia/Brunei" => [
            
            "c" => ["BN"]
        ],
        "Asia/Calcutta" => [
            
            
        ],
        "Asia/Chita" => [
            
            "c" => ["RU"]
        ],
        "Asia/Choibalsan" => [
            
            "c" => ["MN"]
        ],
        "Asia/Chongqing" => [
            
            
        ],
        "Asia/Chungking" => [
            
            
        ],
        "Asia/Colombo" => [
            
            "c" => ["LK"]
        ],
        "Asia/Dacca" => [
            
            
        ],
        "Asia/Damascus" => [
            
            
            "c" => ["SY"]
        ],
        "Asia/Dhaka" => [
            
            "c" => ["BD"]
        ],
        "Asia/Dili" => [
            
            "c" => ["TL"]
        ],
        "Asia/Dubai" => [
            
            "c" => ["AE", "OM"]
        ],
        "Asia/Dushanbe" => [
            
            "c" => ["TJ"]
        ],
        "Asia/Famagusta" => [
            
            
            "c" => ["CY"]
        ],
        "Asia/Gaza" => [
            
            
            "c" => ["PS"]
        ],
        "Asia/Harbin" => [
            
            
        ],
        "Asia/Hebron" => [
            
            
            "c" => ["PS"]
        ],
        "Asia/Ho_Chi_Minh" => [
            
            "c" => ["VN"]
        ],
        "Asia/Hong_Kong" => [
            
            "c" => ["HK"]
        ],
        "Asia/Hovd" => [
            
            "c" => ["MN"]
        ],
        "Asia/Irkutsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Istanbul" => [
            
            
        ],
        "Asia/Jakarta" => [
            
            "c" => ["ID"]
        ],
        "Asia/Jayapura" => [
            
            "c" => ["ID"]
        ],
        "Asia/Jerusalem" => [
            
            
            "c" => ["IL"]
        ],
        "Asia/Kabul" => [
            
            "c" => ["AF"]
        ],
        "Asia/Kamchatka" => [
            
            "c" => ["RU"]
        ],
        "Asia/Karachi" => [
            
            "c" => ["PK"]
        ],
        "Asia/Kashgar" => [
            
            
        ],
        "Asia/Kathmandu" => [
            
            "c" => ["NP"]
        ],
        "Asia/Katmandu" => [
            
            
        ],
        "Asia/Khandyga" => [
            
            "c" => ["RU"]
        ],
        "Asia/Kolkata" => [
            
            "c" => ["IN"]
        ],
        "Asia/Krasnoyarsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Kuala_Lumpur" => [
            
            "c" => ["MY"]
        ],
        "Asia/Kuching" => [
            
            "c" => ["MY"]
        ],
        "Asia/Kuwait" => [
            
            "c" => ["KW"],
            
        ],
        "Asia/Macao" => [
            
            
        ],
        "Asia/Macau" => [
            
            "c" => ["MO"]
        ],
        "Asia/Magadan" => [
            
            "c" => ["RU"]
        ],
        "Asia/Makassar" => [
            
            "c" => ["ID"]
        ],
        "Asia/Manila" => [
            
            "c" => ["PH"]
        ],
        "Asia/Muscat" => [
            
            "c" => ["OM"],
            
        ],
        "Asia/Nicosia" => [
            
            
            "c" => ["CY"]
        ],
        "Asia/Novokuznetsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Novosibirsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Omsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Oral" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Phnom_Penh" => [
            
            "c" => ["KH"],
            
        ],
        "Asia/Pontianak" => [
            
            "c" => ["ID"]
        ],
        "Asia/Pyongyang" => [
            
            "c" => ["KP"]
        ],
        "Asia/Qatar" => [
            
            "c" => ["QA", "BH"]
        ],
        "Asia/Qostanay" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Qyzylorda" => [
            
            "c" => ["KZ"]
        ],
        "Asia/Rangoon" => [
            
            
        ],
        "Asia/Riyadh" => [
            
            "c" => ["SA", "AQ", "KW", "YE"]
        ],
        "Asia/Saigon" => [
            
            
        ],
        "Asia/Sakhalin" => [
            
            "c" => ["RU"]
        ],
        "Asia/Samarkand" => [
            
            "c" => ["UZ"]
        ],
        "Asia/Seoul" => [
            
            "c" => ["KR"]
        ],
        "Asia/Shanghai" => [
            
            "c" => ["CN"]
        ],
        "Asia/Singapore" => [
            
            "c" => ["SG", "MY"]
        ],
        "Asia/Srednekolymsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Taipei" => [
            
            "c" => ["TW"]
        ],
        "Asia/Tashkent" => [
            
            "c" => ["UZ"]
        ],
        "Asia/Tbilisi" => [
            
            "c" => ["GE"]
        ],
        "Asia/Tehran" => [
            
            
            "c" => ["IR"]
        ],
        "Asia/Tel_Aviv" => [
            
            
        ],
        "Asia/Thimbu" => [
            
            
        ],
        "Asia/Thimphu" => [
            
            "c" => ["BT"]
        ],
        "Asia/Tokyo" => [
            
            "c" => ["JP"]
        ],
        "Asia/Tomsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Ujung_Pandang" => [
            
            
        ],
        "Asia/Ulaanbaatar" => [
            
            "c" => ["MN"]
        ],
        "Asia/Ulan_Bator" => [
            
            
        ],
        "Asia/Urumqi" => [
            
            "c" => ["CN"]
        ],
        "Asia/Ust-Nera" => [
            
            "c" => ["RU"]
        ],
        "Asia/Vientiane" => [
            
            "c" => ["LA"],
            
        ],
        "Asia/Vladivostok" => [
            
            "c" => ["RU"]
        ],
        "Asia/Yakutsk" => [
            
            "c" => ["RU"]
        ],
        "Asia/Yangon" => [
            
            "c" => ["MM"]
        ],
        "Asia/Yekaterinburg" => [
            
            "c" => ["RU"]
        ],
        "Asia/Yerevan" => [
            
            "c" => ["AM"]
        ],
        "Atlantic/Azores" => [
            
            
            "c" => ["PT"]
        ],
        "Atlantic/Bermuda" => [
            
            
            "c" => ["BM"]
        ],
        "Atlantic/Canary" => [
            
            
            "c" => ["ES"]
        ],
        "Atlantic/Cape_Verde" => [
            
            "c" => ["CV"]
        ],
        "Atlantic/Faeroe" => [
            
            
        ],
        "Atlantic/Faroe" => [
            
            
            "c" => ["FO"]
        ],
        "Atlantic/Jan_Mayen" => [
            
            "c" => ["SJ"],
            
        ],
        "Atlantic/Madeira" => [
            
            
            "c" => ["PT"]
        ],
        "Atlantic/Reykjavik" => [
            
            "c" => ["IS"]
        ],
        "Atlantic/South_Georgia" => [
            
            "c" => ["GS"]
        ],
        "Atlantic/St_Helena" => [
            
            "c" => ["SH"],
            
        ],
        "Atlantic/Stanley" => [
            
            "c" => ["FK"]
        ],
        "Australia/ACT" => [
            
            
        ],
        "Australia/Adelaide" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/Brisbane" => [
            
            "c" => ["AU"]
        ],
        "Australia/Broken_Hill" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/Canberra" => [
            
            
        ],
        "Australia/Currie" => [
            
            
        ],
        "Australia/Darwin" => [
            
            "c" => ["AU"]
        ],
        "Australia/Eucla" => [
            
            "c" => ["AU"]
        ],
        "Australia/Hobart" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/LHI" => [
            
            
        ],
        "Australia/Lindeman" => [
            
            "c" => ["AU"]
        ],
        "Australia/Lord_Howe" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/Melbourne" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/NSW" => [
            
            
        ],
        "Australia/North" => [
            
            
        ],
        "Australia/Perth" => [
            
            "c" => ["AU"]
        ],
        "Australia/Queensland" => [
            
            
        ],
        "Australia/South" => [
            
            
        ],
        "Australia/Sydney" => [
            
            
            "c" => ["AU"]
        ],
        "Australia/Tasmania" => [
            
            
        ],
        "Australia/Victoria" => [
            
            
        ],
        "Australia/West" => [
            
            
        ],
        "Australia/Yancowinna" => [
            
            
        ],
        "Brazil/Acre" => [
            
            
        ],
        "Brazil/DeNoronha" => [
            
            
        ],
        "Brazil/East" => [
            
            
        ],
        "Brazil/West" => [
            
            
        ],
        "CET" => [
            
            
        ],
        "CST6CDT" => [
            
            
        ],
        "Canada/Atlantic" => [
            
            
        ],
        "Canada/Central" => [
            
            
        ],
        "Canada/Eastern" => [
            
            "c" => ["CA"],
            
        ],
        "Canada/Mountain" => [
            
            
        ],
        "Canada/Newfoundland" => [
            
            
        ],
        "Canada/Pacific" => [
            
            
        ],
        "Canada/Saskatchewan" => [
            
            
        ],
        "Canada/Yukon" => [
            
            
        ],
        "Chile/Continental" => [
            
            
        ],
        "Chile/EasterIsland" => [
            
            
        ],
        "Cuba" => [
            
            
        ],
        "EET" => [
            
            
        ],
        "EST" => [
            
        ],
        "EST5EDT" => [
            
            
        ],
        "Egypt" => [
            
            
        ],
        "Eire" => [
            
            
        ],
        "Etc/GMT" => [
            
        ],
        "Etc/GMT+0" => [
            
            
        ],
        "Etc/GMT+1" => [
            
        ],
        "Etc/GMT+10" => [
            
        ],
        "Etc/GMT+11" => [
            
        ],
        "Etc/GMT+12" => [
            
        ],
        "Etc/GMT+2" => [
            
        ],
        "Etc/GMT+3" => [
            
        ],
        "Etc/GMT+4" => [
            
        ],
        "Etc/GMT+5" => [
            
        ],
        "Etc/GMT+6" => [
            
        ],
        "Etc/GMT+7" => [
            
        ],
        "Etc/GMT+8" => [
            
        ],
        "Etc/GMT+9" => [
            
        ],
        "Etc/GMT-0" => [
            
            
        ],
        "Etc/GMT-1" => [
            
        ],
        "Etc/GMT-10" => [
            
        ],
        "Etc/GMT-11" => [
            
        ],
        "Etc/GMT-12" => [
            
        ],
        "Etc/GMT-13" => [
            
        ],
        "Etc/GMT-14" => [
            
        ],
        "Etc/GMT-2" => [
            
        ],
        "Etc/GMT-3" => [
            
        ],
        "Etc/GMT-4" => [
            
        ],
        "Etc/GMT-5" => [
            
        ],
        "Etc/GMT-6" => [
            
        ],
        "Etc/GMT-7" => [
            
        ],
        "Etc/GMT-8" => [
            
        ],
        "Etc/GMT-9" => [
            
        ],
        "Etc/GMT0" => [
            
            
        ],
        "Etc/Greenwich" => [
            
            
        ],
        "Etc/UCT" => [
            
            
        ],
        "Etc/UTC" => [
            
        ],
        "Etc/Universal" => [
            
            
        ],
        "Etc/Zulu" => [
            
            
        ],
        "Europe/Amsterdam" => [
            
            
            "c" => ["NL"]
        ],
        "Europe/Andorra" => [
            
            
            "c" => ["AD"]
        ],
        "Europe/Astrakhan" => [
            
            "c" => ["RU"]
        ],
        "Europe/Athens" => [
            
            
            "c" => ["GR"]
        ],
        "Europe/Belfast" => [
            
            "c" => ["GB"],
            
        ],
        "Europe/Belgrade" => [
            
            
            "c" => ["RS", "BA", "HR", "ME", "MK", "SI"]
        ],
        "Europe/Berlin" => [
            
            
            "c" => ["DE"]
        ],
        "Europe/Bratislava" => [
            
            "c" => ["SK"],
            
        ],
        "Europe/Brussels" => [
            
            
            "c" => ["BE"]
        ],
        "Europe/Bucharest" => [
            
            
            "c" => ["RO"]
        ],
        "Europe/Budapest" => [
            
            
            "c" => ["HU"]
        ],
        "Europe/Busingen" => [
            
            "c" => ["DE"],
            
        ],
        "Europe/Chisinau" => [
            
            
            "c" => ["MD"]
        ],
        "Europe/Copenhagen" => [
            
            
            "c" => ["DK"]
        ],
        "Europe/Dublin" => [
            
            
            "c" => ["IE"]
        ],
        "Europe/Gibraltar" => [
            
            
            "c" => ["GI"]
        ],
        "Europe/Guernsey" => [
            
            "c" => ["GG"],
            
        ],
        "Europe/Helsinki" => [
            
            
            "c" => ["FI", "AX"]
        ],
        "Europe/Isle_of_Man" => [
            
            "c" => ["IM"],
            
        ],
        "Europe/Istanbul" => [
            
            "c" => ["TR"]
        ],
        "Europe/Jersey" => [
            
            "c" => ["JE"],
            
        ],
        "Europe/Kaliningrad" => [
            
            "c" => ["RU"]
        ],
        "Europe/Kiev" => [
            
            
            "c" => ["UA"]
        ],
        "Europe/Kirov" => [
            
            "c" => ["RU"]
        ],
        "Europe/Lisbon" => [
            
            
            "c" => ["PT"]
        ],
        "Europe/Ljubljana" => [
            
            "c" => ["SI"],
            
        ],
        "Europe/London" => [
            
            
            "c" => ["GB", "GG", "IM", "JE"]
        ],
        "Europe/Luxembourg" => [
            
            
            "c" => ["LU"]
        ],
        "Europe/Madrid" => [
            
            
            "c" => ["ES"]
        ],
        "Europe/Malta" => [
            
            
            "c" => ["MT"]
        ],
        "Europe/Mariehamn" => [
            
            "c" => ["AX"],
            
        ],
        "Europe/Minsk" => [
            
            "c" => ["BY"]
        ],
        "Europe/Monaco" => [
            
            
            "c" => ["MC"]
        ],
        "Europe/Moscow" => [
            
            "c" => ["RU"]
        ],
        "Europe/Nicosia" => [
            
            
        ],
        "Europe/Oslo" => [
            
            
            "c" => ["NO", "SJ", "BV"]
        ],
        "Europe/Paris" => [
            
            
            "c" => ["FR"]
        ],
        "Europe/Podgorica" => [
            
            "c" => ["ME"],
            
        ],
        "Europe/Prague" => [
            
            
            "c" => ["CZ", "SK"]
        ],
        "Europe/Riga" => [
            
            
            "c" => ["LV"]
        ],
        "Europe/Rome" => [
            
            
            "c" => ["IT", "SM", "VA"]
        ],
        "Europe/Samara" => [
            
            "c" => ["RU"]
        ],
        "Europe/San_Marino" => [
            
            "c" => ["SM"],
            
        ],
        "Europe/Sarajevo" => [
            
            "c" => ["BA"],
            
        ],
        "Europe/Saratov" => [
            
            "c" => ["RU"]
        ],
        "Europe/Simferopol" => [
            
            "c" => ["RU", "UA"]
        ],
        "Europe/Skopje" => [
            
            "c" => ["MK"],
            
        ],
        "Europe/Sofia" => [
            
            
            "c" => ["BG"]
        ],
        "Europe/Stockholm" => [
            
            
            "c" => ["SE"]
        ],
        "Europe/Tallinn" => [
            
            
            "c" => ["EE"]
        ],
        "Europe/Tirane" => [
            
            
            "c" => ["AL"]
        ],
        "Europe/Tiraspol" => [
            
            
        ],
        "Europe/Ulyanovsk" => [
            
            "c" => ["RU"]
        ],
        "Europe/Uzhgorod" => [
            
            
            "c" => ["UA"]
        ],
        "Europe/Vaduz" => [
            
            "c" => ["LI"],
            
        ],
        "Europe/Vatican" => [
            
            "c" => ["VA"],
            
        ],
        "Europe/Vienna" => [
            
            
            "c" => ["AT"]
        ],
        "Europe/Vilnius" => [
            
            
            "c" => ["LT"]
        ],
        "Europe/Volgograd" => [
            
            "c" => ["RU"]
        ],
        "Europe/Warsaw" => [
            
            
            "c" => ["PL"]
        ],
        "Europe/Zagreb" => [
            
            "c" => ["HR"],
            
        ],
        "Europe/Zaporozhye" => [
            
            
            "c" => ["UA"]
        ],
        "Europe/Zurich" => [
            
            
            "c" => ["CH", "DE", "LI"]
        ],
        "Factory" => [
            
        ],
        "GB" => [
            
            "c" => ["GB"],
            
        ],
        "GB-Eire" => [
            
            "c" => ["GB"],
            
        ],
        "GMT" => [
            
            
        ],
        "GMT+0" => [
            
            
        ],
        "GMT-0" => [
            
            
        ],
        "GMT0" => [
            
            
        ],
        "Greenwich" => [
            
            
        ],
        "HST" => [
            
        ],
        "Hongkong" => [
            
            
        ],
        "Iceland" => [
            
            
        ],
        "Indian/Antananarivo" => [
            
            "c" => ["MG"],
            
        ],
        "Indian/Chagos" => [
            
            "c" => ["IO"]
        ],
        "Indian/Christmas" => [
            
            "c" => ["CX"]
        ],
        "Indian/Cocos" => [
            
            "c" => ["CC"]
        ],
        "Indian/Comoro" => [
            
            "c" => ["KM"],
            
        ],
        "Indian/Kerguelen" => [
            
            "c" => ["TF", "HM"]
        ],
        "Indian/Mahe" => [
            
            "c" => ["SC"]
        ],
        "Indian/Maldives" => [
            
            "c" => ["MV"]
        ],
        "Indian/Mauritius" => [
            
            "c" => ["MU"]
        ],
        "Indian/Mayotte" => [
            
            "c" => ["YT"],
            
        ],
        "Indian/Reunion" => [
            
            "c" => ["RE", "TF"]
        ],
        "Iran" => [
            
            
        ],
        "Israel" => [
            
            
        ],
        "Jamaica" => [
            
            
        ],
        "Japan" => [
            
            
        ],
        "Kwajalein" => [
            
            
        ],
        "Libya" => [
            
            
        ],
        "MET" => [
            
            
        ],
        "MST" => [
            
        ],
        "MST7MDT" => [
            
            
        ],
        "Mexico/BajaNorte" => [
            
            
        ],
        "Mexico/BajaSur" => [
            
            
        ],
        "Mexico/General" => [
            
            
        ],
        "NZ" => [
            
            "c" => ["NZ"],
            
        ],
        "NZ-CHAT" => [
            
            
        ],
        "Navajo" => [
            
            
        ],
        "PRC" => [
            
            
        ],
        "PST8PDT" => [
            
            
        ],
        "Pacific/Apia" => [
            
            "c" => ["WS"]
        ],
        "Pacific/Auckland" => [
            
            
            "c" => ["NZ", "AQ"]
        ],
        "Pacific/Bougainville" => [
            
            "c" => ["PG"]
        ],
        "Pacific/Chatham" => [
            
            
            "c" => ["NZ"]
        ],
        "Pacific/Chuuk" => [
            
            "c" => ["FM"]
        ],
        "Pacific/Easter" => [
            
            
            "c" => ["CL"]
        ],
        "Pacific/Efate" => [
            
            "c" => ["VU"]
        ],
        "Pacific/Enderbury" => [
            
            
        ],
        "Pacific/Fakaofo" => [
            
            "c" => ["TK"]
        ],
        "Pacific/Fiji" => [
            
            
            "c" => ["FJ"]
        ],
        "Pacific/Funafuti" => [
            
            "c" => ["TV"]
        ],
        "Pacific/Galapagos" => [
            
            "c" => ["EC"]
        ],
        "Pacific/Gambier" => [
            
            "c" => ["PF"]
        ],
        "Pacific/Guadalcanal" => [
            
            "c" => ["SB"]
        ],
        "Pacific/Guam" => [
            
            "c" => ["GU", "MP"]
        ],
        "Pacific/Honolulu" => [
            
            "c" => ["US", "UM"]
        ],
        "Pacific/Johnston" => [
            
            "c" => ["UM"],
            
        ],
        "Pacific/Kanton" => [
            
            "c" => ["KI"]
        ],
        "Pacific/Kiritimati" => [
            
            "c" => ["KI"]
        ],
        "Pacific/Kosrae" => [
            
            "c" => ["FM"]
        ],
        "Pacific/Kwajalein" => [
            
            "c" => ["MH"]
        ],
        "Pacific/Majuro" => [
            
            "c" => ["MH"]
        ],
        "Pacific/Marquesas" => [
            
            "c" => ["PF"]
        ],
        "Pacific/Midway" => [
            
            "c" => ["UM"],
            
        ],
        "Pacific/Nauru" => [
            
            "c" => ["NR"]
        ],
        "Pacific/Niue" => [
            
            "c" => ["NU"]
        ],
        "Pacific/Norfolk" => [
            
            
            "c" => ["NF"]
        ],
        "Pacific/Noumea" => [
            
            "c" => ["NC"]
        ],
        "Pacific/Pago_Pago" => [
            
            "c" => ["AS", "UM"]
        ],
        "Pacific/Palau" => [
            
            "c" => ["PW"]
        ],
        "Pacific/Pitcairn" => [
            
            "c" => ["PN"]
        ],
        "Pacific/Pohnpei" => [
            
            "c" => ["FM"]
        ],
        "Pacific/Ponape" => [
            
            
        ],
        "Pacific/Port_Moresby" => [
            
            "c" => ["PG", "AQ"]
        ],
        "Pacific/Rarotonga" => [
            
            "c" => ["CK"]
        ],
        "Pacific/Saipan" => [
            
            "c" => ["MP"],
            
        ],
        "Pacific/Samoa" => [
            
            "c" => ["WS"],
            
        ],
        "Pacific/Tahiti" => [
            
            "c" => ["PF"]
        ],
        "Pacific/Tarawa" => [
            
            "c" => ["KI"]
        ],
        "Pacific/Tongatapu" => [
            
            "c" => ["TO"]
        ],
        "Pacific/Truk" => [
            
            
        ],
        "Pacific/Wake" => [
            
            "c" => ["UM"]
        ],
        "Pacific/Wallis" => [
            
            "c" => ["WF"]
        ],
        "Pacific/Yap" => [
            
            
        ],
        "Poland" => [
            
            
        ],
        "Portugal" => [
            
            
        ],
        "ROC" => [
            
            
        ],
        "ROK" => [
            
            
        ],
        "Singapore" => [
            
            "c" => ["SG"],
            
        ],
        "Turkey" => [
            
            
        ],
        "UCT" => [
            
            
        ],
        "US/Alaska" => [
            
            
        ],
        "US/Aleutian" => [
            
            
        ],
        "US/Arizona" => [
            
            "c" => ["US"],
            
        ],
        "US/Central" => [
            
            
        ],
        "US/East-Indiana" => [
            
            
        ],
        "US/Eastern" => [
            
            
        ],
        "US/Hawaii" => [
            
            "c" => ["US"],
            
        ],
        "US/Indiana-Starke" => [
            
            
        ],
        "US/Michigan" => [
            
            
        ],
        "US/Mountain" => [
            
            
        ],
        "US/Pacific" => [
            
            
        ],
        "US/Samoa" => [
            
            "c" => ["WS"],
            
        ],
        "UTC" => [
        ],
        "Universal" => [
        ],
        "W-SU" => [
        ],
        "WET" => [
        ],
        "Zulu" => [ 
        ]
	];

    static function getCountry(string $timezone) {
        if ($timezone === "" || !$timezone) {
            return null;
        }
        
        $alpha2CountryCode = self::timezones[$timezone]["c"][0];
        $data = (new \League\ISO3166\ISO3166)->alpha2($alpha2CountryCode);
        return $data['alpha3'];
    }

    static function getRegion(string $timezone){
        if ($timezone === "" || !$timezone) {
            return null;
        }
        return str_replace("_", " ", explode("/", $timezone)[1]);
    }


    public static function systemInfo($userAgent)
 {
    $os_platform    = "Unknown OS Platform";
    $os_array       = array('/windows phone 8/i'    =>  'Windows Phone 8',
                            '/windows phone os 7/i' =>  'Windows Phone 7',
                            '/windows nt 6.3/i'     =>  'Windows 8.1',
                            '/windows nt 6.2/i'     =>  'Windows 8',
                            '/windows nt 6.1/i'     =>  'Windows 7',
                            '/windows nt 6.0/i'     =>  'Windows Vista',
                            '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                            '/windows nt 5.1/i'     =>  'Windows XP',
                            '/windows xp/i'         =>  'Windows XP',
                            '/windows nt 5.0/i'     =>  'Windows 2000',
                            '/windows me/i'         =>  'Windows ME',
                            '/win98/i'              =>  'Windows 98',
                            '/win95/i'              =>  'Windows 95',
                            '/win16/i'              =>  'Windows 3.11',
                            '/macintosh|mac os x/i' =>  'Mac OS X',
                            '/mac_powerpc/i'        =>  'Mac OS 9',
                            '/linux/i'              =>  'Linux',
                            '/ubuntu/i'             =>  'Ubuntu',
                            '/iphone/i'             =>  'iPhone',
                            '/ipod/i'               =>  'iPod',
                            '/ipad/i'               =>  'iPad',
                            '/android/i'            =>  'Android',
                            '/blackberry/i'         =>  'BlackBerry',
                            '/webos/i'              =>  'Mobile');

    $device = '';
    foreach ($os_array as $regex => $value) 
    { 
        if (preg_match($regex, $userAgent)) 
        {
            $os_platform    =   $value;
            $device = !preg_match('/(windows|mac|linux|ubuntu)/i',$os_platform) ? 'MOBILE'
            :(preg_match('/phone/i', $os_platform)?'MOBILE':'SYSTEM');
            break;
        }
    }
    $device = !$device? 'SYSTEM':$device;
    return array('os'=>$os_platform,'device'=>$device);
 }

}



