const generateForm = document.querySelector(".generator-form");

const imageGallery =document.querySelector('.image-gallery');

const handleFormSubmission = (e) => {
  e.preventDefault();

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
};

generateForm.addEventListener("submit", handleFormSubmission);
