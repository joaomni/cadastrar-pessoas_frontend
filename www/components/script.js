$(document).on("click","#cadastrar",function(){
    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

    if(jQuery.inArray(extensao_imagem, ['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }
    else{
        var sexoH = $("input[id='homem']:checked").val();
        var sexoM = $("input[id='mulher']:checked").val();

        if(sexoH == "Homem"){
          var form_data = new FormData();
          form_data.append('foto',prop);
          form_data.append('codigo',$('#codigo').val());
          form_data.append('nome',$('#nome').val());
          form_data.append('idade',$('#idade').val());
          form_data.append('cpf',$('#cpf').val());
          form_data.append('sexo',sexoH);
          form_data.append('rua',$('#rua').val());
          form_data.append('numero',$('#numero').val());
          form_data.append('bairro',$('#bairro').val());
          form_data.append('cidade',$('#cidade').val());
          form_data.append('uf',$('#uf').val());
        }
        else if(sexoM == "Mulher"){
          var form_data = new FormData();
          form_data.append('foto',prop);
          form_data.append('codigo',$('#codigo').val());
          form_data.append('nome',$('#nome').val());
          form_data.append('idade',$('#idade').val());
          form_data.append('cpf',$('#cpf').val());
          form_data.append('sexo',sexoM);
          form_data.append('rua',$('#rua').val());
          form_data.append('numero',$('#numero').val());
          form_data.append('bairro',$('#bairro').val());
          form_data.append('cidade',$('#cidade').val());
          form_data.append('uf',$('#uf').val());
        }

        $.ajax({
            url:"https://pratilheira-online.000webhostapp.com/cadastraPessoa.php",//para onde enviar
            method:'POST', //como enviar
            data:form_data,//o que enviar
            contentType:false,
            cache:false,
            processData:false,
            //se der certo
            success: function(data){
                navigator.notification.alert(data);
                location.reload();
            }
        });
    }
        
});

$(document).on("change","#pesquisar",function(){
    var codigoescolhido = $('#pesquisar').val();

    $('div#result').hide();
    $('div#result').load('resultado.html');
    $('div#result').fadeIn(2000);

    $.ajax({
        type:"get", //como enviar
        url:"https://pratilheira-online.000webhostapp.com/pesquisarPessoa.php",//para onde enviar
        data:"id="+codigoescolhido,
        dataType:"json",
        //se der certo
        success: function(data){
          $("div#result").val(data.pessoas.codigo);
          $("#nome1").text(data.pessoas.nome);
          $("#cidade1").text(data.pessoas.cidade);
          $("#imagem").attr('src',"https://pratilheira-online.000webhostapp.com/"+data.pessoas.imagem);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});


$(document).on('click','#result',function(){
  var codigoescolhido = $('#result').val();

  $('div.pesq').hide();
  $('div.pesq').load('editar.html');
  $('div.pesq').fadeIn(2000);

  $.ajax({
      type:"get", //como enviar
      url:"https://pratilheira-online.000webhostapp.com/pesquisarPessoa.php",//para onde enviar
      data:"id="+codigoescolhido,
      dataType:"json",
      //se der certo
      success: function(data){
        $("#codigo").val(data.pessoas.codigo);
        $("#nome2").val(data.pessoas.nome);
        $("#idade2").val(data.pessoas.idade);
        $("#cpf2").val(data.pessoas.cpf);
        var sexo = data.pessoas.sexo;
        if(sexo == "Homem"){
          $("#homem2").attr("checked",true);
        }
        if(sexo == "Mulher"){
          $("#mulher2").attr("checked",true);
        }
        $("#rua2").val(data.pessoas.rua);
        $("#numero2").val(data.pessoas.numero);
        $("#bairro2").val(data.pessoas.bairro);
        $("#cidade2").val(data.pessoas.cidade);
        $("#uf2").val(data.pessoas.uf);
        $("#imagem2").attr('src',"https://pratilheira-online.000webhostapp.com/"+data.pessoas.imagem);
      },
      //se der errado
      error: function(data){
            navigator.notification.alert(data);
      }
  });
})

$(document).on("click","#salvar",function(){
  var prop = $('#caminho1').get(0).files[0];

  var sexoH = $("input[id='homem2']:checked").val();
  var sexoM = $("input[id='mulher2']:checked").val();

  if(sexoH == "Homem"){
    var form_data = new FormData();
    form_data.append('foto',prop);
    form_data.append('codigo',$('#codigo').val());
    form_data.append('nome',$('#nome2').val());
    form_data.append('idade',$('#idade2').val());
    form_data.append('cpf',$('#cpf2').val());
    form_data.append('sexo',sexoH);
    form_data.append('rua',$('#rua2').val());
    form_data.append('numero',$('#numero2').val());
    form_data.append('bairro',$('#bairro2').val());
    form_data.append('cidade',$('#cidade2').val());
    form_data.append('uf',$('#uf2').val());
  }
  else if(sexoM == "Mulher"){
    var form_data = new FormData();
    form_data.append('foto',prop);
    form_data.append('codigo',$('#codigo').val());
    form_data.append('nome',$('#nome2').val());
    form_data.append('idade',$('#idade2').val());
    form_data.append('cpf',$('#cpf2').val());
    form_data.append('sexo',sexoM);
    form_data.append('rua',$('#rua2').val());
    form_data.append('numero',$('#numero2').val());
    form_data.append('bairro',$('#bairro2').val());
    form_data.append('cidade',$('#cidade2').val());
    form_data.append('uf',$('#uf2').val());
  }

    $.ajax({
        url:"https://pratilheira-online.000webhostapp.com/atualizarPessoa.php",//para onde enviar
        method:'POST', //como enviar
        data:form_data,//o que enviar
        contentType:false,
        cache:false,
        processData:false,
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});
$(document).on("click","#deletar",function(){
    $.ajax({
        type:"get", //como enviar
        url:"https://pratilheira-online.000webhostapp.com/deletarPessoa.php",//para onde enviar
        data:"id="+$("#codigo").val(),
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();//recarrega a pagina
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});

$(document).on('click','#camera', function(){
  scanBarcode();
});

function scanBarcode() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      $('#codigo').val(result.text);
      $("#nome").prop("readonly",false);
      $("#idade").prop("readonly",false);
      $("#cpf").prop("readonly",false);
      $("#homem").prop("disabled",false);
      $("#mulher").prop("disabled",false);
      $("#caminho").prop("disabled",false);
      $("#rua").prop("readonly",false);
      $("#numero").prop("readonly",false);
      $("#bairro").prop("readonly",false);
      $("#cidade").prop("readonly",false);
      $("#uf").prop("readonly",false);
      $("#cadastrar").prop("disabled",false);
    },
  );
}

function seacrhBarcode() 
{
  cordova.plugins.barcodeScanner.scan(
    function (result)
    {
      var codigoescolhido = result.text;

      $('div#result').hide();
      $('div#result').load('resultado.html');
      $('div#result').fadeIn(2000);

      $.ajax({
          type:"get", //como enviar
          url:"https://pratilheira-online.000webhostapp.com/pesquisarPessoa.php",//para onde enviar
          data:"id="+codigoescolhido,
          dataType:"json",
          //se der certo
          success: function(data){
            $("div#result").val(data.pessoas.codigo);
            $("#nome1").text(data.pessoas.nome);
            $("#cidade1").text(data.pessoas.cidade);
            $("#imagem").attr('src',"https://pratilheira-online.000webhostapp.com/"+data.pessoas.imagem);
          },
          //se der errado
          error: function(data){
              navigator.notification.alert(data);
          }
      }); 
    },
  );
}

$(document).on('click','#searchQR', function(){
  seacrhBarcode();
})

