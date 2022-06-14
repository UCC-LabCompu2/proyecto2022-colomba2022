/**
 * Calcula el ingreso de nitrogeno mediante las proteinas consumidas, tambien asigna el valor al input de Nitrogeno Consumido
 * @method calcIngr
 * @param {number} ProtConsumidas - Valor que ingresa el usuario en el input Proteinas Consumidas
 * @return Ingr
 */
function calcIngr(ProtConsumidas){
    var Ingr;
    Ingr = (ProtConsumidas / 6.25);
    if (document.getElementById("UnidadPeso").value == "Gramos") {
        document.getElementById("NConsumido").value = Ingr + " G";
    }else{
        document.getElementById("NConsumido").value = Ingr + " mG";
    }
    return Ingr;
}

/**
 * Calcula la urea en orina mediante los valores de Urea y volumen urinario, tambien asigna el valor al input de Urea Urinaria
 * @method calcUreaUri
 * @param {number} Urea - Valor que ingresa el usuario en el input Urea
 * @param {number} VolUrinario - Valor que ingresa el usuario en el input Volumen Urinario
 * @return UreaUri
 */
function calcUreaUri(Urea, VolUrinario){
    var UreaUri;
    UreaUri = (Urea * VolUrinario);
    if ((document.getElementById("UnidadUrea").value == "Gramos/Litros") && (document.getElementById("UnidadVol").value == "Litros")) {
        document.getElementById("UreaUri").value = UreaUri + " G";
    }else {
        document.getElementById("UreaUri").value = UreaUri + " mG";
    }
    return UreaUri;
}

/**
 * Calcula el nitrogeno ureico urinario mediante la urea urinaria, tambien asigna el valor al input de Nitrogeno Ureico Urinario
 * @method calcNUU
 * @param {number} UreaUri - Valor calculado mediante la funcion calcUreaUri
 * @return NUU
 */
function calcNUU(UreaUri){
    var NUU;
    NUU = (UreaUri * 0.467);
    if ((document.getElementById("UnidadUrea").value == "Gramos/Litros") && (document.getElementById("UnidadVol").value == "Litros")){
        document.getElementById("NUU").value = NUU + " G";
    }else {
        document.getElementById("NUU").value = NUU + " mG";
    }
    return NUU;
}

/**
 * Calcula el egreso de nitrogeno mediante el nitrogeno ureico urinario
 * @method calcEgr
 * @param {number} NUU - Valor calculado mediante la funcion calcNUU
 * @return Egr
 */
function calcEgr(NUU){
    var Egr;
    if ((document.getElementById("UnidadUrea").value == "Gramos/Litros") && (document.getElementById("UnidadVol").value == "Litros")) {
        Egr = (NUU + 4);
    } else {
        Egr = (NUU + 4000);
    }
    return Egr;
}

/**
 * Calcula el balance nitrogenado mediante el ingreso y egreso de nitrogeno
 * @method calcBalance
 * @param {number} Ingr - Valor calculado mediante la funcion calcIngr
 * @param {number} Egr - Valor calculado mediante la funcion calcEgr
 * @return Balance
 */
function calcBalance(Ingr, Egr){
    var Balance;
    Balance = (Ingr - Egr);
    return Balance;
}

/**
 * Comienza el calculo de balance nitrogenado y asigna el valor de balance al input de Balance Nitrogenado. Al final llama la funcion Canvas
 * @method Calcular
 */
function Calcular(){
    var Balance, UreaUri, NUU, Egr, Ingr;

    if (Comprobar() == 1){
        var ProtConsumidas = document.getElementById("ProtConsumidas").value;
        var Urea = document.getElementById("Urea").value;
        var VolUrinario = document.getElementById("VolUrinario").value;

        if (Urea != "" && ProtConsumidas != "" && VolUrinario != "") {
            Ingr = calcIngr(ProtConsumidas);
            UreaUri = calcUreaUri(Urea, VolUrinario);
            NUU = calcNUU(UreaUri);
            Egr = calcEgr(NUU);
            Balance = calcBalance(Ingr, Egr);

            if ((document.getElementById("UnidadUrea").value == "Gramos/Litros") && (document.getElementById("UnidadVol").value == "Litros") && (document.getElementById("UnidadPeso").value == "Gramos")){
                document.getElementById("BalanceNit").value = Balance + " G";
            } else {
                document.getElementById("BalanceNit").value = Balance + " mG";
            }
        }else if (Urea == "" || ProtConsumidas == "" || VolUrinario == "") {
            alert("Tiene que completar los datos para calcular");
        }
        Canvas(Ingr, Egr);
    }
}

