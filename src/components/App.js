import React, { useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
// =======
// import { faRedo } from "@fortawesome/free-solid-svg-icons";
import {
  CSS_DISPLAY_NAME,
  HTML_DISPLAY_NAME,
  JS_DISPLAY_NAME,
} from "../constants/displayNames";


function App() {
  const [html, setHtml] = useLocalStorage("html");
  const [css, setCss] = useLocalStorage("css");
  const [js, setJs] = useLocalStorage("js");
  const [srcDoc, setSrcDoc] = useLocalStorage("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js, setSrcDoc]);

  const clearAll = () => {
    setHtml("");
    setCss("");
    setJs("");
    setSrcDoc("");
  };

  return (
    <>
      <div className="top-header">
        <div></div>
        <h1 className="ti ct">
          <span>
            <img
              src={require("../resources/poke-icons/006-mega-x.png")}
              alt=""
            />
          </span>
          Codera
        </h1>
        <button className="clear-all-btn" onClick={clearAll}>
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
      </div>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName={HTML_DISPLAY_NAME}
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName={CSS_DISPLAY_NAME}
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName={JS_DISPLAY_NAME}
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default App;
