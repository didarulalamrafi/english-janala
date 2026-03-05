// Loading data
// const loadingData = (status) => {
//   if (status == true) {
//     document.getElementById("loading").classList.remove("hidden");
//     document.getElementById("word-container").classList.add("hidden");
//   } else {
//     document.getElementById("loading").classList.add("hidden");
//     document.getElementById("word-container").classList.remove("hidden");
//   }
// };

loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLeason(json.data));
};

const loadLevelWord = (id) => {
  // https://openapi.programming-hero.com/api/level/5
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      const activeBtn = document.getElementById(`lesson-btn-${id}`);
      removeActive();
      activeBtn.classList.add("btn-active");
      displayLoadLevelWord(data.data);
    });
  //   console.log(url);
};
const removeActive = () => {
  const deactiveBtn = document.querySelectorAll(".lesson-btn");
  deactiveBtn.forEach((rem) => {
    rem.classList.remove("btn-active");
  });
  // console.log(deactiveBtn);
};
const displayLoadLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="no-word text-center col-span-full space-y-5">
      <img src="./assets/alert-error.png" alt="" class="mx-auto">
      <p class="text-gray-400 font-semibold hind-siliguri text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h3 class="text-4xl font-bold hind-siliguri">নেক্সট Lesson এ যান</h3>
    </div>`;
    return;
  }
  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    //     {
    //     "id": 1,
    //     "level": 3,
    //     "word": "Abundant",
    //     "meaning": null,
    //     "pronunciation": "অবানডান্ট"
    // }
    card.innerHTML = `
    <div class="card bg-white text-center shadow-md rounded-xl py-10 px-7 space-y-4">
      <h3 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
      <p class="font-semibold">Meaning / Pronounciation</p>
      <div class="hind-siliguri text-2xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
      <div class="flex justify-between items-center mt-3">
        <button onclick="loardWordDetail(${word.id})" class="btn  bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i> </button>
      </div>
    </div>`;
    wordContainer.append(card);
    // console.log(word);
  });
};

const loardWordDetail = async (id) => {
  loadingData(true);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  // fetch(url).then(res=>res.json()).then(data=>{
  //   console.log(data.data)
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDetail = (word) => {
  const detailContainer = document.getElementById("detail-container");
  detailContainer.innerHTML = `<div class="space-y-5">
            <h2 class="font-bold text-xl">${word.data.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.data.pronunciation})</h2>
            <h2 class="font-bold text-2xl">Meaning</h2>
            <h2 class="font-semibold text-xl hind-siliguri">${word.data.meaning}</h2>
            <h2 class="font-bold text-xl">Example</h2>
            <p>${word.data.sentence}</p>
            <h2 class="font-semibold text-xl hind-siliguri">সমার্থক শব্দ গুলো </h2>
            <div class="space-x-5">
              <div class=""> ${createElements(word.data.synonyms)} </div>
            </div>
          </div>`;
  document.getElementById("word_modal").showModal();
  console.log(word.data.word);
};

const displayLeason = (leasons) => {
  // 1. get the element & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = " ";

  //   2. get each element
  for (let leason of leasons) {
    // 3. create element
    // console.log(leason);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${leason.level_no}" onclick= "loadLevelWord(${leason.level_no})" class="btn btn-outline btn-primary lesson-btn"> <i class="fa-brands fa-leanpub"></i>Lesson - ${leason.level_no}</button>
    `;
    // 4. append
    levelContainer.append(btnDiv);
  }
  loadingData(false);
};

loadData();
// console.log("hi");

const createElements = (arr) => {
  const htmlElement = arr.map(
    (element) => `<span class="btn">${element}</span>`,
  );
  return htmlElement.join(" ");
};

createElements(synonyms);
