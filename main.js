const charactersDiv = document.getElementById("characters");
const nextPageBtn = document.getElementById("nextPage");
const prevPageBtn = document.getElementById("prevPage");
const createNavBtn = document.getElementById("create-nav")
const homeNavBtn = document.getElementById("home-nav")
const homeDiv = document.querySelector(".home")
const formDiv = document.querySelector(".form-view")
const inputName = document.getElementById("input-name")
const inputStatus = document.getElementById("input-status")
const inputGender = document.getElementById("input-gender")
const inputImage = document.getElementById("input-image")
const btnForm = document.getElementById("btn")


let page = 52;
prevPageBtn.classList.add("disabled")

const nextPage = (e) => {
  e.preventDefault();
  page++;
  prevPageBtn.classList.remove("disabled")
  showCharacters();
};

const prevPage = (e) => {
  e.preventDefault();
  page--;
  if(page ==1){
    prevPageBtn.classList.add("disabled")
  }
  showCharacters();
};

const deleteCharacter=async(_id)=>{
  try {
    await axios.delete("https://api-rick-y-morty-dev-dqms.3.us-1.fl0.io/characters/id/"+_id)
    showCharacters()
  } catch (error) {
    console.error(error);
  }
}

const printCharacters = (charactersArr) => {
  charactersDiv.innerHTML =""
  charactersArr.forEach((character) => {
    charactersDiv.innerHTML += `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header d-flex align-items-center justify-content-between"><span>Character: </span>
  <button type="button" class="btn btn-sm btn-light" onclick="deleteCharacter('${character._id}')">Delete</button></div>
  <div class="card-body">
    <h4 class="card-title">${character.name}</h4>
    </div>
    <img src="${character.image}" alt="">

</div>
        `;
  });
};

const showCharacters = async () => {
  try {
    const res = await axios.get(
      "https://api-rick-y-morty-dev-dqms.3.us-1.fl0.io/characters?page=" + page
    );
    const charactersArr = res.data;
    printCharacters(charactersArr);
  } catch (error) {
    console.error(error);
  }
};

showCharacters();

nextPageBtn.addEventListener("click", nextPage);
prevPageBtn.addEventListener("click", prevPage);

//* SPA

const showCreateCharacter =()=>{
 homeDiv.classList.add("d-none")
 homeNavBtn.children[0].classList.remove("active")
 createNavBtn.children[0].classList.add("active")
 formDiv.classList.remove("d-none")
}

const showHome =()=>{
  homeDiv.classList.remove("d-none")
  homeNavBtn.children[0].classList.add("active")
  createNavBtn.children[0].classList.remove("active")
  formDiv.classList.add("d-none")
 }

 const createCharacter =async(e)=>{
  e.preventDefault()
  try {
    const newCharacter ={
      name:inputName.value,
      status:inputStatus.value,
      gender:inputGender.value,
      image:inputImage.value,
  
    }
    console.log("newCharacter",newCharacter);
    await axios.post("https://api-rick-y-morty-dev-dqms.3.us-1.fl0.io/characters",newCharacter)
    showHome()
  } catch (error) {
    console.error(error);
  }

 }


createNavBtn.addEventListener("click",showCreateCharacter)
homeNavBtn.addEventListener("click",showHome)
btnForm.addEventListener("click",createCharacter)