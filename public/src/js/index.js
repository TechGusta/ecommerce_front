document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault()
    const Nome = document.getElementById("nome").value
    const Email = document.getElementById("Email").value
    const TelefoneCelular = document.getElementById("TelefoneCelular").value

    fetch("/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Nome, 
                            Email,
                            TelefoneCelular})
    })
    .then(response => response.json())
    .then(data => {
    console.log('DATAAA', data)
      if (data.sucesso) {
        alert("Cadastrado com sucesso!");
        listarProdutos()
      } else {
        alert("Erro ao cadastrar os dados");
      }
    })
    .catch(error => console.error("Erro:", error));

})