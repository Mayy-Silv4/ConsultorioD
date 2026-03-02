// Seleciona o botão
const botaoTema = document.getElementById("toggleTema");

// Verifica se já existe tema salvo
if(localStorage.getItem("tema") === "escuro"){
    document.body.classList.add("dark-mode");
    botaoTema.textContent = "☀️";
}

// Evento de clique
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        botaoTema.textContent = "☀️";
        localStorage.setItem("tema", "escuro");
    } else {
        botaoTema.textContent = "🌙";
        localStorage.setItem("tema", "claro");
    }
});
const cepInput = document.getElementById("cep");

cepInput.addEventListener("blur", function () {

  let cep = cepInput.value.replace("-", "");

  if (cep.length === 8) {

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {

        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
        } else {
          alert("CEP não encontrado!");
        }

      })
      .catch(() => {
        alert("Erro ao buscar CEP");
      });

  }

});
function buscarClima() {

  const apiKey = "0d10bbe9494782c9bf5b64c6640f34a4"; // coloque sua chave aqui
  const cidade = document.getElementById("cidadeInput").value;

  if (cidade === "") {
    alert("Digite uma cidade!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      return response.json();
    })
    .then(data => {

      const temp = data.main.temp;
      const clima = data.weather[0].description;
      const tipoClima = data.weather[0].main;

      let emoji = "☀️";

      if (tipoClima === "Clouds") emoji = "☁️";
      if (tipoClima === "Rain") emoji = "🌧";
      if (tipoClima === "Clear") emoji = "☀️";
      if (tipoClima === "Thunderstorm") emoji = "⛈";

      document.getElementById("temperatura").innerText =
        `🌡 ${temp}°C`;

      document.getElementById("descricao").innerText =
        `${emoji} ${clima}`;

    })
    .catch(error => {
      alert("Erro ao buscar clima. Verifique a cidade ou a API.");
      console.log(error);
    });
}
/*Whatts*/
document.getElementById("formContato").addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;

    let mensagem = `Olá, meu nome é ${nome}.
Email: ${email}
CEP: ${cep}
Rua: ${rua}
Bairro: ${bairro}
Cidade: ${cidade}`;

    let numero = "5551993304409"; // COLOQUE SEU NÚMERO AQUI

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});

