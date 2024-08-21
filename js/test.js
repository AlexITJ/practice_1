openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});

document.addEventListener("DOMContentLoaded", function () {
  var input = document.querySelector(".tel");

  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);

  /***/
  function mask(event) {
    var blank = "+_ ___ ___-__-__";

    var i = 0;
    var val = this.value.replace(/\D/g, "").replace(/^8/, "7"); // <---

    this.value = blank.replace(/./g, function (char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);

      return i >= val.length ? "" : char;
    });

    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else {
      setCursorPosition(this, this.value.length);
    }
  }

  function setCursorPosition(elem, pos) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
      return;
    }

    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
      return;
    }
  }
});

document.querySelector("#close-preview").style.display = "none";

var _PREVIEW_URL;

document.querySelector("#upload-dialog").addEventListener("click", function () {
  event.preventDefault();
  document.querySelector("#image-file").click();
});
document.querySelector("#dialog-icon").addEventListener("click", function () {
  event.preventDefault();
  document.querySelector("#image-file").click();
});

document.querySelector("#image-file").addEventListener("change", function () {
  var file = this.files[0];

  var mime_types = ["image/jpeg", "image/png"];

  if (mime_types.indexOf(file.type) == -1) {
    alert("Error : Incorrect file type");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Error : Exceeded size 2MB");
    return;
  }

  _PREVIEW_URL = URL.createObjectURL(file);

  document.querySelector("#preview-image").setAttribute("src", _PREVIEW_URL);
  document.querySelector("#close-preview").style.display = "block";
  document.querySelector("#preview-image").style.display = "inline-block";

  document
    .querySelector("#close-preview")
    .addEventListener("click", function () {
      event.preventDefault();
      console.log("click");
      _PREVIEW_URL = URL.revokeObjectURL(file);
      document.querySelector("#close-preview").style.display = "none";
      document
        .querySelector("#preview-image")
        .setAttribute("src", "./images/Ellipse 44.png");
    });
});
