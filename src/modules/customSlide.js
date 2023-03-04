const customSlide = (imageSource) => {
    const body = document.body;
    body.innerHTML = '';

    const slide = document.createElement('img');
    slide.classList.add('customSlide');
    slide.src = imageSource;

    body.appendChild(slide);

};

export default customSlide;
