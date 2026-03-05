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
    .then((data) => displayLoadLevelWord(data.data));
  //   console.log(url);
};
const displayLoadLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
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
      <h3 class="font-bold text-2xl">${word.word}</h3>
      <p class="font-semibold">Meaning / Pronounciation</p>
      <div class="hind-siliguri text-2xl font-semibold">"${word.meaning} / ${word.pronunciation}"</div>
      <div class="flex justify-between items-center mt-3">
        <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i> </button>
      </div>
    </div>`;
    wordContainer.append(card);
    console.log(word);
  });
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
    <button onclick= "loadLevelWord(${leason.level_no})" class="btn btn-outline btn-primary"> <i class="fa-brands fa-leanpub"></i>Lesson- ${leason.level_no}</button>
    `;
    // 4. append
    levelContainer.append(btnDiv);
  }
};
loadData();
console.log("hi");
