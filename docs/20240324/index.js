/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadInterface = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/20240316/interface.mjs");
});

Promise.all( [ loadInterface ] ).then(start, fail);

function fail() {
  console.log("Fail");
}

const DOM_PARSER = new DOMParser();
const XML_SERIALIZER = new XMLSerializer();

function start([ Interface ]) {
  try {
    const articles = new Set();
    const BODY = Interface.createBodyObject({});
    const mainLayout = BODY.createAttached({
      objectId: Interface.OBJECT_LAYOUT,
      parameters: {
        layoutId: LAYOUT_HEADER,
      },
    });
    const headerLayout = mainLayout.createAttached({
      objectId: Interface.OBJECT_LAYOUT,
      area: "header",
      parameters: {
        layoutId: Interface.LAYOUT_SIDE_TOUCH,
      },
    });
    const mainHamburgerButton = headerLayout.createAttached({
      objectId: Interface.OBJECT_IMAGE,
      area: "touch",
      parameters: {
        src: "https://scotwatson.github.io/WebInterface/Hamburger_icon.svg",
      },
    }).addClickListener({
      handler: openMainHamburgerMenu,
    });
    headerLayout.createAttached({
      objectId: Interface.OBJECT_TEXT,
      area: "main",
      parameters: {
        text: "Article Viewer",
      },
    });
    const splashScreen = mainLayout.createAttached({
      objectId: Interface.OBJECT_TEXT,
      area: "body",
      parameters: {
        text: "Article Viewer",
      },
    });
    function openMainHamburgerMenu() {
      const menu = mainLayout.createAttached({
        objectId: Interface.OBJECT_LIST,
        area: "body",
        parameters: {
          layoutId: Interface.LAYOUT_HEADER,
        },
      });
      menu.addItem({
        text: "New Article",
      }).addClickListener({
        handler: newArticle,
      });
      menu.addItem({
        text: "Open Article",
      }).addClickListener({
        handler: openArticle,
      });
      menu.addItem({
        text: "See All Articles",
      }).addClickListener({
        handler: seeAllArticles,
      });
    }
    function newArticle() {
      createArticleUi();
    }
    function openArticle() {
      const openMethodTiles = mainLayout.createAttached({
        objectId: Interface.OBJECT_TILES,
        area: "body",
        parameters: {
        },
      });
      openMethodTiles.addTile({
        imgSrc: "https://scotwatson.github.io/WebInterface/Hamburger_icon.svg",
        text: "From File System",
      }).addClickListener({
        handler: function () {
          const fileInput = document.createElement("input");
          fileInput.type = file;
          fileInput.style.display = "none";
          document.body.appendChild(fileInput);
          fileInput.addEventListener("input", function (evt) {
            activeArticle = createArticleUi();
            openArticle({
              blob: fileInput.files[0],
              articleObject: activeArticle.articleObject,
            });
            showArticle(activeArticle);
            fileInput.remove();
          });
          fileInput.click();
        }
      });
    }
    function createArticleUi() {
      const articleLayout = mainLayout.createAttached({
        objectId: Interface.OBJECT_LAYOUT,
        area: "body",
        parameters: {
          layoutId: Interface.LAYOUT_HEADER,
        },
      });
      const headerWindow = articleLayout.createAttached({
        objectId: Interface.OBJECT_HTML,
        area: "header",
        parameters: {},
      });
      const contentWindow = articleLayout.createAttached({
        objectId: Interface.OBJECT_HTML,
        area: "body",
        parameters: {},
      });
      const obj = {};
      obj.addSection = function() {
        const divSection = document.createElement("div");
        divSection.setAttribute("data-node", "section");
        const divHeader = document.createElement("div");
        divHeader.style.fontSize = "16pt";
        divSection.appendChild(divHeader);
        const divText = document.createElement("div");
        divText.style.fontSize = "12pt";
        divSection.appendChild(divText);
        divHeader.contentEditable = true;
        divText.contentEditable = true;
        contentWindow.appendChild(divSection);
        divHeader.append("Header");
        divText.append("Text");
      }
      articles.add({
        articleObject: obj,
        uiObject: articleLayout,
      });
    }
    function seeAllArticles() {
      const articleTiles = mainLayout.createAttached({
        objectId: Interface.OBJECT_TILES,
        area: "body",
        parameters: {
        },
      });
      for (const article of articles) {
        articleTiles.addTile({
          imgSrc: "https://scotwatson.github.io/WebInterface/Hamburger_icon.svg",
          text: article.title,
        }).addClickListener({
          handler: function () {
            showArticle(article);
          }
        });
      }
    }
    function showArticle(article) {
      activeArticle = article;
      article.uiObject.attach();
    }
    function open({
      blob,
    }) {
      articleWindow.clear();
      const xmlDoc = DOM_PARSER.parseFromString(blob.text(), { type: "application/xml" });
      for (const xmlNode of xmlDoc.childNodes) {
        switch (xmlNode.nodeName) {
          case "section": {
            articleWindow.appendChild(parseSection({ xmlNode }));
          }
            break;
          default: {
            window.alert("Unrecognized Node");
          }
        };
      }
      function parseSection({ xmlNode }) {
        htmlNode = document.createElement("div");
        const divHeader = document.createElement("div");
        const divText = document.createElement("div");
        htmlNode.appendChild(divHeader);
        htmlNode.appendChild(divText);
        divHeader.append(xmlNode.getAttribute("header"));
        divText.append(xmlNode.textContent);
        divHeader.contentEditable = true;
        divText.contentEditable = true;
        return htmlNode;
      }
    }
    function save() {
      const htmlNodes = articleWindow.getChildNodes();
      const xmlDoc = document.implementation.createDocument(null, "article");
      for (const htmlNode of htmlNodes) {
        const nodeName = htmlNode.getAttribute("data-node");
        const xmlNode = xmlDoc.createElement(nodeName);
        switch (nodeName) {
          case "section": {
            parseSection({ htmlNode, xmlNode });
          }
            break;
          default: {
            window.alert("Internal failure");
          }
        }
      }
      function parseSection({ htmlNode, xmlNode }) {
        const divHeader = htmlNode.childNodes[0];
        const divText = htmlNode.childNodes[1];
        xmlNode.setAttribute("header", divHeader.textContent);
        xmlNode.append(divText.textContent);
      }
    }
  } catch (e) {
    console.error(e);
  }
}