/**
 * Hace que se mantengas las unidades correctas para que no ocurran errores de unidad y vacia los input de Balance Nitrogenado, Urea Urinaria, Nitrogeno Ureico Urinario y Nitrogeno Consumido para que se vuelva a calcular con las nuevas unidades
 * @method CambiarUnidades
 */
function CambiarUnidades(id){
    if (id=="Gramos" || id =="Gramos/Litros" || id =="Litros"){
        document.getElementById("UnidadPeso").value = "Gramos";
        document.getElementById("UnidadUrea").value = "Gramos/Litros";
        document.getElementById("UnidadVol").value = "Litros"
    } else if (id=="Miligramos" || id =="Miligramos/Decilitros" || id =="Decilitros"){
        document.getElementById("UnidadPeso").value = "Miligramos";
        document.getElementById("UnidadUrea").value = "Miligramos/Decilitros";
        document.getElementById("UnidadVol").value = "Decilitros"
    }
    document.getElementById("NConsumido").value = "";
    document.getElementById("UreaUri").value = "";
    document.getElementById("NUU").value = "";
    document.getElementById("BalanceNit").value = "";
}

/**
 * Consigue el valor mas grande entre Ingreso y Egreso
 * @method calcMayor
 * @param {number} Ingr - Valor calculado mediante la funcion calcIngr
 * @param {number} Egr - Valor calculado mediante la funcion calcEgr
 */
function calcMayor (Ingr, Egr){
    var Mayor;
    if (Ingr > Egr) {
        Mayor = Ingr;
    } else {
        Mayor = Egr;
    }
    return Mayor;
}

/**
 * Realiza un grafico sobre el canvas que sea representativo de los valores
 * @method Canvas
 * @param {number} Ingr - Valor calculado mediante la funcion calcIngr
 * @param {number} Egr - Valor calculado mediante la funcion calcEgr
 */
function Canvas(Ingr, Egr) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var ymax = canvas.height;
    var margen = 10;
    var IngrGramos, EgrGramos;
    var IngrRelativo, EgrRelativo;

    /* Comprueba que los valores esten si o si on "Gramos", sino, los transforma */
    if ((document.getElementById("UnidadUrea").value == "Miligramos/Decilitros") && (document.getElementById("UnidadVol").value == "Decilitros") && (document.getElementById("UnidadPeso").value == "Miligramos")) {
        IngrGramos = Ingr / 1000;
        EgrGramos = Egr / 1000;
    } else {
        IngrGramos = Ingr;
        EgrGramos = Egr;
    }

    /* Consigue el valor mas grande para poder ver si supera 500, esto para que si es mayor que 500 no sea mas grande que el canvas */
    var Mayor = calcMayor(IngrGramos, EgrGramos);
    if (Mayor > 500) {
        var Escala = Mayor / 500;
        IngrRelativo = IngrGramos / Escala;
        EgrRelativo = EgrGramos / Escala;
    } else if (Mayor < 250){
        IngrRelativo = IngrGramos * 2;
        EgrRelativo = EgrGramos * 2;
    }else{
        IngrRelativo = IngrGramos;
        EgrRelativo = EgrGramos;
    }

    /* Dibuja los rectangulos para comparar */
    ctx.fillStyle = "333899";
    ctx.fillRect( margen, ymax, 40, -1 * (IngrRelativo));
    ctx.fillRect(150, ymax, 40, -1 * (EgrRelativo));
}

/**
 * Comprueba que los valores de los input de Proteinas Consumidas, Urea y Volumen Urinario no sean negativos o nulos (esto seria ilogico y causaria errores). Si son negativos alerta al usuario y blanquea los input
 * @method Comprobar
 * @return ok
 */
function Comprobar(){
    var ProtConsumidas = document.getElementById("ProtConsumidas").value;
    var Urea = document.getElementById("Urea").value;
    var VolUrinario = document.getElementById("VolUrinario").value;
    var ok;

    if (ProtConsumidas < 0 || Urea < 0 || VolUrinario < 0) {
        alert("Los valores a completar no pueden ser negativos");
        document.getElementById("ProtConsumidas").value = "";
        document.getElementById("Urea").value = "";
        document.getElementById("VolUrinario").value = "";
        ok = 0;
    } else if (ProtConsumidas == 0 || Urea == 0 || VolUrinario == 0) {
        alert("Los valores a completar no iguales a 0");
        document.getElementById("ProtConsumidas").value = "";
        document.getElementById("Urea").value = "";
        document.getElementById("VolUrinario").value = "";
        ok = 0;
    } else if (ProtConsumidas > 0 && Urea > 0 && VolUrinario > 0){
        ok = 1;
    }
    return ok;
}

