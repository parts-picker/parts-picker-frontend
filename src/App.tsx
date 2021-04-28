import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useTranslation } from "react-i18next";

export default function App(): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t("DESCRIPTION")}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("LINK")}
        </a>

        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            English
          </button>
          <button
            onClick={() => {
              i18n.changeLanguage("de");
            }}
          >
            Deutsch
          </button>
        </div>
      </header>
    </div>
  );
}
