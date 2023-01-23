/* eslint-disable */

/* eslint-disable */
import barchart from "@nebula.js/sn-bar-chart";
import linechart from "@nebula.js/sn-line-chart";
import map from "@nebula.js/sn-map";
import { embed } from "@nebula.js/stardust";

const charts = { barchart, linechart, map };
// const charts = { barchart };
const visualizationTypes = ["barchart", "linechart", "map"];




const messageForm = $(".msger-inputarea");
const messageInput = $(".msger-input");
const messageChat = $(".msger-chat");
const oldChar = "*";
const newChar = "\n&#9679;";

// Icons made by Freepik from www.flaticon.com
const BOT_NAME = "Bot";
const PERSON_NAME = "You";


async function getThemes() {
  const requestUrl = "https://08uu6507zw4v6cu.eu.qlikcloud.com";
  const themeResponse = await fetch(`${requestUrl}/api/v1/themes`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzM4NCIsImtpZCI6ImQyMmJhYTc0LTM1YmEtNGM5Mi1hZjEzLTJkMGM2ODM4YzhhMiIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiWDZuZXl4WTNncEtOM21WZTZIdzhLX0ltMXh5UzBSZkQiLCJqdGkiOiJkMjJiYWE3NC0zNWJhLTRjOTItYWYxMy0yZDBjNjgzOGM4YTIiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiaUF6eUxZRk9Wd1VZV2cwX0ZtUWROOFk0azMzZGZMVVgifQ.gPEhRnfmMlriUPDHj-Fsitcqspn72gjGc2vxTv_G3PkmX5MDf3JQfGjNsN-xNDDtozF-IaLVQ3ZrIMYQyGcaoX4f03uSl9plsJIqxGWEe3UzVC6E-40VyKO0ttSEvPPl",
      "Content-Type": "application/json",
      "qlik-web-integration-id": "wXcLRgyI2s_94ZX7uOGSSnfk-ta14WSm",
    },
  });

  const themeList = await themeResponse.json();
  return themeList;
}


messageForm.on("submit", function (e) {
  e.preventDefault();
  var message = messageInput.val();
  if (!message) return;
  appendMessage(PERSON_NAME, "right", message);

  console.log("send question");
  sendQuestion(message); // to send NL API request and render response
  messageInput.val("");
});

function appendMessage(name, side, text, isChart) {
  const msgHTML = `
    <div class="msg ${side}-msg">

      <div class="msg-bubble">
       

        <div class="msg-text ${isChart ? "" : "chart-text"}">${text}</div>
      </div>
    </div>
  `;

  messageChat.append(msgHTML);
  const scrollHeight = messageChat.scrollTop() + 500;
  messageChat.animate({ scrollTop: scrollHeight }, 600);
}


// $("#speak").on("click", function (e) {
$(".msger-input").on("focus", function (e) {
  // const speak = document.getElementById("speak");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"
    recognition.start();

  recognition.onresult = function (e) {
    const message = e.results[0][0].transcript;
 
    appendMessage(PERSON_NAME, "right", message);

    sendQuestion(message);
  };
});
// });




