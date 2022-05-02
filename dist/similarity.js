/// <reference path="../Lib/fastest-levenshtein/mod.d.ts"/>
function charcode_arr(s) {
    var ret = new Array(s.length);
    for (var i = 0; i < s.length; i++)
        ret[i] = s.charCodeAt(i);
    return ret;
}
function simi_quick(a, b) {
    var arra = charcode_arr(a).sort(function (a, b) { return a - b; }), arrb = charcode_arr(b).sort(function (a, b) { return a - b; }), la = arra.length, lb = arrb.length, lmax = Math.max(arra.length, arrb.length), lcommon = 0, ia = 0, ib = 0;
    while (true) {
        if (ia >= la || ib >= lb)
            break;
        if (arra[ia] > arrb[ib])
            ++ib;
        else if (arra[ia] < arrb[ib])
            ++ia;
        else {
            ++lcommon;
            ++ia;
            ++ib;
        }
    }
    return lcommon / lmax;
}
function simi_levenshtein(a, b) {
    return 1 - FLD.distance(a, b) / Math.max(a.length, b.length);
}
