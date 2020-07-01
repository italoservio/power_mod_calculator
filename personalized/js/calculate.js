function Calculate()
{
    // Declaração de Variáveis / Declaration of Variables
    var base = $('#base').val();
    var exp = $('#expoente').val();
    var zn = $('#zn').val();

    // Limpando o passo 1 e exibindo o passo 2 / Clearing step 1 and displaying step 2
    CleanStep('#passo1');
    ShowStep('#passo2');

    //Imprimindo valores inseridos / Printing entered values
    $('#print-zn').html(zn);
    $('#print-base').html(base);
    $('#print-exp').html(exp);

    //Descobrindo potências de 2 do Z(n), retornará o valor em Binário / Finding powers of 2 from Z (n), will return the value in Binary
    var vetBin = DecimalToBinary(exp);

    //Criando vetor com as potências de 2 até Z(n) / Creating vector with powers from 2 to Z(n)
    var vetPotencias2 = Potencias2Zn(exp);

    //Criando vetores: potencias mod e mod / Creating vectors: mod and mod powers
    var strMod = "";
    var strPotenciasMod = "";
    var mod;
    for (var i = 0; i < vetPotencias2.length - 1; i++)
    {
        strPotenciasMod += base.toString() + ",";
        mod = (base % zn);
        strMod += mod.toString() + ",";

        base = Math.pow(mod, 2);
    }
    // Armazenando os valores em vetores / Storing values ​​in vectors
    var vetMod = strMod.split(",");
    var vetPotMod = strPotenciasMod.split(",");

    //Imprimindo a tabela / Printinf the table
    var strCabecalho = "";
    var strPotenciasMod = "";
    var strMod = "";

    // For para criar string do cabeçalho / For to create header string
    for (var i = 0; i < vetBin.length; i++)
    {
        // Cabeçalho / Header
        if (vetBin[i] == '1')
        {
            strCabecalho += "<th class='font-aleo-bold text-danger' scope='col'>" + vetPotencias2[i] + "</th>";
        }
        else
        {
            strCabecalho += "<th class='font-aleo-light' scope='col'>" + vetPotencias2[i] + "</th>";
        }
    }

    //For para criar string das Potencias Mod e para os Mods / For to create string of the Mod Potentials and for the Mods
    for (var i = vetBin.length - 1; i >= 0; i--)
    {
        // (Foram preenchido de forma crescente, mas devemos imprimir de forma decrescente) / (They were filled in increasing, but we must print in decreasing form)
        strMod += "<td class='font-aleo-light text-secondary'>" + vetMod[i] + "</td>";
        strPotenciasMod += "<td class='font-aleo-light text-secondary'>" + vetPotMod[i] + "</td>";
    }

    // Imprimindo tabela no HTML / Printing table in HTML
    $('#t-cabecalho').html(strCabecalho);
    $('#t-potencia').html(strPotenciasMod);
    $('#t-mod').html(strMod);

    // Invertendo vetor de mods e guardando em "vetModInvertido" / Inverting vector of mods and saving in "vetModInvertido"
    var strVetModInvertido = "";
    for (var i = 0; i < vetBin.length; i++)
    {
        if (vetBin[i] == '1')
        {
            strVetModInvertido += vetMod[(vetBin.length -1 -i)] + ",";
        }
    }
    strVetModInvertido = strVetModInvertido.substr(0, strVetModInvertido.length - 1);
    var vetModInvertido = strVetModInvertido.split(",");

    // Imprimindo quais mods que serão multiplicados / Printing which mods to multiply
    var strMultiplicados = "";
    for (var i = 0; i < vetModInvertido.length; i++)
    {
        strMultiplicados += vetModInvertido[i]  + " * ";
    }
    strMultiplicados = strMultiplicados.substr(0, strMultiplicados.length - 2);
    strMultiplicados += "(mod " + zn + ")";
    $('#print-multiplicados').html(strMultiplicados);

    // Imprimindo resultado / Printing the result
    var resultado = 1;
    for (var i = 0; i < vetModInvertido.length; i++)
    {
        resultado *= vetModInvertido[i];
    }
    var resultado = (resultado % zn); // MOD (zn)
    $('#print-resultado').html(resultado);
}

function Potencias2Zn(pNumber)
{
    // Potências de 2 dentro de Z(n) / Powers of 2 within Z (n)
    var potencias = "";
    for (var i = 0; i < pNumber; i++)
    {
        if (Math.pow(2, i) <= pNumber)
        {
            potencias += Math.pow(2, i).toString() + ",";
        }
        else
        {
            break;
        }
    }
    // Passando valores para vetor / Passing values ​​to vector
    var vetPotencias = potencias.split(",");

    // Ordenando vetor em ordem decrescente / Sorting vector in descending order
    vetPotencias = vetPotencias.sort(DecSort);

    // Retornando Vetor / returning the vector
    return vetPotencias;
}

function DecSort(a, b)
{
    //Faz com que o array seja ordenado numericamente e de ordem decrescente. / It causes the array to be ordered numerically and in descending order.
    return (b - a);
}

function DecimalToBinary(pNumber)
{
    // Retorna Array com valor Binário do expoente / Returns Array with Binary value of the exponent


    var binary = "";
    var temp = pNumber;

    while(temp > 0)
    {
        if(temp % 2 == 0)
        {
            binary = "0" + binary;
        }
        else
        {
            binary = "1" + binary;
        }

        temp = Math.floor(temp / 2);
    }

    var vetBin = binary.split("");
    return vetBin;
}

function CleanStep(strId)
{
    $(strId).addClass('d-none');
    $('#header').removeClass('col-lg-6');
    $('#copy').removeClass('col-lg-6');
}

function ShowStep(strId)
{
    $(strId).removeClass('d-none');
    $("#header").addClass('col-lg-10');
    $("#copy").addClass('col-lg-10');
}

function Voltar()
{
    $('#base').val("");
    $('#expoente').val("");
    $('#zn').val("");

    window.location.reload();
}