async function sendQuestion(message) {
  const requestUrl = "https://08uu6507zw4v6cu.eu.qlikcloud.com";
  const data = JSON.stringify({
    text: message,
    app: { id: "b139e5ee-7adc-41e5-8c1f-0b7be463729f", name: "CHAT" },
    enableVisualizations: true,
    visualizationTypes: visualizationTypes,
  });
  const response = await fetch(`${requestUrl}/api/v1/questions/actions/ask`, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzM4NCIsImtpZCI6ImQyMmJhYTc0LTM1YmEtNGM5Mi1hZjEzLTJkMGM2ODM4YzhhMiIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiWDZuZXl4WTNncEtOM21WZTZIdzhLX0ltMXh5UzBSZkQiLCJqdGkiOiJkMjJiYWE3NC0zNWJhLTRjOTItYWYxMy0yZDBjNjgzOGM4YTIiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiaUF6eUxZRk9Wd1VZV2cwX0ZtUWROOFk0azMzZGZMVVgifQ.gPEhRnfmMlriUPDHj-Fsitcqspn72gjGc2vxTv_G3PkmX5MDf3JQfGjNsN-xNDDtozF-IaLVQ3ZrIMYQyGcaoX4f03uSl9plsJIqxGWEe3UzVC6E-40VyKO0ttSEvPPl",
      "Content-Type": "application/json",
      "qlik-web-integration-id": "wXcLRgyI2s_94ZX7uOGSSnfk-ta14WSm",
    },
    body: data,
  });

  const brokerResponse = await response.json();
  let properties;
  let lang = "en-US";

  const chatResponse = brokerResponse.conversationalResponse.responses;

  if (!chatResponse.length)
    return appendMessage(BOT_NAME, "left", "Please try a different query.");

  if ("narrative" in chatResponse[0]) {
    let msgText = chatResponse[0].narrative.text;
  

    msgText = msgText.replaceAll(oldChar, newChar);
    appendMessage(BOT_NAME, "left", msgText);
  } else if (
    "imageUrl" in chatResponse[0] ||
    "renderVisualization" in chatResponse[0]
  ) {
    let chartElement, img;
    const nebulaChartId = `nebula-chart-${new Date().getTime()}`;
    const nebulaObject = chatResponse.filter((x) => x.type === "nebula");
    const imgUrlObject = chatResponse.filter((x) => x.type === "chart");
    if (nebulaObject.length) {
      properties = { ...nebulaObject[0].renderVisualization.data };
      properties.color.paletteColor.index = 3;
      properties.dataPoint.show = true;
      lang = nebulaObject[0].renderVisualization.language;
      chartElement = `<div class='user-message'>
            <div class='message'>
              <div class='nebula-chart'  id="${nebulaChartId}"></div>
            </div>
          </div>`;
    } else if (imgUrlObject.length) {
      img = imgUrlObject[0].imageUrl;
      chartElement = `<a href="https://08uu6507zw4v6cu.eu.qlikcloud.com${img}"><img src="https://08uu6507zw4v6cu.eu.qlikcloud.com${img}" width="350" height="auto"></a>`;
    }
    if ("narrative" in chatResponse[1]) {
      let text_r = chatResponse[1].narrative.text;
      text_r = text_r.replaceAll(oldChar, newChar);
      const chartHTML = `
      <div class='user-message'>
      <div class ="message">
      <p class="chart-text chart-header">
      ${text_r} 
      </p>
     </br>
      ${chartElement}
      </div>
      </div>
    `;

      appendMessage(BOT_NAME, "left", chartHTML, true);
      if (nebulaObject.length) render(properties, nebulaChartId, lang);
    } else if ("nebula" in chatResponse[0]) {
      if (chatResponse) {
        const chartHTML = `
           <div class='user-message'>
              <div class='message'>
                 <div class='nebula-chart'  id="${nebulaChartId}"></div>
               </div>
           </div>
         `;


        appendMessage(BOT_NAME, "left", chartHTML, true);
        render(properties, nebulaChartId, lang);

      }
    } else {
      const chartHTML = `
      <div class='user-message'>
        <div class='message'>
        <img src="https://08uu6507zw4v6cu.eu.qlikcloud.com/${img}" width="300" height="200">
        </div>
      </div>
    `;

      appendMessage(BOT_NAME, "left", chartHTML, true);
    }
  }
}

async function render(properties, nebulaChartId, lang = "en-US") {
  // GET THEME
const res = await getThemes();
const themeList = res.data;
  // PROPERTIES
  properties = properties;
  console.log('properties', properties)
  if (properties) {
    properties.reducedHyperCube = properties.qHyperCube;
  }
  const ordered = Object.keys(properties)
    .sort()
    .reduce((obj, key) => {
      obj[key] = properties[key];
      return obj;
    }, {});
  const appLayout = {
    qLocaleInfo: properties.snapshotData.appLocaleInfo,
    qTitle: "",
  };
  const objectModel = {
    id: `${+new Date()}`,
    getLayout: async () => properties,
    on: () => {},
    once: () => {},
    removeListener: () => {},
    getProperties: async () => ({ qHyperCubeDef: {}, ...properties }),
    setProperties: async () => {},
    getEffectiveProperties: async () => properties,
    getHyperCubeReducedData: async () =>
      properties.reducedHyperCube.qDataPages || [],
    getHyperCubeContinuousData: async () => properties.qHyperCube,
  };

  const app = {
    id: `${+new Date()}`,
    createSessionObject: async () => ({
      ...objectModel,
    }),
    getObject: async () => objectModel,
    getAppLayout: async () => appLayout,
    destroySessionObject: () => {},
  };
  const type = properties.qInfo.qType;


  const n = embed(app, {
    // Load Sense themes
    context: {
      theme: "bitechnology-new",
      language: lang,
      constraints: {
        // Disable selections (constraint)
        select: true,
      },
    },
    themes: [
      {
        id: "bitechnology-new",
        load:  () => Promise.resolve(themeList[1]),
      },
    ],
    types: [
      {
        name: type,
        load:  () => Promise.resolve(charts[type]),
        // load: async () => Promise.resolve(window["sn-line-chart"]),
      },
    ],
  });


  console.log('options', {
    type,
    element: document.querySelector(`#${nebulaChartId}`),
    properties,
    options: {
      direction: "ltr",
      freeResize: true,
    },
  })
  await n.render({
    type,
    element: document.querySelector(`#${nebulaChartId}`),
    properties,
    options: {
      direction: "ltr",
      freeResize: true,
    },
  });
}


