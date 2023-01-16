/* eslint-disable */
import { AuthType } from '@qlik/sdk';
import embed from './configure';
import connect from './connect';

var outputArea = $("#chat-output");
/* eslint-disable */
import barchart from "@nebula.js/sn-bar-chart";
import { embed } from "@nebula.js/stardust";

const charts = { barchart };

// async function run() {
//   const app = await connect({
//     // connectionType: '<AuthType.SOME_CONNECTION_TYPE>',
//     url: 'https://08uu6507zw4v6cu.eu.qlikcloud.com',
//     appId: 'b139e5ee-7adc-41e5-8c1f-0b7be463729f',

//     // you should use only one of below keys
//     // based on your `connectionType`
//     // clientId: '<Qlik OAuth client id>',
//     webIntegrationId: 'wXcLRgyI2s_94ZX7uOGSSnfk-ta14WSm',
//   });

//   // İstemci Kimliği: c461b5e68cda7bbaa50c4c2d3d116dfa, 
//   // İstemci parolası: e65903d1d80f9ceae1466a8b538c6e9d2f7a40a2226d7fd34edebf40e02e767c

//   const n = embed(app);

//   (await n.selections()).mount(document.querySelector('.toolbar'));

//   // n.render({});
// }

// run();


var outputArea = $("#chat-output");

$("#user-input-form").on("submit", function (e) {
  e.preventDefault();
  var message = $("#user-input").val();
  outputArea.append(`
    <div class='bot-message'>
      <div class='message'>
        ${message}
      </div>
    </div>
  `);
  console.log('send question')
  sendQuestion(message); // to send NL API request and render response
  $("#user-input").val("");
});



$("#speak").on("click", function (e) { 
  const speak = document.getElementById('speak');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US",

  // speak.addEventListener('click', function() {
      recognition.start();
  // }) 
  
  recognition.onresult = function(e) {
  console.log('e',e)
      const message = e.results[0][0].transcript;
      console.log(message);
      outputArea.append(`
      <div class='bot-message'>
        <div class='message'>
          ${message}
        </div>
      </div>
    `);
      sendQuestion(message)
  }
})



// const requestUrl = 'https://08uu6507zw4v6cu.eu.qlikcloud.com';
// const data = JSON.stringify({
//   text: message,
//   app: { id: "b139e5ee-7adc-41e5-8c1f-0b7be463729f", name: "CHAT" },
//   enableVisualizations: true,
//   visualizationTypes: ["barchart"],
// });
// const response = await fetch(`${requestUrl}/api/v1/questions/actions/ask`, {
//   method: "POST",
//   headers: {
//     Authorization: "Bearer eyJhbGciOiJFUzM4NCIsImtpZCI6ImQyMmJhYTc0LTM1YmEtNGM5Mi1hZjEzLTJkMGM2ODM4YzhhMiIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiWDZuZXl4WTNncEtOM21WZTZIdzhLX0ltMXh5UzBSZkQiLCJqdGkiOiJkMjJiYWE3NC0zNWJhLTRjOTItYWYxMy0yZDBjNjgzOGM4YTIiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiaUF6eUxZRk9Wd1VZV2cwX0ZtUWROOFk0azMzZGZMVVgifQ.gPEhRnfmMlriUPDHj-Fsitcqspn72gjGc2vxTv_G3PkmX5MDf3JQfGjNsN-xNDDtozF-IaLVQ3ZrIMYQyGcaoX4f03uSl9plsJIqxGWEe3UzVC6E-40VyKO0ttSEvPPl",
//     "Content-Type": "application/json",
//     "qlik-web-integration-id": "wXcLRgyI2s_94ZX7uOGSSnfk-ta14WSm",
//   },
//   body: data,
// });


