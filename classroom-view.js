(() => {
  "use strict";

  const button = document.getElementById("fullscreenToggle");
  if (!button) return;

  const labels = {
    bm: { enter: "Skrin penuh", exit: "Keluar penuh" },
    zh: { enter: "全屏", exit: "退出全屏" },
    en: { enter: "Full screen", exit: "Exit full screen" }
  };
  let language = "bm";

  function updateButton() {
    const fullscreen = Boolean(document.fullscreenElement);
    const label = labels[language][fullscreen ? "exit" : "enter"];
    button.querySelector("span:first-child").textContent = fullscreen ? "⊡" : "⛶";
    button.querySelector("span:last-child").textContent = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(fullscreen));
    button.title = label;
  }

  button.hidden = !document.fullscreenEnabled;
  button.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) {
      button.title = error instanceof Error ? error.message : labels[language].enter;
    }
  });
  document.addEventListener("fullscreenchange", updateButton);
  document.querySelectorAll(".language-btn").forEach(languageButton => {
    languageButton.addEventListener("click", () => {
      language = languageButton.dataset.lang in labels ? languageButton.dataset.lang : "bm";
      updateButton();
    });
  });
  updateButton();
})();
