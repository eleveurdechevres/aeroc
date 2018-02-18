// Calculs : https://www.energieplus-lesite.be/index.php?id=11243#c5641+c5642+c5647

// courbes Psychrométriques :
// - Recommanded
// - A1
// - A2
// - A3
// - A4
// http://blog.thehigheredcio.com/ashrae-tc-9-9-new-thermal-guidelines-for-data-centers/

// x:     Humidité absolue______________________kg eau / kg d'air sec
// η:     Temperature___________________________°C
// φ:     Humidité relative_____________________%
// Pv :   Pression partielle de vaporisation____Pa
// Pvs :  Pression de vapeur saturante__________Pa
// Patm : Pression atmosphérique________________Pa
// h :    Enthalpie_____________________________kJ/kg d'air sec
// ηh :   Température du bulbe humide___________°C
// Pvsηh : la pression de vapeur saturante correspondant à ηh
//                    7.625 η
//          2.7877 + ---------
// Pvs = 10^         241.6 + η
//
// φ = Pv / Pvs
//
// x = 0.622 Pv/(Patm -Pv)
// 
// h = 1.006 η + x(2501 + 1.83η)
//
// Pv = Pvsηh - K.P (η - ηh)
//
// K = 6,6 x 10-4
// P = 101 300 Pa
const Patm = 101300;
const K = 0.00066;
const P = Patm;

export function get_X (η, φ) {
    η = η*1;
    φ = φ/100;
    var Pvs = get_Pvs(η);
    var Pv = get_Pv(φ, Pvs);
    var x=0.622*(Pv/(Patm - Pv));

    return x*1000;
}


function get_Pvs(η) {
    η = η*1;
    var Pvs = Math.pow(10, (2.7877+((7.625*η) / (241.6+η))));
    return Pvs;
}

function get_Pv(φ, Pvs) {
    φ = φ*1;
    Pvs = Pvs*1;
    return φ*Pvs;
}

export function get_η(h, x) {
    h = h*1;
    x = x*1;
    return (h - 2501*x) / (1.006 + 1.83*x)
}

function get_η_From_ηh(ηh) {
    var Pvsηh = get_Pvs(ηh);
}

export function get_η_From_ηh_φ(ηh, φ) {
    var Pvsηh = get_Pvs(ηh);
    var Pv = get_Pvs(φ, Pvsηh);
    return (Pvsηh-Pv)/(K*P)+ηh;
}