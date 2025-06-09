window.addEventListener("DOMContentLoaded", () => {
  // 팝업 div 리스트 postMessage
  const popups = Array.from(document.querySelectorAll(".popup_type02")).map(
    (div) => {
      const img = div.querySelector("img");
      return {
        id: div.id,
        index: div.getAttribute("data-index"),
        top: div.style.top,
        left: div.style.left,
        zIndex: div.style.zIndex,
        width: img ? img.width : undefined,
        height: img ? img.height : undefined,
        imgSrc: img ? img.src : "",
        display: div.style.display,
        opacity: div.style.opacity,
        html: div.outerHTML,
      };
    }
  );
  window.parent.postMessage({ type: "popup-list", popups }, "*");

  // 텍스트 더블클릭 (팝업 내부 제외, 하이라이트 포함)
  document
    .querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, span, div[contenteditable="true"]'
    )
    .forEach((el, idx) => {
      if (el.closest(".popup_type02")) return;
      el.addEventListener("mouseenter", () => {
        el.style.outline = "2px solid #22c55e";
        el.style.background = "#bbf7d0";
      });
      el.addEventListener("mouseleave", () => {
        el.style.outline = "";
        el.style.background = "";
      });
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 이미 에디터가 열려있으면 중복 방지
        if (document.querySelector(".inline-toolbar")) return;
        el.setAttribute("contenteditable", "true");
        el.focus();
        // 인라인 툴바 생성
        const toolbar = document.createElement("div");
        toolbar.className = "inline-toolbar";
        toolbar.style.position = "absolute";
        const rect = el.getBoundingClientRect();
        toolbar.style.left = rect.left + window.scrollX + "px";
        toolbar.style.top = rect.top + window.scrollY - 40 + "px";
        toolbar.style.background = "#fff";
        toolbar.style.border = "1px solid #ddd";
        toolbar.style.borderRadius = "6px";
        toolbar.style.padding = "4px 8px";
        toolbar.style.zIndex = 99999;
        toolbar.style.display = "flex";
        toolbar.style.gap = "8px";
        // 폰트크기
        const fontSize = document.createElement("select");
        [12, 14, 16, 18, 20, 24, 28, 32, 40].forEach((size) => {
          const opt = document.createElement("option");
          opt.value = size + "px";
          opt.text = size + "px";
          if (window.getComputedStyle(el).fontSize === opt.value)
            opt.selected = true;
          fontSize.appendChild(opt);
        });
        fontSize.onchange = () => {
          el.style.fontSize = fontSize.value;
        };
        toolbar.appendChild(fontSize);
        // 굵기
        const boldBtn = document.createElement("button");
        boldBtn.textContent = "B";
        boldBtn.style.fontWeight = "bold";
        boldBtn.onclick = () => {
          el.style.fontWeight =
            el.style.fontWeight === "bold" ? "normal" : "bold";
        };
        toolbar.appendChild(boldBtn);
        // 색상
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = rgb2hex(window.getComputedStyle(el).color);
        colorInput.oninput = () => {
          el.style.color = colorInput.value;
        };
        toolbar.appendChild(colorInput);
        // 저장
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "저장";
        saveBtn.onclick = () => {
          el.setAttribute("contenteditable", "false");
          if (toolbar.parentNode) toolbar.parentNode.removeChild(toolbar);
          window.parent.postMessage(
            {
              type: "text-inline-save",
              text: el.textContent,
              tag: el.tagName,
              id: el.id,
              className: el.className,
              style: el.getAttribute("style"),
              index: idx,
            },
            "*"
          );
        };
        toolbar.appendChild(saveBtn);
        // 취소
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "취소";
        cancelBtn.onclick = () => {
          el.setAttribute("contenteditable", "false");
          if (toolbar.parentNode) toolbar.parentNode.removeChild(toolbar);
        };
        toolbar.appendChild(cancelBtn);
        document.body.appendChild(toolbar);
      });
    });

  // 이미지 클릭 (팝업 내부 제외, GIF 포함, 하이라이트 포함)
  document.querySelectorAll("img").forEach((img) => {
    if (img.closest(".popup_type02")) return;
    img.addEventListener("mouseenter", () => {
      img.style.outline = "2px solid #2563eb";
      img.style.background = "#e0e7ff";
    });
    img.addEventListener("mouseleave", () => {
      img.style.outline = "";
      img.style.background = "";
    });
    img.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage(
        {
          type: "image-click",
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isGif: img.src.endsWith(".gif"),
        },
        "*"
      );
    });
    img.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage(
        {
          type: "image-dblclick",
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isGif: img.src.endsWith(".gif"),
        },
        "*"
      );
    });
  });

  // 배경 클릭 (팝업 내부 제외, 배경 이미지/영상이 있을 때만)
  ["body", "main", "section", "div"].forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest(".popup_type02")) return;
      el.addEventListener("mouseenter", () => {
        el.style.outline = "2px dashed #f59e42";
        el.style.background = "#fef9c3";
      });
      el.addEventListener("mouseleave", () => {
        el.style.outline = "";
        el.style.background = "";
      });
      el.addEventListener("click", (e) => {
        const style = window.getComputedStyle(el);
        const hasBgImage =
          style.backgroundImage && style.backgroundImage !== "none";
        const hasVideo = el.querySelector && el.querySelector("video");
        if (hasBgImage) {
          // background-image: url("...") 형태에서 src 추출
          const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
          const bgSrc = match ? match[1] : null;
          if (bgSrc) {
            // 임시 이미지 객체로 크기 측정
            const tempImg = new window.Image();
            tempImg.onload = function () {
              window.parent.postMessage(
                {
                  type: "background-image-click",
                  tag: el.tagName,
                  id: el.id,
                  className: el.className,
                  style: el.getAttribute("style"),
                  src: bgSrc,
                  width: tempImg.naturalWidth,
                  height: tempImg.naturalHeight,
                },
                "*"
              );
            };
            tempImg.src = bgSrc;
            return;
          }
        }
        if (hasVideo) return;
        // 기존 배경 클릭 메시지는 배경 이미지/영상이 없을 때만
        if (!hasBgImage && !hasVideo) return;
        e.stopPropagation();
        window.parent.postMessage(
          {
            type: "background-click",
            tag: el.tagName,
            id: el.id,
            className: el.className,
            style: el.getAttribute("style"),
          },
          "*"
        );
      });
    });
  });

  // 비디오 클릭 (팝업 내부 제외, 하이라이트 포함)
  document.querySelectorAll("video").forEach((video) => {
    if (video.closest(".popup_type02")) return;
    video.addEventListener("mouseenter", () => {
      video.style.outline = "2px solid #f472b6";
      video.style.background = "#fce7f3";
    });
    video.addEventListener("mouseleave", () => {
      video.style.outline = "";
      video.style.background = "";
    });
    video.addEventListener("click", (e) => {
      e.stopPropagation();
      window.parent.postMessage(
        {
          type: "video-click",
          src: video.currentSrc || video.src,
        },
        "*"
      );
    });
    video.addEventListener("dblclick", (e) => {
      e.stopPropagation();
    });
  });
});

function rgb2hex(rgb) {
  if (!rgb) return "#000000";
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return (
    "#" +
    result
      .slice(0, 3)
      .map((x) => (+x).toString(16).padStart(2, "0"))
      .join("")
  );
}
