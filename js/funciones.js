let m, salto;

function validar(e){
    var teclado = (document.all)?e.keyCode:e.which;
    if(teclado == 8)return true;

    var patron = /[0-9\d]/;

    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba);
}

function Deshacer(){
    location.reload();
}

function pasar(n){
    let rs = "";
    while(n != 0){
        if(n % 2 == 0){
            rs += "0";
        }else{
            rs += "1";
        }
        n = parseInt(n / 2);
    }
    while(rs.length < 8){
        rs += "0";
    }
    return rs.split('').reverse().join('');
}

function traducir(){
    let p, s, t, c
    let pr, sr, tr, cr;
    p = document.cal_Binario.p.value;
    s = document.cal_Binario.s.value;
    t = document.cal_Binario.t.value;
    c = document.cal_Binario.c.value;
    pr = "";
    sr = "";
    tr = "";
    cr = "";
    if(p == "") p = 0;
    if(s == "") s = 0;
    if(t == "") t = 0;
    if(c == "") c = 0;
    if(p > 255 || s > 255 || t > 255 || c > 255){
        alert("El valor no debe de ser mayor a 255")
    }else{

    }
    pr = pasar(p);
    sr = pasar(s);
    tr = pasar(t);
    cr = pasar(c);
    document.cal_Binario.pr.value = pr;
    document.cal_Binario.sr.value = sr;
    document.cal_Binario.tr.value = tr;
    document.cal_Binario.cr.value = cr;
}

function calcular(){
    
    let p, s, t, c
    let pr, sr, tr, cr;
    let n, sub, hosts;
    let m1, m2, m3, m4;
    let w = 0;
    let tipo;
    p = document.cal_Subrede.p.value;
    s = document.cal_Subrede.s.value;
    t = document.cal_Subrede.t.value;
    c = document.cal_Subrede.c.value;
    sub = document.cal_Subrede.subredes.value;
    salto = 0;
    pr = "";
    sr = "";
    tr = "";
    cr = "";
    if(p == "") p = 0;
    if(s == "") s = 0;
    if(t == "") t = 0;
    if(c == "") c = 0;
    pr = pasar(p);
    sr = pasar(s);
    tr = pasar(t);
    cr = pasar(c);

    if(p <= 127){
        m1 = "11111111";
        m2 = "00000000";
        m3 = "00000000";
        m4 = "00000000";
        tipo = "a";
        m = 16;
    }
    if(p > 127 && p <= 191){
        m1 = "11111111";
        m2 = "11111111";
        m3 = "00000000";
        m4 = "00000000";
        tipo = "b";
        m = 8;
    }
    if(p > 191&& p <= 223){
        m1 = "11111111";
        m2 = "11111111";
        m3 = "11111111";
        m4 = "00000000";
        tipo = "c";
        m = 0;
    }

    sub = parseInt(sub);
    n = 0, salto = 0;
    while(Math.pow(2, n) < sub){
        n++;
    }
    if(tipo == "a"){
        m2 = procesar(n);

        for(let i=0;i<sub;i++){
            let a = "";
            a += "<tr><td>"+pr+"."+ pasar(w) + "." + tr + "." + cr + "</td></tr>";
            w += salto;
            let ntb = document.createElement("tr");
            ntb.innerHTML = a;
            document.getElementById("sub").appendChild(ntb);
        }
    }else if(tipo == "b"){
        m3 = procesar(n);

        for(let i=0;i<sub;i++){
            let a = "";
            a += "<tr><td>"+pr+"."+ sr + "." + pasar(w) + "." + cr + "</td></tr>";
            w += salto;
            let ntb = document.createElement("tr");
            ntb.innerHTML = a;
            document.getElementById("sub").appendChild(ntb);
        }
    }else{
        m4 = procesar(n);

        let a = "";
        for(let i=0;i<sub;i++){
            let a = "";
            a += "<tr><td>"+pr+"."+ sr + "." + tr + "." + pasar(w) + "</td></tr>";
            w += salto;
            let ntb = document.createElement("tr");
            ntb.innerHTML = a;
            document.getElementById("sub").appendChild(ntb);
        }
    }
    hosts = Math.pow(2, m) - 2;

    let imprimir = "<tr><td>"+pr+"."+sr+"."+tr+"."+cr+"</td><td>"+
    m1+"."+m2+"."+m3+"."+m4+"</td><td>"+hosts+"</td><td>"+salto+"</td></tr>";
    let btn = document.createElement("tr");
    btn.innerHTML = imprimir;
    document.getElementById("data").appendChild(btn);

}

function procesar(n){
    let res = "", potencia = 7;
    for(let i=0;i<n;i++){
        res += "1";
        salto += Math.pow(2, potencia);
        potencia--;
    }
    salto = 256 - salto;
    while(res.length < 8){
        res += "0";
        m++;
    }
    return res;
}
