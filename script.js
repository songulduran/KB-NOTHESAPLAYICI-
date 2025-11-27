document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gradeForm");
  const sonucKarti = document.getElementById("sonuc");
  const basariEl = document.getElementById("basari");
  const harfEl = document.getElementById("harf");
  const durumEl = document.getElementById("durum");
  const aciklamaEl = document.getElementById("aciklama");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let vize = parseFloat(document.getElementById("vize").value);
    let calisma = parseFloat(document.getElementById("calisma").value);
    let finalNot = parseFloat(document.getElementById("final").value);
    let but = parseFloat(document.getElementById("but").value);
    let devamsiz = document.getElementById("devamsiz").checked;
    let girdiMi = document.getElementById("girdiMi").value;

    if (isNaN(vize) || vize < 0 || vize > 100) {
      alert("Vize 0-100 arasında olmalı!");
      return;
    }

    if (!devamsiz && isNaN(finalNot) && isNaN(but)) {
      alert("Final veya Bütünleme notu gerekli!");
      return;
    }

    let yilIci = !isNaN(calisma) ? calisma : vize;

    if (devamsiz) {
      basariEl.textContent = "Başarı Notu: —";
      harfEl.textContent = "Harf Notu: F1";
      durumEl.textContent = "Durum: Kaldı";
      aciklamaEl.textContent = "Devamsız olduğunuz için F1 ile kaldınız.";
      sonucKarti.classList.remove("hidden");
      return;
    }

    if (girdiMi === "hayir") {
      basariEl.textContent = "Başarı Notu: —";
      harfEl.textContent = "Harf Notu: F2";
      durumEl.textContent = "Durum: Kaldı";
      aciklamaEl.textContent = "Sınava girmediğiniz için F2 ile kaldınız.";
      sonucKarti.classList.remove("hidden");
      return;
    }

    let sinav = !isNaN(but) ? but : finalNot;
    let basari = +(0.4 * yilIci + 0.6 * sinav).toFixed(2);

    let harf = "";
    let durum = "";
    let aciklama = "";

    if (sinav < 50) {
      harf = "F3";
      durum = "Kaldı";
      aciklama = "Genel/Bütünleme notu 50'nin altında olduğu için F3.";
    } else if (basari < 60) {
      harf = "F3";
      durum = "Kaldı";
      aciklama = "Başarı notu 60'ın altında olduğu için F3.";
    } else if (basari >= 90) harf = "A1";
    else if (basari >= 80) harf = "A2";
    else if (basari >= 70) harf = "B1";
    else if (basari >= 65) harf = "B2";
    else if (basari >= 60) harf = "C";

    if (!harf.startsWith("F")) durum = "Geçti";

    basariEl.textContent = `Başarı Notu: ${basari}`;
    harfEl.textContent = `Harf Notu: ${harf}`;
    durumEl.textContent = `Durum: ${durum}`;
    aciklamaEl.textContent = `Açıklama: ${aciklama}`;
  });

  document.getElementById("resetBtn").addEventListener("click", function () {
    form.reset();
    sonucKarti.classList.add("hidden");
  });
});