async function sendQuestion(message) {
  console.log('require', require)
  const requestUrl = 'https://08uu6507zw4v6cu.eu.qlikcloud.com';
const data = JSON.stringify({
  text: message,
  app: { id: "b139e5ee-7adc-41e5-8c1f-0b7be463729f", name: "CHAT" },
  enableVisualizations: true,
  visualizationTypes: ["barchart"],
});
const response = await fetch(`${requestUrl}/api/v1/questions/actions/ask`, {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOiJFUzM4NCIsImtpZCI6ImQyMmJhYTc0LTM1YmEtNGM5Mi1hZjEzLTJkMGM2ODM4YzhhMiIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoiWDZuZXl4WTNncEtOM21WZTZIdzhLX0ltMXh5UzBSZkQiLCJqdGkiOiJkMjJiYWE3NC0zNWJhLTRjOTItYWYxMy0yZDBjNjgzOGM4YTIiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiaUF6eUxZRk9Wd1VZV2cwX0ZtUWROOFk0azMzZGZMVVgifQ.gPEhRnfmMlriUPDHj-Fsitcqspn72gjGc2vxTv_G3PkmX5MDf3JQfGjNsN-xNDDtozF-IaLVQ3ZrIMYQyGcaoX4f03uSl9plsJIqxGWEe3UzVC6E-40VyKO0ttSEvPPl",
    "Content-Type": "application/json",
    "qlik-web-integration-id": "wXcLRgyI2s_94ZX7uOGSSnfk-ta14WSm",
  },
  body: data,
});
  const brokerResponse = await response.json();
  let properties;
  let lang = "en-US";

  if ("narrative" in brokerResponse.conversationalResponse.responses[0]) {
    const temp =
      brokerResponse.conversationalResponse.responses[0].narrative.text;
    outputArea.append(`
  <div class='user-message'>
    <div class='message'>
      ${temp}
    </div>
  </div>
`);
  } else if (
    "imageUrl" in brokerResponse.conversationalResponse.responses[0] ||
    "renderVisualization" in brokerResponse.conversationalResponse.responses[0]
  ) {
    let chartElement, img;
    const nebulaChartId = `nebula-chart-${new Date().getTime()}`;
    const nebulaObject = brokerResponse.conversationalResponse.responses.filter(
      (x) => x.type === "nebula"
    );
    const imgUrlObject = brokerResponse.conversationalResponse.responses.filter(
      (x) => x.type === "chart"
    );
    if (nebulaObject.length) {
      console.log('nebulaObject', nebulaObject)
      properties = { ...nebulaObject[0].renderVisualization.data };
      properties.color.paletteColor.index = 3;
      console.log('properties', properties)
      lang = nebulaObject[0].renderVisualization.language;
      chartElement = `<div class='user-message'>
            <div class='message'>
              <div class='nebula-chart'  id="${nebulaChartId}"></div>
            </div>
          </div>`;
    } else if (imgUrlObject.length) {
      img = imgUrlObject[0].imageUrl;
      chartElement = `<a href="https://08uu6507zw4v6cu.eu.qlikcloud.com/${img}"><img src="https://08uu6507zw4v6cu.eu.qlikcloud.com/${img}" width="600" height="600 "></a>`;
    }
    if ("narrative" in brokerResponse.conversationalResponse.responses[1]) {
      const text_r =
        brokerResponse.conversationalResponse.responses[1].narrative.text;
      outputArea.append(`
      <div class='user-message'>
      <div class ="message">
      ${text_r} </br>
      ${chartElement}
      </div>
      </div>
    `);
      if (nebulaObject.length) render(properties, nebulaChartId, lang);
    } else if ("nebula" in brokerResponse.conversationalResponse.responses[0]) {
      if (brokerResponse.conversationalResponse.responses) {
        outputArea.append(`
          <div class='user-message'>
              <div class='message'>
                <div class='nebula-chart'  id="${nebulaChartId}"></div>
              </div>
          </div>
        `);
        render(properties, nebulaChartId, lang);
      }
    } else {
      outputArea.append(`
      <div class='user-message'>
        <div class='message'>
        <img src="https://08uu6507zw4v6cu.eu.qlikcloud.com/${img}" width="300" height="200">
        </div>
      </div>
    `);
    }
  }
}

async function render(properties, nebulaChartId, lang = "en-US") {
  properties = properties;
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
    types: [
      {
        name: type,
        load: async () => charts[type],
      },
    ],
  });

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
