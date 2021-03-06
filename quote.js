// DOM SELECTION VARIABLES
const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("Button"),
  name = document.querySelector(".name"),
  soundbtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twiter = document.querySelector(".twitter"),
  wa = document.querySelector(".whatsapp");
function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";

  document.querySelector("button").style.background = bgColor;
  document.querySelector("body").style.background = bgColor;
  for (let i = 0; i < 4; i++) {
    document.querySelectorAll("li")[i].style.border = bgColor + "2px solid";
    document.querySelectorAll("li")[i].style.color = bgColor;
  }
}

// Random quote function
function randomQoute() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote ...";
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      // Check weather the data from an api is ready

      quoteText.innerText = data.content;
      name.innerText = data.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
      random_bg_color();
    })
    .catch((err) => {
      return err;
    });
}
// Add event listener to Sound Button
soundbtn.addEventListener("click", () => {
  //SpeechSynthesisUtterance() is a web api that sends a speech request;
  let utterrance = new SpeechSynthesisUtterance();
  utterrance.volume = 1;
  utterrance.rate = 1;
  utterrance.pitch = 1;
  utterrance.text = `${quoteText.innerText} by ${name.innerText}`;
  // speak method for speechSynthesis

  window.speechSynthesis.speak(utterrance);
});
// Add event listener to Copy Button
copyBtn.addEventListener("click", () => {
  // copies the text when clicked
  navigator.clipboard.writeText(`${quoteText.innerText} -- ${name.innerText}`);
  alert("copied");
});

// Add event listener to Twitter Button
twiter.addEventListener("click", () => {
  // share the text to tweet when clicked
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerHTML}`;
  window.open(tweetUrl, "_blank");
});

// Add event listener to Whatsapp Button
wa.addEventListener("click", () => {
  // share the text to whatsapp when clicked
  let whatlink = `https://api.whatsapp.com/send?text=${quoteText.innerHTML}+--+${name.innerText}`;
  window.open(whatlink, "_blank");
});

//   Adding event Listner to New Quote Button
window.onload = () => {
  setInterval(randomQoute, 100000);
  quoteBtn.addEventListener("click", randomQoute);
};
