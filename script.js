const generateForm = document.querySelector(".generator-form");

const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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";
let isImageGerating = false;

const updateImg = (imgArray) =>{
  imgArray.forEach((imgObject, index)=>{
    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const dLbtn = imgCard.querySelector(".download-btn");

    //Set the img source to the ai generated img dat
    const aiGenerateImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src =  aiGenerateImg;

    //When the image is load, remove load class
    imgElement.onload=()=> {
      imgCard.classList.remove('loading');
      dLbtn.setAttribute("href", aiGenerateImg);
      dLbtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    }
  })
}

const generateAiImage = async (userPrompt, userImgQuantity) => {
  try {
    const respone = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: userPrompt,
          n: parseInt(userImgQuantity),
          size: "512x512",
          response_format: "b64_json"
        }),
      }
    );
    if(!respone.ok){throw new Error("Server error")};
    const {data} = await respone.json(); //Get data from the respone
    updateImg([...data]);
  } catch (error) {
    alert(error.message);
  }finally{
    isImageGerating = false;
  }
};

const handleFormSubmission = (e) => {
  e.preventDefault();
  if(isImageGerating) return;
  isImageGerating=true;

  //Get user Input and Image quantity values from the form

  const userPrompt = e.srcElement[0].value;
  const userImgQuantity = e.srcElement[1].value;

  //Creating HTML markup for image card with loading state

  const imgCardMarkup = Array.from(
    { length: userImgQuantity },
    () =>
      `
    <div class="img-card loading">
        <img src="images/loader.svg" alt="" />
        <a href="#" class="download-btn">
          <img src="images/download.svg" alt="" />
        </a>
      </div>
    `
  ).join("");

  imageGallery.innerHTML = imgCardMarkup;
  generateAiImage(userPrompt, userImgQuantity);
};

generateForm.addEventListener("submit", handleFormSubmission);
