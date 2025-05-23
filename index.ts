const input: HTMLInputElement | null = document.querySelector("#searchCity");
const from = document.querySelector("#buscar > form");
const tempInfo = document.querySelector("#tempoInfo");

from?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!input) return;
  if (!tempInfo || null) return;
  const localizacao = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=0dcbde59b6a7a456a95e0d02d21fb75a&lang=pt_br&units=metric`;

  if (localizacao.length < 3) {
    alert("local deve ter pelo menos 3 letras");
    return;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();

    const infos = {
      temperatura: Math.round(data.main.temp),
      local: data.name,
      icon: data.weather[0].icon,
      descricao: data.weather[0].description,
    };
    tempInfo.innerHTML = `
  <div id="cidade">
          <span>${infos.local}</span>
        </div>
        <div id="graus">
          <span>${infos.temperatura}°C</span>
          <img src="https://openweathermap.org/img/wn/${infos.icon}@2x.png" alt=" tempo" />
        </div>
        <p>${infos.descricao} <p/>
  `;
  } catch (erro) {
    `deu erro na aplicação ${erro}`;
  }
});
